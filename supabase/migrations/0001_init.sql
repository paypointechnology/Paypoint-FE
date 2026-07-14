-- =============================================================================
-- Paypoint — Phase 0 core schema
-- Migration: 0001_init
--
-- Creates the seller-facing data model (profiles, pages, payments, events),
-- locks every table behind Row Level Security, adds a public checkout read
-- function that never leaks secrets, wires new-user provisioning, and sets up
-- storage buckets for page images and logos.
--
-- Idempotent-ish: uses IF NOT EXISTS / DROP ... IF EXISTS where practical so it
-- can be re-run during setup without exploding. Safe to paste into the Supabase
-- SQL editor or apply via `supabase db push`.
-- =============================================================================

-- Extensions ------------------------------------------------------------------
create extension if not exists "pgcrypto"; -- gen_random_uuid()

-- =============================================================================
-- ENUMS
-- =============================================================================
do $$
begin
  if not exists (select 1 from pg_type where typname = 'payment_status') then
    create type public.payment_status as enum (
      'pending', 'success', 'failed', 'abandoned', 'refunded', 'reversed'
    );
  end if;
end$$;

-- =============================================================================
-- TABLE: profiles
-- One row per authenticated seller. id mirrors auth.users.id.
-- =============================================================================
create table if not exists public.profiles (
  id              uuid primary key references auth.users (id) on delete cascade,
  first_name      text,
  last_name       text,
  business_name   text,
  whatsapp        text,
  logo_url        text,
  brand_color     text,   -- seller's brand accent (hex), set in the brand setup step

  phone_verified  boolean not null default false,
  email_verified  boolean not null default false,
  kyb_status      text    not null default 'pending',
  subaccount_code text,
  bank_name       text,
  account_last4   text,
  account_name    text,
  created_at      timestamptz not null default now()
);

-- =============================================================================
-- TABLE: pages
-- A seller's checkout pages / payment links.
-- =============================================================================
create table if not exists public.pages (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.profiles (id) on delete cascade,
  slug             text unique,
  title            text,
  type             text,
  price_kobo       bigint,
  currency         text not null default 'NGN',
  description      text,
  image_url        text,
  delivery_info    text,
  collect_fields   jsonb,
  is_active        boolean not null default true,
  setup_complete   boolean not null default false,
  customers_served integer not null default 0,
  created_at       timestamptz not null default now()
);

create index if not exists pages_user_id_idx on public.pages (user_id);
create index if not exists pages_slug_idx on public.pages (slug) where is_active = true;

-- =============================================================================
-- TABLE: payments
-- =============================================================================
create table if not exists public.payments (
  id               uuid primary key default gen_random_uuid(),
  page_id          uuid references public.pages (id) on delete set null,
  user_id          uuid not null references public.profiles (id) on delete cascade,
  customer_name    text,
  customer_phone   text,
  customer_email   text,
  customer_address text,
  amount_kobo      bigint,
  status           public.payment_status not null default 'pending',
  reference        text unique,
  is_test          boolean not null default false,
  paid_at          timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists payments_user_id_idx on public.payments (user_id);
create index if not exists payments_page_id_idx on public.payments (page_id);
create index if not exists payments_status_idx on public.payments (status);

-- =============================================================================
-- TABLE: events
-- Lightweight analytics (page views etc.). Anonymous inserts allowed.
-- =============================================================================
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  page_id     uuid references public.pages (id) on delete cascade,
  anon_id     text,
  event_type  text,
  source      text,
  ua_class    text,
  created_at  timestamptz not null default now()
);

create index if not exists events_page_id_idx on public.events (page_id);

-- =============================================================================
-- updated_at trigger for payments
-- =============================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists payments_set_updated_at on public.payments;
create trigger payments_set_updated_at
  before update on public.payments
  for each row execute function public.set_updated_at();

-- =============================================================================
-- ROW LEVEL SECURITY
-- Enable on every table; default-deny, then add explicit policies.
-- =============================================================================
alter table public.profiles enable row level security;
alter table public.pages    enable row level security;
alter table public.payments enable row level security;
alter table public.events   enable row level security;

-- ---- profiles ---------------------------------------------------------------
-- A seller can only see and mutate their own profile row (id = auth.uid()).
-- No anon access. Row creation is handled by the handle_new_user trigger
-- (SECURITY DEFINER), so we do not expose a broad INSERT policy here.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- ---- pages ------------------------------------------------------------------
-- Full CRUD for the owning seller only. Public checkout reads go through
-- public_page_by_slug() (SECURITY DEFINER) — never direct table select.
drop policy if exists "pages_select_own" on public.pages;
create policy "pages_select_own" on public.pages
  for select using (auth.uid() = user_id);

