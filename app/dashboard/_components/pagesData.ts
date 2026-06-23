/**
 * Static sample data for the seller's payment pages — frontend only, no backend.
 * Distinct filename (pagesData) to avoid any case-collision with components.
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

export const sellerPages: SellerPage[] = [
  {
    slug: "aso-oke-dress",
    title: "Aso Oke Dress",
    type: "Product",
    priceLabel: "₦35,000",
    paidCount: 24,
    active: true,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "professional-cv-writing",
    title: "Professional CV Writing",
    type: "Service",
    priceLabel: "₦25,000",
    paidCount: 60,
    active: true,
    image: "",
  },
  {
    slug: "bridal-gele-styling",
    title: "Bridal Gele Styling",
    type: "Service",
    priceLabel: "₦18,000",
    paidCount: 12,
    active: true,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "asoebi-bundle",
    title: "Asoebi Bundle",
    type: "Product",
    priceLabel: "₦15,000",
    paidCount: 31,
    active: true,
    image:
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=80",
  },
];

/** Build the public share link for a page from its slug. */
export function pageLink(slug: string): string {
  return `https://paypoint.link/${slug}`;
}
