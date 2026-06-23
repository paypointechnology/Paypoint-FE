"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Receipt from "../_components/Receipt";
import SecureFooter from "../_components/SecureFooter";
import { SAMPLE } from "../../p/_components/sampleCheckout";

/**
 * Payment result — /pay/callback?status=success|failed&ref=...
 * Reads the query (so it must be wrapped in <Suspense>, per Next).
 *  - success → the shared Receipt
 *  - failed  → a calm "didn't go through" state with Try again
 */
function CallbackContent() {
  const params = useSearchParams();
  const status = params.get("status") ?? "success";
  const ref = params.get("ref") ?? SAMPLE.reference;

  if (status === "failed") {
    return (
      <div className="relative w-full max-w-[420px] animate-onboard-fade">
        <div className="mb-7 flex justify-center">
          <img
            src="/assets/paypoint-wordmark-indigo.png"
            alt="Paypoint"
            className="h-7 w-auto"
          />
        </div>

        <div className="rounded-[20px] border border-[#ECEBF3] bg-white p-6 text-center shadow-[0_4px_24px_rgba(20,19,43,0.06)] sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FEECEB]">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#B42318"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" x2="9" y1="9" y2="15" />
              <line x1="9" x2="15" y1="9" y2="15" />
            </svg>
          </div>

          <h1 className="mt-4 text-[20px] font-semibold tracking-[-0.01em] text-[#14132B]">
            Payment didn&rsquo;t go through
          </h1>
          <p className="mx-auto mt-1.5 max-w-[300px] text-sm leading-relaxed text-[#6C6B7B]">
            No money left your account. This can happen with a weak connection
            or a declined card — you can safely try again.
          </p>

          <Link
            href="/p/aso-oke-dress"
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#5F58F4] text-sm font-semibold text-white transition hover:bg-[#4A43D6]"
          >
            Try again
          </Link>
        </div>

        <SecureFooter />
      </div>
    );
  }

  return <Receipt reference={ref} />;
}

export default function CallbackPage() {
  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-[#FAFAFE] px-5 py-8 sm:py-12">
      <Suspense
        fallback={
          <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#EEEDFE] border-t-[#5F58F4]" />
        }
      >
        <CallbackContent />
      </Suspense>
    </main>
  );
}
