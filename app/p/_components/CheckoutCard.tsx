"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SAMPLE } from "./sampleCheckout";
import {
  LockIcon,
  ShieldIcon,
  TruckIcon,
  StarIcon,
  WhatsAppIcon,
  InstagramIcon,
} from "../../pay/_components/icons";

/**
 * The buyer checkout — the conversion spine. ONE card, two callers:
 *   1. Public buyer page (/p/[slug]) — no props → renders the fixed SAMPLE.
 *   2. The create-page builder's "Live preview" — passes `data` + `preview`
 *      so the same card mirrors the seller's form in real time (DRY).
 *
 * UNAVAILABLE-STATE PATTERN (for later, when a page can be inactive):
 *   if (!page.active) render a calm centered card — Paypoint wordmark on
 *   #F5F4FF, a muted "This payment page is currently unavailable" line, and a
 *   seller-contact chip — NOT an error/404. Default below renders the active
 *   checkout.
 */

/** Which buyer fields the checkout collects. Name is always on. */
export type BuyerFields = {
  phone: boolean;
  email: boolean;
  address: boolean;
};

/** The subset of checkout content the builder controls. */
export type CheckoutData = {
  business: string;
  sellerLogo: string;
  contacts: typeof SAMPLE.contacts;
  /** Real photo URL/object-URL, or "" for the branded neutral state. */
  productImage: string;
  title: string;
  description: string;
  /** Pre-formatted NGN string, e.g. "₦35,000". */
  priceLabel: string;
  delivery: string;
  paidCount: number;
  buyerFields: BuyerFields;
};

const DEFAULT_FIELDS: BuyerFields = {
  phone: true,
  email: false,
  address: false,
};

