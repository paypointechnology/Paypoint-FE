-- =============================================================================
-- Migration 0006 — OWNER KYC (BVN via Kora Identity)
-- Completes the KYC/KYB module: after the CAC business check, the business
-- OWNER verifies their identity by BVN, with name-matching against the
-- profile. kyb_status (plain text) now moves through three stages:
--   'pending' -> 'business_verified' (CAC passed) -> 'verified' (BVN passed)
-- The setup gate and checkout only accept 'verified', so both checks are
-- required for new sellers. Rows already at 'verified' (pre-BVN accounts,
-- i.e. dev/test data) are grandfathered — reset them to 'pending' to re-test.
--
-- PII: the raw BVN is NEVER stored. profiles keeps only the last 4 digits and
-- the verified owner name; the kyb_verifications audit row stores a masked
-- id_value (****1234). Provider responses live in the service-role-only audit
-- table as the statutory KYC record.
-- =============================================================================

alter table public.profiles
  add column if not exists bvn_last4       text,
  add column if not exists kyc_owner_name  text,
  add column if not exists kyc_verified_at timestamptz;
