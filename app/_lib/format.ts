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

/**
 * NGN label from a kobo amount (the DB stores prices in kobo).
 * 3_500_000 → "₦35,000". Null/undefined → "₦0".
 */
export function nairaFromKobo(kobo: number | null | undefined): string {
  const naira = Math.round((kobo ?? 0) / 100);
  return `₦${naira.toLocaleString("en-NG")}`;
}

/**
 * Compact "time since" label for created dates: "Today" / "3 days ago" /
 * "2 weeks ago" / "1 month ago". Empty/invalid → "".
 */
export function agoLabel(iso: string | null | undefined): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const days = Math.floor((Date.now() - then) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 14) return "1 week ago";
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 60) return "1 month ago";
  return `${Math.floor(days / 30)} months ago`;
}

/**
 * Human day label for a payment timestamp: "Today" / "Yesterday" /
 * "12 Jun". Empty/invalid → "".
 */
export function relativeDay(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const startOf = (x: Date) =>
    new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const days = Math.round((startOf(new Date()) - startOf(d)) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  return d.toLocaleDateString("en-NG", { day: "numeric", month: "short" });
}
