"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SuccessScreen from "../_components/SuccessScreen";
import { SAMPLE } from "../../p/_components/sampleCheckout";
import { getPaymentResult, type PaymentResult } from "../../p/actions";
import { nairaFromKobo } from "@/app/_lib/format";

/**
 * Payment result — /pay/callback.
 * Real flow: the provider redirects here with ?reference=... — we look the
 * payment up and, because the webhook is the source of truth, poll briefly
 * (with backoff) while it's still pending. Outcomes are honest:
 *   success            -> SuccessScreen with the payment's real details
 *   failed / abandoned -> FailedScreen (the only definitive-failure surface)
 *   pending / lookup errors -> a calm "still confirming" screen — we NEVER
 *     claim no money moved unless the ledger says the charge failed.
 * The demo screens render only on the explicit legacy params (?status/&ref);
 * a bare URL (in-app browsers sometimes strip queries) gets a neutral screen.
 */
const POLL_DELAYS_MS = [1500, 1500, 3000, 3000, 5000];

function CallbackContent() {
  const params = useSearchParams();
  const reference = params.get("reference");

  // Legacy prototype path (explicit params only — never a fallback).
  const legacyStatus = params.get("status");
  const legacyRef = params.get("ref");

  const [result, setResult] = useState<PaymentResult | null>(null);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!reference) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let attempt = 0;

    async function poll() {
      let res: PaymentResult | null = null;
      try {
        res = await getPaymentResult(reference!);
      } catch {
        // Transient network/server error — treat like an unresolved lookup.
      }
      if (cancelled) return;
      if (res?.ok && res.status !== "pending") {
        setResult(res);
        setSettled(true);
        return;
      }
      if (res?.ok) setResult(res);
      if (attempt < POLL_DELAYS_MS.length) {
        timer = setTimeout(poll, POLL_DELAYS_MS[attempt]);
        attempt += 1;
      } else {
        setSettled(true);
      }
    }
    poll();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [reference]);

  if (!reference) {
    if (legacyStatus === "failed" && legacyRef) return <FailedScreen reference={legacyRef} amountLabel={SAMPLE.priceLabel} business={SAMPLE.business} />;
    if (legacyRef) return <SuccessScreen reference={legacyRef} />;
    return <PendingScreen reference={null} />;
  }

  if (!settled) return <ConfirmingScreen />;

  if (result?.status === "success") {
    return (
      <SuccessScreen
        reference={reference}
        amountLabel={result.amountKobo != null ? nairaFromKobo(result.amountKobo) : "—"}
        business={result.business ?? "the seller"}
        title={result.title ?? "Your order"}
        dateLabel={
          result.paidAt
            ? new Date(result.paidAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })
            : new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })
        }
      />
    );
  }

  if (result?.status === "failed" || result?.status === "abandoned") {
    return (
      <FailedScreen
        reference={reference}
        amountLabel={result.amountKobo != null ? nairaFromKobo(result.amountKobo) : undefined}
        business={result.business}
      />
    );
  }

  // Still pending, or we couldn't complete a lookup: stay honest and calm.
  return <PendingScreen reference={reference} />;
}

/** Payment exists but isn't confirmed yet (or the lookup couldn't complete). */
function PendingScreen({ reference }: { reference: string | null }) {
  return (
    <div className="w-full max-w-[440px] self-center overflow-hidden rounded-[24px] border border-[#ECEBF3] bg-white shadow-[0_20px_60px_-30px_rgba(95,88,244,0.35)]">
      <div className="bg-gradient-to-b from-[#FEF0DC] to-white px-7 pb-6 pt-9 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#F79009]/25 bg-[#FEF0DC] text-3xl">
          ⏳
        </div>
        <h1 className="text-xl font-extrabold tracking-[-0.01em] text-[#9A5A00]">
          {reference ? "Payment being confirmed" : "We can't find this payment"}
        </h1>
        <p className="mx-auto mt-1.5 max-w-[300px] text-sm leading-relaxed text-[#6C6B7B]">
          {reference
            ? "Your bank confirmation is taking a little longer than usual. If you completed payment, it will be confirmed automatically — you don't need to pay again."
            : "This link is missing its payment reference. If you just paid, check your email for the receipt, or contact the seller."}
        </p>
      </div>

      {reference && (
        <div className="px-[18px] pt-4">
          <div className="overflow-hidden rounded-[14px] border border-[#ECEBF3]">
            <DetailRow label="Reference" value={reference} mono />
            <DetailRow label="Status" value="Awaiting confirmation" last />
          </div>
          <p className="mt-3 text-center text-[13px] leading-relaxed text-[#6C6B7B]">
            Save this reference. The seller is notified the moment your payment
            confirms.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2.5 px-[18px] pt-4">
        {reference && (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="flex h-12 w-full items-center justify-center rounded-[13px] bg-[#5F58F4] text-[15px] font-bold text-white transition hover:bg-[#4A43D6]"
          >
            Check again
          </button>
        )}
        <Link href="/" className="flex h-11 w-full items-center justify-center rounded-[13px] border border-[#E3E2EE] bg-[#FAFAFE] text-sm font-semibold text-[#33323F] transition hover:border-[#C7C4F7] hover:text-[#5F58F4]">
          Back to seller
        </Link>
      </div>

      <div className="px-[18px] pb-6 pt-5 text-center">
        <p className="text-[13px] font-extrabold tracking-[-0.02em] text-[#5F58F4]">Paypoint.</p>
        <p className="mt-1 text-[11px] leading-relaxed text-[#9A99A8]">
          Payments settle directly to the seller&rsquo;s verified bank account.
        </p>
      </div>
    </div>
  );
}

/** Shown while we wait for the webhook to confirm the charge. */
function ConfirmingScreen() {
  return (
    <div className="flex w-full max-w-[440px] flex-col items-center justify-center self-stretch rounded-[24px] border border-[#ECEBF3] bg-white px-8 py-20 text-center shadow-[0_20px_60px_-30px_rgba(95,88,244,0.35)]">
      <div className="h-[72px] w-[72px] animate-spin rounded-full border-[5px] border-[#EEEDFE] border-t-[#5F58F4]" />
      <h1 className="mt-6 text-[21px] font-extrabold tracking-[-0.02em] text-[#14132B]">
        Confirming your payment…
      </h1>
      <p className="mx-auto mt-2.5 max-w-[280px] text-sm leading-relaxed text-[#6C6B7B]">
        We&rsquo;re confirming your payment with the bank. This usually takes a
        few seconds. Please don&rsquo;t close this window.
      </p>
    </div>
  );
}

/** Definitive failure only — the ledger says this charge failed or expired. */
function FailedScreen({
  reference,
  amountLabel,
  business,
}: {
  reference: string;
  amountLabel?: string;
  business?: string;
}) {
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
        <h1 className="text-xl font-extrabold tracking-[-0.01em] text-[#B42318]">
          Payment not completed
        </h1>
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
          {amountLabel && <DetailRow label="Amount" value={amountLabel} />}
          {business && <DetailRow label="Merchant" value={business} />}
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
