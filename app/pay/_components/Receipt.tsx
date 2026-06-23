"use client";

import { CheckIcon } from "./icons";
import SecureFooter from "./SecureFooter";
import { SAMPLE } from "../../p/_components/sampleCheckout";

/**
 * The successful-payment receipt — a single shared visual reused by:
 *   - /pay/callback (status=success)
 *   - /pay/receipt/[reference]  (stable, retrievable copy)
 *
 * `reference` is passed in so each route can show its own URL/query reference;
 * everything else comes from the fixed sample data.
 */
export default function Receipt({ reference }: { reference: string }) {
  // Frontend prototype — Download is window.print() and Share uses the Web
  // Share API when available, falling back to copying the link.
  function handleDownload() {
    if (typeof window !== "undefined") window.print();
  }

  async function handleShare() {
    if (typeof navigator === "undefined") return;
    const url = `${window.location.origin}/pay/receipt/${reference}`;
    const data = {
      title: "Paypoint receipt",
      text: `Receipt for your payment to ${SAMPLE.business}`,
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      /* user dismissed share sheet — no-op */
    }
  }

  const details: { label: string; value: string }[] = [
    { label: "Item", value: SAMPLE.title },
    { label: "Paid by", value: SAMPLE.buyerName },
    { label: "Reference", value: reference },
    { label: "Date", value: SAMPLE.dateLabel },
  ];

  return (
    <div className="relative w-full max-w-[420px] animate-onboard-fade">
      {/* Logo */}
      <div className="mb-7 flex justify-center">
        <img
          src="/assets/paypoint-wordmark-indigo.png"
          alt="Paypoint"
          className="h-7 w-auto"
        />
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-[20px] border border-[#ECEBF3] bg-white shadow-[0_4px_24px_rgba(20,19,43,0.06)]">
        <div className="px-6 pb-6 pt-8 text-center sm:px-8">
          {/* Green check */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E7F8EF]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B7A4B] text-white">
              <CheckIcon size={18} />
            </span>
          </div>

          <h1 className="mt-4 text-[20px] font-semibold tracking-[-0.01em] text-[#14132B]">
            Payment successful
          </h1>
          <p className="mt-1 text-sm text-[#6C6B7B]">
            Your payment to{" "}
            <span className="font-medium text-[#33323F]">
              {SAMPLE.business}
            </span>{" "}
            is complete
          </p>

          {/* Big amount */}
          <p className="mt-5 text-[34px] font-bold leading-none tracking-[-0.02em] text-[#14132B]">
            {SAMPLE.priceLabel}
          </p>
        </div>

        {/* Details list */}
        <div className="mx-6 rounded-[14px] border border-[#ECEBF3] bg-[#FAFAFE] px-4 py-1 sm:mx-8">
          <dl>
            {details.map((d, i) => (
              <div
                key={d.label}
                className={`flex items-center justify-between gap-4 py-3 ${
                  i !== details.length - 1 ? "border-b border-[#ECEBF3]" : ""
                }`}
              >
                <dt className="shrink-0 text-xs font-medium text-[#9A99A8]">
                  {d.label}
                </dt>
                <dd
                  className={`truncate text-right text-sm font-medium text-[#33323F] ${
                    d.label === "Reference"
                      ? "font-mono tracking-tight text-[#14132B]"
                      : ""
                  }`}
                >
                  {d.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 pb-6 pt-6 sm:px-8">
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#5F58F4] text-sm font-semibold text-white transition hover:bg-[#4A43D6]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download receipt
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#E3E2EE] bg-white text-sm font-semibold text-[#33323F] transition hover:bg-[#FAFAFE]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
            </svg>
            Share
          </button>
        </div>
      </div>

      {/* Saved-copy reassurance */}
      <p className="mt-4 text-center text-xs text-[#9A99A8]">
        A copy is saved at your Paypoint link — you can find it anytime.
      </p>

      <SecureFooter />
    </div>
  );
}
