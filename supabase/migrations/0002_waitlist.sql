-- =============================================================================
-- Migration 0002 — WAITLIST / EARLY ACCESS
-- Captures early-access signups from /coming-soon plus an optional 3-question
-- survey. Written only by trusted server actions using the service-role client
-- (see app/coming-soon/actions.ts). RLS is enabled with NO policies, so anon
-- and authenticated clients cannot touch the table directly — the service role
-- bypasses RLS. This prevents public reads (email harvesting) and public writes.
-- =============================================================================

create table if not exists public.waitlist (
  id               uuid primary key default gen_random_uuid(),
  email            text not null unique,
  -- Optional survey answers (may be null if the user skips the modal).
  sells            text,        -- Q1 single: products | services | digital | events
  channels         text[],      -- Q2 multi:  instagram, whatsapp, tiktok, ...
  challenge        text,        -- Q3 single: getting-paid | followup | orders | professional
  source           text,        -- where they signed up: 'hero' | 'join'
  survey_completed boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx
  on public.waitlist (created_at desc);

-- Default-deny: enable RLS and add NO policies. Only service_role writes.
alter table public.waitlist enable row level security;

-- Keep updated_at fresh on survey enrichment (reuses the helper from 0001).
drop trigger if exists waitlist_set_updated_at on public.waitlist;
create trigger waitlist_set_updated_at
  before update on public.waitlist
  for each row execute function public.set_updated_at();
