/**
 * Small shared formatting helpers for the create-page builder and the
 * public checkout. Frontend only — no I/O.
 */

/**
 * URL-safe slug from a free-text title.
 * lowercase → strip punctuation → collapse whitespace to single hyphens →
 * trim leading/trailing hyphens. Returns "" for empty/whitespace input so the
 * caller can supply its own fallback.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // drop punctuation/symbols
    .replace(/[\s-]+/g, "-") // whitespace & runs of hyphens → single hyphen
    .replace(/^-+|-+$/g, ""); // trim edge hyphens
}

/**
 * Keep only digits from a raw price string (defensive — inputs are
 * already numeric-filtered, but this guards paste).
 */
export function digitsOnly(input: string): string {
  return input.replace(/\D/g, "");
}

/**
 * Group a digit string with thousands separators: "35000" → "35,000".
 * Empty in → empty out.
 */
export function groupThousands(digits: string): string {
  const clean = digitsOnly(digits).replace(/^0+(?=\d)/, ""); // no leading zeros
  if (!clean) return "";
  return clean.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Full NGN price label from a digit string: "35000" → "₦35,000".
 * Empty in → "" (caller decides the placeholder).
 */
export function nairaLabel(digits: string): string {
  const grouped = groupThousands(digits);
  return grouped ? `₦${grouped}` : "";
}
