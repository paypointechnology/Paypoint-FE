/**
 * Single source of truth for the buyer-flow prototype data.
 * Frontend only — every public checkout/receipt route renders this fixed
 * sample regardless of the slug/reference in the URL.
 *
 * NOTE: No payment-processor name appears anywhere in this data, by design.
 */

export type SellerContact = {
  type: "whatsapp" | "instagram";
  label: string;
  href: string;
};

export type CheckoutSample = {
  /** Seller */
  business: string;
  /** Avatar mark for the seller (we use the Paypoint icon as a stand-in). */
  sellerLogo: string;
  contacts: SellerContact[];

  /** Product */
  productImage: string; // real photo — the #1 CRO lever
  title: string;
  description: string;
  priceLabel: string; // pre-formatted NGN string
  delivery: string;
  /** Honest social proof. When 0, the UI hides the "paid" item entirely —
   *  never render "0 paid". */
  paidCount: number;

  /** Receipt */
  buyerName: string;
  reference: string;
  dateLabel: string;
};

export const SAMPLE: CheckoutSample = {
  business: "Adaeze Couture",
  sellerLogo: "/assets/paypoint-icon.png",
  contacts: [
    { type: "whatsapp", label: "WhatsApp", href: "https://wa.me/2348012345678" },
    {
      type: "instagram",
      label: "Instagram",
      href: "https://instagram.com/adaezecouture",
    },
  ],

  productImage:
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
  title: "Aso Oke Dress",
  description:
    "Hand-woven Aso Oke, fully lined. Made to order in your measurements.",
  priceLabel: "₦35,000",
  delivery: "Nationwide · 3 days",
  paidCount: 24,

  buyerName: "Chidinma Okeke",
  reference: "PP-7F3A9C2E",
  dateLabel: "22 Jun 2026, 2:14 PM",
};
