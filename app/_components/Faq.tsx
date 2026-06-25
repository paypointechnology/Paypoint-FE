"use client";

import { useState } from "react";

/** A single FAQ entry. */
type FaqItem = { q: string; a: string };

const ITEMS: FaqItem[] = [
  {
    q: "Is Paypoint really free?",
    a: "Yes. Creating payment pages, sharing links, and using your dashboard is completely free. We only charge a small transaction fee when a customer pays you.",
  },
  {
    q: "How do I receive my money?",
    a: "Directly into your bank account. Paypoint is not a wallet, every payment settles straight to the bank account you connect during setup.",
  },
  {
    q: "Do my customers need to download an app?",
    a: "No. Your customers just open your payment link in their browser, enter their details, and pay. No downloads, no sign-ups.",
  },
  {
    q: "What can I sell on Paypoint?",
    a: "Anything legal. Products, services, digital downloads, event tickets, deposits, bookings, if you can price it, you can sell it.",
  },
  {
    q: "How fast do payments settle?",
    a: "Payments are processed in real time. Settlement to your bank account typically happens within a few hours.",
  },
  {
    q: "Is it safe for my customers to pay?",
    a: "Absolutely. Every payment is encrypted, and customers receive an instant receipt with a reference number. We're built on trusted payment infrastructure.",
  },
  {
    q: "Can I create more than one payment page?",
    a: "Yes. Create as many pages as you need, one for each product, service, or event.",
  },
  {
    q: "What if a payment fails?",
    a: "No money leaves the customer's account if a payment fails. They can safely try again or use a different payment method.",
  },
  {
    q: "How do I share my payment page?",
    a: "You get a unique link (like paypoint.link/aso-oke-dress) that you can share on WhatsApp, Instagram, Twitter, TikTok, SMS, email, anywhere.",
  },
  {
    q: "Can I see who has paid me?",
    a: "Yes. Your dashboard shows every payment in real time: customer name, item, amount, status, and date.",
  },
];

export default function Faq() {
  // Single-open accordion; first item open by default for a non-empty initial state.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-200 ${
              isOpen ? "border-[#C7C4F7]" : "border-[#ECEBF3]"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
            >
              <span className="text-sm font-semibold text-[#14132B] sm:text-base">
                {item.q}
              </span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEEDFE] text-[#5F58F4] transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-[#6C6B7B] sm:px-6 sm:pb-6">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
