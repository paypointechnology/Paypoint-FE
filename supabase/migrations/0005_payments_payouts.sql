-- =============================================================================
-- Migration 0005 — PAYMENTS RAIL (Kora pass-through)
-- The compliance-reviewed money model: buyer pays via Kora -> charge.success
-- webhook -> immediate automated payout of (amount - fee) to the seller's
-- verified bank. Paypoint's balance only ever auto-drains to sellers.
--   1) profiles gains the full verified settlement account (bank_code +
--      account_number are required to disburse; NUBAN is visible only to the
--      owner via existing RLS).
--   2) payouts is the second ledger leg: exactly ONE payout per payment
--      (unique payment_id = idempotency), written by trusted server code
--      (webhook / reconciliation) via the service role. Sellers may read
--      their own rows (the "transaction tracker" — it mirrors, never holds).
--   3) payments gains fee_kobo so every row records the split at charge time.
--   4) kyb_verifications accepts id_type 'bank' so billed bank-account
--      lookups are audit-logged and rate-limited like CAC/BVN lookups.
-- =============================================================================

alter table public.profiles
  add column if not exists bank_code      text,
  add column if not exists account_number text;

-- Lock the payments ledger against client-side writes ------------------------
-- 0001 gave sellers UPDATE/INSERT/DELETE on their own payment rows. Now that
-- the payout leg disburses from amount_kobo/fee_kobo, any client write path is
-- a money primitive (inflate a payout, delete a settled row and cascade away
-- its payout audit trail). Sellers only ever READ payments; every write goes
-- through trusted server code with the service role, which bypasses RLS.
drop policy if exists "payments_update_own" on public.payments;
drop policy if exists "payments_insert_own" on public.payments;
drop policy if exists "payments_delete_own" on public.payments;

alter table public.payments
  add column if not exists fee_kobo bigint;

-- Payout ledger ---------------------------------------------------------------
create table if not exists public.payouts (
  id                uuid primary key default gen_random_uuid(),
  payment_id        uuid not null unique references public.payments (id) on delete cascade,
  user_id           uuid not null references public.profiles (id) on delete cascade,
  amount_kobo       bigint not null,      -- what the seller receives
  fee_kobo          bigint not null default 0, -- what Paypoint retained
  reference         text not null unique, -- disburse reference (po_<payment ref>)
  status            text not null default 'pending'
                    check (status in ('pending', 'processing', 'success', 'failed')),
  attempts          int  not null default 0,
  last_error        text,
  provider_response jsonb,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists payouts_user_idx   on public.payouts (user_id, created_at desc);
create index if not exists payouts_status_idx on public.payouts (status);

drop trigger if exists payouts_set_updated_at on public.payouts;
create trigger payouts_set_updated_at
  before update on public.payouts
  for each row execute function public.set_updated_at();

-- Sellers can see their own payout rows; all writes are service-role only.
alter table public.payouts enable row level security;

drop policy if exists "payouts_select_own" on public.payouts;
create policy "payouts_select_own" on public.payouts
  for select using (auth.uid() = user_id);

-- Atomic counter bump used by the settle-once path (service role only) --------
create or replace function public.increment_customers_served(p_page_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.pages
  set customers_served = customers_served + 1
  where id = p_page_id;
$$;

revoke all on function public.increment_customers_served(uuid) from public;
revoke all on function public.increment_customers_served(uuid) from anon, authenticated;

-- Allow bank-account lookups in the identity audit log ------------------------
alter table public.kyb_verifications
  drop constraint if exists kyb_verifications_id_type_check;
alter table public.kyb_verifications
  add constraint kyb_verifications_id_type_check
  check (id_type in ('cac', 'bvn', 'bank'));