export default function CheckoutCard({
  data,
  preview = false,
}: {
  data?: Partial<CheckoutData>;
  /** Preview = no navigation on Pay, render as a non-interactive showcase. */
  preview?: boolean;
} = {}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // photoOk toggles the real-photo vs. branded-neutral fallback when an <img>
  // fails to load. The explicit empty-string check below handles "no photo".
  const [photoOk, setPhotoOk] = useState(true);

  // Resolve content: builder overrides win; otherwise the fixed SAMPLE.
  const business = data?.business ?? SAMPLE.business;
  const sellerLogo = data?.sellerLogo ?? SAMPLE.sellerLogo;
  const contacts = data?.contacts ?? SAMPLE.contacts;
  const productImage = data?.productImage ?? SAMPLE.productImage;
  const title = data?.title ?? SAMPLE.title;
  const description = data?.description ?? SAMPLE.description;
  const priceLabel = data?.priceLabel ?? SAMPLE.priceLabel;
  const delivery = data?.delivery ?? SAMPLE.delivery;
  const paidCount = data?.paidCount ?? SAMPLE.paidCount;
  const fields = data?.buyerFields ?? DEFAULT_FIELDS;

  // In preview, the seller hasn't typed anything yet — show muted placeholders
  // rather than blank space so the card never looks broken.
  const titleText = title || (preview ? "Your product title" : title);
  const titleMuted = preview && !title;
  const showPhoto = Boolean(productImage) && photoOk;

  function handlePay() {
    if (preview) return; // builder preview is non-interactive
    router.push("/pay/redirect");
  }

  return (
    <div className="relative w-full max-w-[420px] animate-onboard-fade">
      {/* Seller header row */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#ECEBF3] bg-white">
            <img
              src={sellerLogo}
              alt=""
              className="h-6 w-6 object-contain"
            />
          </span>
          <span className="truncate text-sm font-semibold text-[#14132B]">
            {business}
          </span>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#EEEDFE] px-2.5 py-1 text-[11px] font-semibold text-[#5F58F4]">
          <LockIcon size={11} />
          Secure
        </span>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-[20px] border border-[#ECEBF3] bg-white shadow-[0_4px_24px_rgba(20,19,43,0.06)]">
        {/* Product image — real photo, with branded neutral fallback */}
        {showPhoto ? (
          <img
            src={productImage}
            alt={titleMuted ? "" : titleText}
            onError={() => setPhotoOk(false)}
            className="aspect-[5/4] w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[5/4] w-full items-center justify-center bg-[#F5F4FF]">
            <img
              src="/assets/paypoint-wordmark-indigo.png"
              alt="Paypoint"
              className="h-7 w-auto opacity-80"
            />
          </div>
        )}

        <div className="p-5 sm:p-6">
          {/* Title + description + price */}
          <h1
            className={`text-lg font-semibold tracking-[-0.01em] ${
              titleMuted ? "text-[#9A99A8]" : "text-[#14132B]"
            }`}
          >
            {titleText}
          </h1>
          {description && (
            <p className="mt-1.5 text-sm leading-relaxed text-[#6C6B7B]">
              {description}
            </p>
          )}
          <p className="mt-3 text-[28px] font-bold leading-none tracking-[-0.02em] text-[#14132B]">
            {priceLabel || (preview ? "₦0" : priceLabel)}
          </p>

          {/* Meta row: delivery + social proof.
              Social proof is hidden entirely when paidCount === 0 —
              never render "0 paid". Delivery hidden when empty. */}
          {(delivery || paidCount > 0) && (
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#ECEBF3] pt-4 text-sm">
              {delivery && (
                <span className="inline-flex items-center gap-1.5 text-[#33323F]">
                  <span className="text-[#9A99A8]">
                    <TruckIcon size={15} />
                  </span>
                  {delivery}
                </span>
              )}
              {paidCount > 0 && (
                <span className="inline-flex items-center gap-1.5 text-[#33323F]">
                  <span className="text-[#F5A623]">
                    <StarIcon size={13} />
                  </span>
                  {paidCount} paid
                </span>
              )}
            </div>
          )}

          {/* Buyer fields — Name is always collected. The rest are toggled
              by the seller in the builder. */}
          <div className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="buyer-name"
                className="mb-1.5 block text-xs font-semibold text-[#6C6B7B]"
              >
                Your name
              </label>
              <input
                id="buyer-name"
                name="buyer-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Chidinma Okeke"
                autoComplete="name"
                tabIndex={preview ? -1 : undefined}
                className="h-11 w-full rounded-[10px] border border-[#E3E2EE] bg-white px-3.5 text-sm text-[#14132B] outline-none transition placeholder:text-[#9A99A8] focus:border-[#5F58F4] focus:ring-2 focus:ring-[#EEEDFE]"
              />
            </div>
            {fields.phone && (
              <div>
                <label
                  htmlFor="buyer-phone"
                  className="mb-1.5 block text-xs font-semibold text-[#6C6B7B]"
                >
                  Phone number
                </label>
                <input
                  id="buyer-phone"
                  name="buyer-phone"
                  type="tel"
                  inputMode="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0801 234 5678"
                  autoComplete="tel"
                  tabIndex={preview ? -1 : undefined}
                  className="h-11 w-full rounded-[10px] border border-[#E3E2EE] bg-white px-3.5 text-sm text-[#14132B] outline-none transition placeholder:text-[#9A99A8] focus:border-[#5F58F4] focus:ring-2 focus:ring-[#EEEDFE]"
                />
              </div>
            )}
            {fields.email && (
              <div>
                <label
                  htmlFor="buyer-email"
                  className="mb-1.5 block text-xs font-semibold text-[#6C6B7B]"
                >
                  Email address
                </label>
                <input
                  id="buyer-email"
                  name="buyer-email"
                  type="email"
                  inputMode="email"
                  placeholder="you@email.com"
                  autoComplete="email"
                  tabIndex={preview ? -1 : undefined}
                  readOnly={preview}
                  className="h-11 w-full rounded-[10px] border border-[#E3E2EE] bg-white px-3.5 text-sm text-[#14132B] outline-none transition placeholder:text-[#9A99A8] focus:border-[#5F58F4] focus:ring-2 focus:ring-[#EEEDFE]"
                />
              </div>
            )}
            {fields.address && (
              <div>
                <label
                  htmlFor="buyer-address"
                  className="mb-1.5 block text-xs font-semibold text-[#6C6B7B]"
                >
                  Delivery address
                </label>
                <input
                  id="buyer-address"
                  name="buyer-address"
                  type="text"
                  placeholder="House, street, city"
                  autoComplete="street-address"
                  tabIndex={preview ? -1 : undefined}
                  readOnly={preview}
                  className="h-11 w-full rounded-[10px] border border-[#E3E2EE] bg-white px-3.5 text-sm text-[#14132B] outline-none transition placeholder:text-[#9A99A8] focus:border-[#5F58F4] focus:ring-2 focus:ring-[#EEEDFE]"
                />
              </div>
            )}
          </div>

          {/* Pay button */}
          <button
            type="button"
            onClick={handlePay}
            tabIndex={preview ? -1 : undefined}
            aria-disabled={preview || undefined}
            className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#5F58F4] text-[15px] font-semibold text-white transition hover:bg-[#4A43D6]"
          >
            <LockIcon size={15} />
            Pay {priceLabel || (preview ? "₦0" : priceLabel)}
          </button>

          {/* Trust block */}
          <p className="mt-4 text-center text-xs leading-relaxed text-[#6C6B7B]">
            After payment you&rsquo;ll get an instant receipt with a reference
            number. Money goes straight to {business}&rsquo;s bank — we never
            hold it.
          </p>

          {/* Seller contact chips */}
          {contacts.length > 0 && (
            <div className="mt-4 flex items-center justify-center gap-2.5">
              {contacts.map((c) => (
                <a
                  key={c.type}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={preview ? -1 : undefined}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E3E2EE] bg-white px-3 py-1.5 text-xs font-medium text-[#33323F] transition hover:border-[#C7C4F7] hover:bg-[#F5F4FF]"
                >
                  <span className="text-[#5F58F4]">
                    {c.type === "whatsapp" ? (
                      <WhatsAppIcon size={14} />
                    ) : (
                      <InstagramIcon size={14} />
                    )}
                  </span>
                  {c.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer secure line */}
      <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-[#9A99A8]">
        <ShieldIcon size={13} />
        Secure checkout
      </p>
    </div>
  );
}
