-- =============================================================================
-- Migration 0004 — KYB VERIFICATIONS (Kora Identity)
-- Real business verification replaces the simulated KYB setup step.
--   1) profiles gains the verified registration details (RC/BN number, the
--      registry's legal name, and when verification happened).
--   2) kyb_verifications is an append-only audit log of every provider lookup
--      (also used to rate-limit paid identity API calls). Written/read
--      exclusively by trusted server actions using the service-role client.
--      RLS is enabled with NO policies, so anon/authenticated clients cannot
--      read registry responses or forge verification rows.
-- =============================================================================

alter table public.profiles
  add column if not exists rc_number           text,
  add column if not exists kyb_registered_name text,
  add column if not exists kyb_verified_at     timestamptz;

create table if not exists public.kyb_verifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles (id) on delete cascade,
  id_type    text not null check (id_type in ('cac', 'bvn')),
  id_value   text not null,           -- normalized RC/BN number (or masked BVN)
  status     text not null check (status in ('verified', 'failed')),
  provider   text not null default 'kora',  -- 'kora' | 'dev' (simulated)
  response   jsonb,                   -- raw provider response, for audit
  created_at timestamptz not null default now()
);

create index if not exists kyb_verifications_user_idx
  on public.kyb_verifications (user_id, created_at desc);

-- Default-deny: enable RLS, add NO policies. Only service_role touches it.
alter table public.kyb_verifications enable row level security;