drop policy if exists "pages_insert_own" on public.pages;
create policy "pages_insert_own" on public.pages
  for insert with check (auth.uid() = user_id);

drop policy if exists "pages_update_own" on public.pages;
create policy "pages_update_own" on public.pages
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "pages_delete_own" on public.pages;
create policy "pages_delete_own" on public.pages
  for delete using (auth.uid() = user_id);

-- ---- payments ---------------------------------------------------------------
-- Seller can read/manage their own payments. Customer-initiated payment writes
-- happen server-side via the service-role client (webhook / verified charge),
-- which bypasses RLS — so no anon policy here.
drop policy if exists "payments_select_own" on public.payments;
create policy "payments_select_own" on public.payments
  for select using (auth.uid() = user_id);

drop policy if exists "payments_insert_own" on public.payments;
create policy "payments_insert_own" on public.payments
  for insert with check (auth.uid() = user_id);

drop policy if exists "payments_update_own" on public.payments;
create policy "payments_update_own" on public.payments
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "payments_delete_own" on public.payments;
create policy "payments_delete_own" on public.payments
  for delete using (auth.uid() = user_id);

-- ---- events -----------------------------------------------------------------
-- Anyone (including anonymous checkout visitors) may INSERT an event.
-- Reads are restricted to the owner of the page the event belongs to.
drop policy if exists "events_insert_anon" on public.events;
create policy "events_insert_anon" on public.events
  for insert to anon, authenticated
  with check (true);

drop policy if exists "events_select_owner" on public.events;
create policy "events_select_owner" on public.events
  for select using (
    exists (
      select 1 from public.pages p
      where p.id = events.page_id and p.user_id = auth.uid()
    )
  );

-- =============================================================================
-- PUBLIC CHECKOUT READ — SECURITY DEFINER function
-- Returns ONLY checkout-safe columns for an active page by slug.
-- Never exposes user_id, references, bank details, or any secret column.
-- Runs as definer (owner) so it can read past RLS in a controlled way.
-- =============================================================================
create or replace function public.public_page_by_slug(page_slug text)
returns table (
  slug             text,
  title            text,
  type             text,
  price_kobo       bigint,
  currency         text,
  description      text,
  image_url        text,
  delivery_info    text,
  collect_fields   jsonb,
  customers_served integer,
  business_name    text,
  logo_url         text
)
language sql
security definer
set search_path = public
stable
as $$
  select
    p.slug,
    p.title,
    p.type,
    p.price_kobo,
    p.currency,
    p.description,
    p.image_url,
    p.delivery_info,
    p.collect_fields,
    p.customers_served,
    pr.business_name,
    pr.logo_url
  from public.pages p
  join public.profiles pr on pr.id = p.user_id
  where p.slug = page_slug
    and p.is_active = true;
$$;

-- Expose the function to anonymous + authenticated callers (RPC).
revoke all on function public.public_page_by_slug(text) from public;
grant execute on function public.public_page_by_slug(text) to anon, authenticated;

-- =============================================================================
-- NEW USER PROVISIONING
-- On auth.users insert, create the matching profiles row, hydrating from the
-- signup metadata (raw_user_meta_data). SECURITY DEFINER so it can insert
-- despite RLS.
-- =============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name, whatsapp, business_name, email_verified)
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'whatsapp',
    new.raw_user_meta_data ->> 'business_name',
    coalesce((new.email_confirmed_at is not null), false)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================================================
-- STORAGE BUCKETS
-- page-images: product/checkout imagery. logos: seller logos. Both public-read.
-- Writes (insert/update/delete) restricted to the owning user, enforced by
-- pathing objects under a top-level folder equal to the user's uid:
--   <bucket>/<auth.uid()>/<filename>
-- =============================================================================
insert into storage.buckets (id, name, public)
values ('page-images', 'page-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('logos', 'logos', true)
on conflict (id) do nothing;

-- Public read for both buckets.
drop policy if exists "public read page-images" on storage.objects;
create policy "public read page-images" on storage.objects
  for select using (bucket_id = 'page-images');

drop policy if exists "public read logos" on storage.objects;
create policy "public read logos" on storage.objects
  for select using (bucket_id = 'logos');

-- Owner-scoped writes: first path segment must equal the caller's uid.
drop policy if exists "owner insert page-images" on storage.objects;
create policy "owner insert page-images" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'page-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "owner update page-images" on storage.objects;
create policy "owner update page-images" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'page-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'page-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "owner delete page-images" on storage.objects;
create policy "owner delete page-images" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'page-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "owner insert logos" on storage.objects;
create policy "owner insert logos" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'logos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "owner update logos" on storage.objects;
create policy "owner update logos" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'logos'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'logos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "owner delete logos" on storage.objects;
create policy "owner delete logos" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'logos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- =============================================================================
-- End of 0001_init
-- =============================================================================
