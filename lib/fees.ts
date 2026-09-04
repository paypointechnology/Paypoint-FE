import "server-only";

/**
 * Paypoint's take per successful payment, computed at charge time and recorded
 * on the payment row so the payout leg never re-derives it. Configured via env
 * so pricing can change without a deploy:
 *   PAYPOINT_FEE_PERCENT   e.g. "2"      (default 2%)
 *   PAYPOINT_FEE_FLAT_KOBO e.g. "10000"  (default 0 — flat add-on in kobo)
 *   PAYPOINT_FEE_CAP_KOBO  e.g. "200000" (default ₦2,000 cap)
 */
/** Parse an env number; a missing or malformed value falls back loudly. */
function envNumber(name: string, fallback: number): number {
  const raw = process.env[name];
  if (raw == null || raw === "") return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) {
    console.error(`[fees] ${name}="${raw}" is not a valid number — using ${fallback}.`);
    return fallback;
  }
  return n;
}

export function computeFeeKobo(amountKobo: number): number {
  const pct = envNumber("PAYPOINT_FEE_PERCENT", 2);
  const flat = envNumber("PAYPOINT_FEE_FLAT_KOBO", 0);
  const cap = envNumber("PAYPOINT_FEE_CAP_KOBO", 200_000);

  const fee = Math.round((amountKobo * pct) / 100) + flat;
  const capped = cap > 0 ? Math.min(fee, cap) : fee;
  // Never let the fee consume the payment.
  return Math.max(0, Math.min(capped, amountKobo));
}
