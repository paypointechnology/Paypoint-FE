-- =============================================================================
-- Migration 0003 — PHONE OTPS (WhatsApp verification)
-- Short-lived one-time codes for verifying a seller's WhatsApp number during
-- onboarding. Only the SHA-256 hash of the code is stored, never the code.
-- Written/read exclusively by trusted server actions using the service-role
-- client (app/dashboard/setup/actions.ts). RLS is enabled with NO policies, so
-- anon/authenticated clients cannot read hashes or forge rows.
-- =============================================================================

create table if not exists public.phone_otps (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles (id) on delete cascade,
  phone      text not null,          -- normalized E.164, e.g. +2348012345678
  code_hash  text not null,          -- sha256(code)
  expires_at timestamptz not null,
  attempts   int  not null default 0,
  consumed   boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists phone_otps_user_idx
  on public.phone_otps (user_id, created_at desc);

-- Default-deny: enable RLS, add NO policies. Only service_role touches it.
alter table public.phone_otps enable row level security;
