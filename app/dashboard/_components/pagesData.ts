import { getSiteUrl } from "@/lib/site-url";

/**
 * View types for the seller's payment pages. Real rows are loaded from Supabase
 * in lib/data.ts (getUserPages) and mapped into this shape.
 */

export type PageType = "Product" | "Service";

export type SellerPage = {
  slug: string;
  title: string;
  type: PageType;
  /** Pre-formatted NGN price string, e.g. "₦35,000". */
  priceLabel: string;
  paidCount: number;
  active: boolean;
  /** Real photo URL, or "" for the branded neutral state (never a grey box). */
  image: string;
};

/** Build the public share link for a page from its slug. */
export function pageLink(slug: string): string {
  return `${getSiteUrl()}/p/${slug}`;
}
