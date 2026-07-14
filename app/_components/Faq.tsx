"use client";

import { useState } from "react";

/** A single FAQ entry. */
type FaqItem = { q: string; a: string };

const ITEMS: FaqItem[] = [
  {
    q: "Is it free to get started?",
    a: "Yes. Creating your account and your first checkout is free. Paypoint charges a small fee only when a customer successfully pays you, so you only pay when you earn. There are no monthly subscriptions and no setup fees.",
  },
  {
    q: "How does my money get to me?",
    a: "You connect your bank account when you set up Paypoint. Every time a customer pays, the money settles directly into that account. Paypoint never holds your funds, we are not a bank, and your money is never in a Paypoint wallet. It goes straight to your bank.",
  },
  {
    q: "Do my customers need an account to pay?",
    a: "No. Your customer clicks the link, sees your checkout, and pays. That's it. They don't need to sign up, create an account, or download anything. The checkout works in any browser, including inside Instagram, WhatsApp, and TikTok.",
  },
  {
    q: "What payment methods do customers use?",
    a: "Customers can pay with debit cards, bank transfers, and USSD, all the methods they already use daily. Payments are processed securely and support all major Nigerian banks and card networks.",
  },
  {
    q: "Do I need a website or any technical skills?",
    a: "No website. No code. No developer. If you can fill in a form and upload a photo, you can create a Paypoint checkout. The whole setup takes under a minute. You share the link the same way you'd share any link, in your bio, in a chat, in a post.",
  },
  {
    q: "Is it safe for my customers to pay?",
    a: "Yes. All payments are secured with bank-grade encryption. Your customer's card details never touch Paypoint servers. Every successful payment generates an instant receipt.",
  },
  {
    q: "What can I sell with Paypoint?",
    a: "Anything. Physical products, services, event tickets, deposits, digital downloads, consultations, courses, subscriptions, if you can price it, you can create a Paypoint checkout for it. You can have as many checkouts as you need, one for each product or service.",
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
