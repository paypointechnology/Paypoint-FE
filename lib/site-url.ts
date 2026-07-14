/**
 * Resolves the app's base URL for building auth redirect targets.
 * Prefers the configured NEXT_PUBLIC_SITE_URL; falls back to the current
 * browser origin (client-only) so previews / local dev still work.
 */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "http://localhost:3000";
}
