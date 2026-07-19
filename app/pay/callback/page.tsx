"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SuccessScreen from "../_components/SuccessScreen";
import { SAMPLE } from "../../p/_components/sampleCheckout";

/**
 * Payment result — /pay/callback?status=success|failed&ref=...
 * Reads the query (so it must be wrapped in <Suspense>, per Next).
 *   success → the celebratory SuccessScreen
 *   failed  → a calm, reassuring "not completed" screen
 */
function CallbackContent() {
  const params = useSearchParams();
  const status = params.get("status") ?? "success";
  const ref = params.get("ref") ?? SAMPLE.reference;

  if (status === "failed") return <FailedScreen reference={ref} />;
  return <SuccessScreen reference={ref} />;
}

function FailedScreen({ reference }: { reference: string }) {
  const reasons = [
    "Network interruption during payment",
    "Bank declined the transaction",
    "Payment session expired",
    "Insufficient account balance",
    "Payment was cancelled",
  ];

  return (
    <div className="w-full max-w-[440px] overflow-hidden rounded-[24px] border border-[#ECEBF3] bg-white shadow-[0_20px_60px_-30px_rgba(95,88,244,0.35)]">
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#FEECEB] to-white px-7 pb-6 pt-9 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#B42318]/20 bg-[#FEECEB] text-3xl">
          ✕
        </div>
        <h1 className="text-xl font-extrabold tracking-[-0.01em] text-[#B42318]">Payment not completed</h1>
        <p className="mx-auto mt-1.5 max-w-[300px] text-sm leading-relaxed text-[#6C6B7B]">
          Your payment could not be completed. No money left your account.
        </p>
      </div>

      {/* Reassure */}
      <div className="px-[18px] pt-4">
        <div className="rounded-[14px] border border-[#ECEBF3] bg-[#FAFAFE] px-4 py-3.5">
          <p className="text-[13px] font-bold text-[#14132B]">🛡️ No money was deducted</p>
          <p className="mt-1 text-[13px] leading-relaxed text-[#6C6B7B]">
            Paypoint has not charged your account. If funds left your account but
            you haven&rsquo;t received confirmation, contact your bank with your
            payment reference.
          </p>
        </div>
      </div>

      {/* Possible reasons */}
      <div className="px-[18px] pt-3">
        <div className="rounded-[14px] border border-[#ECEBF3] bg-white px-4 py-3.5">
          <p className="mb-2.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#9A99A8]">
            Possible reasons
          </p>
          {reasons.map((r, i) => (
            <div key={r} className={`flex items-center gap-2.5 py-1.5 text-[13px] text-[#33323F] ${i < reasons.length - 1 ? "border-b border-[#ECEBF3]" : ""}`}>
              <span className="text-[#B42318]">·</span> {r}
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="px-[18px] pt-4">
        <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#9A99A8]">
          Payment details
        </span>
        <div className="overflow-hidden rounded-[14px] border border-[#ECEBF3]">
          <DetailRow label="Reference" value={reference} mono />
          <DetailRow label="Amount" value={SAMPLE.priceLabel} />
          <DetailRow label="Merchant" value={SAMPLE.business} />
          <DetailRow label="Status" value="Not completed" danger last />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2.5 px-[18px] pt-4">
        <Link href="/" className="flex h-12 w-full items-center justify-center rounded-[13px] bg-[#B42318] text-[15px] font-bold text-white transition hover:bg-[#9A1D14]">
          Try again
        </Link>
        <Link href="/" className="flex h-11 w-full items-center justify-center rounded-[13px] border border-[#E3E2EE] bg-[#FAFAFE] text-sm font-semibold text-[#33323F] transition hover:border-[#C7C4F7] hover:text-[#5F58F4]">
          Back to seller
        </Link>
      </div>

      {/* Support */}
      <div className="px-[18px] pt-4">
        <div className="rounded-[14px] border border-[#EEEDFE] bg-[#F5F4FF] px-4 py-3">
          <p className="text-xs font-bold text-[#5F58F4]">Need help?</p>
          <p className="mt-1 text-[13px] leading-relaxed text-[#6C6B7B]">
            Contact the seller directly, or reach Paypoint support with your
            reference: <span className="font-mono text-[12px] font-bold text-[#5F58F4]">{reference}</span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-[18px] pb-6 pt-5 text-center">
        <p className="text-[13px] font-extrabold tracking-[-0.02em] text-[#5F58F4]">Paypoint.</p>
        <p className="mt-1 text-[11px] leading-relaxed text-[#9A99A8]">
          No funds are held by Paypoint. Payments settle directly to the seller.
        </p>
      </div>
    </div>
  );
}

function DetailRow({ label, value, mono, danger, last }: { label: string; value: string; mono?: boolean; danger?: boolean; last?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-4 px-4 py-3 ${last ? "" : "border-b border-[#ECEBF3]"}`}>
      <span className="shrink-0 text-[13px] text-[#6C6B7B]">{label}</span>
      <span className={`truncate text-right text-[13px] font-bold ${mono ? "font-mono text-[#5F58F4]" : danger ? "text-[#B42318]" : "text-[#14132B]"}`}>
        {value}
      </span>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <main className="flex min-h-[100dvh] w-full justify-center bg-[#F5F4FF] px-4 py-6 sm:py-10">
      <Suspense
        fallback={
          <div className="self-center h-8 w-8 animate-spin rounded-full border-[3px] border-[#EEEDFE] border-t-[#5F58F4]" />
        }
      >
        <CallbackContent />
      </Suspense>
    </main>
  );
}
