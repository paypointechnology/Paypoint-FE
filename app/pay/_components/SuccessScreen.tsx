"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SAMPLE } from "../../p/_components/sampleCheckout";

/**
 * Payment success screen (/pay/callback?status=success). Celebratory confetti +
 * draw-in checkmark, a payment summary, an order timeline, and a link to the
 * full receipt. Frontend prototype: content comes from the fixed sample.
 */

const CONFETTI = ["#5F58F4", "#12B76A", "#F5A623", "#C7C4F7", "#EEEDFE"];

export default function SuccessScreen({
  reference,
  amountLabel = SAMPLE.priceLabel,
  business = SAMPLE.business,
  title = SAMPLE.title,
  dateLabel = SAMPLE.dateLabel,
}: {
  reference: string;
  amountLabel?: string;
  business?: string;
  title?: string;
  dateLabel?: string;
}) {
  const burstRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = burstRef.current;
    if (!wrap) return;
    const pieces: HTMLSpanElement[] = [];
    for (let i = 0; i < 42; i++) {
      const el = document.createElement("span");
      const size = 5 + Math.random() * 7;
      el.className = "confetti-piece";
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.background = CONFETTI[i % CONFETTI.length];
      el.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      el.style.animation = `cf${i % 10} ${1.4 + Math.random() * 0.6}s ease-out ${Math.random() * 0.4}s forwards`;
      wrap.appendChild(el);
      pieces.push(el);
    }
    const t = window.setTimeout(() => pieces.forEach((p) => p.remove()), 2400);
    return () => {
      window.clearTimeout(t);
      pieces.forEach((p) => p.remove());
    };
  }, []);

  const summary: { label: string; value: string; accent?: "amount" | "ref" | "ok" }[] = [
    { label: "Amount paid", value: amountLabel, accent: "amount" },
    { label: "Reference", value: reference, accent: "ref" },
    { label: "Date", value: dateLabel },
    { label: "Merchant", value: business },
    { label: "Item", value: title },
    { label: "Status", value: "Successful", accent: "ok" },
  ];

  return (
    <div className="w-full max-w-[440px] overflow-hidden rounded-[24px] border border-[#ECEBF3] bg-white shadow-[0_20px_60px_-30px_rgba(95,88,244,0.35)]">
      {/* Hero */}
      <div className="relative bg-gradient-to-b from-[#E7F8EF] to-white px-7 pb-6 pt-9 text-center">
        <div ref={burstRef} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" />
        <div className="relative mx-auto mb-4 h-20 w-20">
          <div className="absolute inset-0 rounded-full border-2 border-[#12B76A]/20 bg-[#E7F8EF]" />
          <svg viewBox="0 0 80 80" fill="none" className="relative h-20 w-20">
            <circle className="check-circle" cx="40" cy="40" r="36" stroke="#12B76A" strokeWidth="3" fill="none" />
            <path className="check-mark" d="M24 41L34 51L56 30" stroke="#12B76A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
        <h1 className="text-xl font-extrabold tracking-[-0.01em] text-[#0B7A4B]">Payment successful</h1>
        <p className="mx-auto mt-1.5 max-w-[300px] text-sm leading-relaxed text-[#6C6B7B]">
          Your order has been confirmed and sent to the seller. Thank you for
          shopping with <span className="font-semibold text-[#33323F]">{business}</span>.
        </p>
      </div>

      {/* Payment summary */}
      <div className="px-[18px] pt-4">
        <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#9A99A8]">
          Payment summary
        </span>
        <div className="overflow-hidden rounded-[14px] border border-[#ECEBF3]">
          {summary.map((r, i) => (
            <div key={r.label} className={`flex items-center justify-between gap-4 px-4 py-3 ${i < summary.length - 1 ? "border-b border-[#ECEBF3]" : ""}`}>
              <span className="shrink-0 text-[13px] text-[#6C6B7B]">{r.label}</span>
              <span
                className={`truncate text-right font-bold text-[#14132B] ${
                  r.accent === "amount"
                    ? "text-[18px] text-[#0B7A4B]"
                    : r.accent === "ref"
                    ? "font-mono text-[12px] text-[#5F58F4]"
                    : r.accent === "ok"
                    ? "text-[13px] text-[#0B7A4B]"
                    : "text-[13px]"
                }`}
              >
                {r.accent === "ok" ? "✓ Successful" : r.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Order timeline */}
      <div className="px-[18px] pt-4">
        <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#9A99A8]">
          Order status
        </span>
        <div className="overflow-hidden rounded-[14px] border border-[#ECEBF3] bg-[#FAFAFE]">
          <TimelineRow state="done" label="Payment completed" sub="Just now" />
          <TimelineRow state="done" label="Merchant notified" sub={`${business} alerted`} />
          <TimelineRow state="active" label="Order processing" sub="Expected response within 24 hrs" />
          <TimelineRow state="future" label="Shipped" sub="Updated by the seller" />
          <TimelineRow state="future" label="Delivered" sub="Per the seller's timeline" last />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2.5 px-[18px] pt-4">
        <Link href={`/pay/receipt/${reference}`} className="flex h-12 w-full items-center justify-center gap-2 rounded-[13px] bg-[#5F58F4] text-[15px] font-bold text-white transition hover:bg-[#4A43D6]">
          View receipt
        </Link>
        <Link href="/" className="flex h-11 w-full items-center justify-center gap-2 rounded-[13px] border border-[#E3E2EE] bg-[#FAFAFE] text-sm font-semibold text-[#33323F] transition hover:border-[#C7C4F7] hover:text-[#5F58F4]">
          Continue shopping
        </Link>
      </div>

      {/* Footer */}
      <div className="px-[18px] pb-6 pt-5 text-center">
        <p className="text-[13px] font-extrabold tracking-[-0.02em] text-[#5F58F4]">Paypoint.</p>
        <p className="mt-1 text-[11px] leading-relaxed text-[#9A99A8]">
          Your payment was sent directly to the seller&rsquo;s verified bank account.
        </p>
      </div>
    </div>
  );
}

function TimelineRow({
  state,
  label,
  sub,
  last,
}: {
  state: "done" | "active" | "future";
  label: string;
  sub: string;
  last?: boolean;
}) {
  const dot =
    state === "done"
      ? "bg-[#12B76A] text-white"
      : state === "active"
      ? "border border-[#F5A623] bg-[#FEF0DC] text-[#9A5A00]"
      : "bg-[#ECEBF3] text-[#9A99A8]";
  const labelColor =
    state === "done" ? "text-[#0B7A4B]" : state === "active" ? "text-[#9A5A00]" : "text-[#9A99A8]";

  return (
    <div className={`relative flex items-start gap-3 px-4 py-3 ${last ? "" : "border-b border-[#ECEBF3]"}`}>
      {!last && <span className="absolute left-[27px] top-[34px] h-[calc(100%-34px)] w-px bg-[#ECEBF3]" aria-hidden />}
      <span className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${dot}`}>
        {state === "done" ? "✓" : state === "active" ? "⏳" : "•"}
      </span>
      <div>
        <p className={`text-[13px] font-bold ${labelColor}`}>{label}</p>
        <p className="mt-0.5 text-[11px] text-[#9A99A8]">{sub}</p>
      </div>
    </div>
  );
}
