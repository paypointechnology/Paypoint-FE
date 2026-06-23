"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Secure redirect interstitial — /pay/redirect.
 * Frontend prototype: after ~1.8s, replaces to the success callback.
 */
export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("/pay/callback?ref=PP-7F3A9C2E&status=success");
    }, 1800);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-[#FAFAFE] px-5">
      <div className="w-full max-w-[360px] text-center">
        {/* P. mark */}
        <div className="mx-auto mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[0_4px_16px_rgba(20,19,43,0.08)]">
          <img
            src="/assets/paypoint-icon.png"
            alt="Paypoint"
            className="h-7 w-7 object-contain"
          />
        </div>

        {/* Spinner */}
        <div className="mx-auto mb-5 h-8 w-8">
          <svg
            className="h-8 w-8 animate-spin text-[#5F58F4]"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#EEEDFE"
              strokeWidth="3"
            />
            <path
              d="M22 12a10 10 0 0 0-10-10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 className="text-[17px] font-semibold tracking-[-0.01em] text-[#14132B]">
          Taking you to secure checkout…
        </h1>
        <p className="mt-1.5 text-sm text-[#6C6B7B]">
          Your payment is encrypted. This only takes a second.
        </p>
      </div>
    </main>
  );
}
