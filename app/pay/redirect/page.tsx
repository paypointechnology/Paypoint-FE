"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Secure payment interstitial — /pay/redirect.
 * Frontend prototype: after ~1.8s, replaces to the success callback. Explains
 * the wait and reassures the buyer (never a blank spinner).
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
    <main className="flex min-h-[100dvh] w-full justify-center bg-[#F5F4FF] px-4 py-6 sm:py-10">
      <div className="flex w-full max-w-[440px] flex-col self-stretch overflow-hidden rounded-[24px] border border-[#ECEBF3] bg-white shadow-[0_20px_60px_-30px_rgba(95,88,244,0.35)]">
        {/* Brand header */}
        <div className="flex items-center justify-center border-b border-[#ECEBF3] py-3.5">
          <span className="text-[17px] font-extrabold tracking-[-0.02em] text-[#5F58F4]">Paypoint.</span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
          {/* Ring */}
          <div className="h-[72px] w-[72px] animate-spin rounded-full border-[5px] border-[#EEEDFE] border-t-[#5F58F4]" />

          <h1 className="mt-6 text-[21px] font-extrabold tracking-[-0.02em] text-[#14132B]">
            Preparing your secure payment…
          </h1>
          <p className="mx-auto mt-2.5 max-w-[280px] text-sm leading-relaxed text-[#6C6B7B]">
            We&rsquo;re securely connecting you to complete your payment. This
            usually takes just a few seconds.
          </p>

          {/* Trust bar */}
          <div className="mt-6 flex w-full flex-col gap-2.5 rounded-[14px] border border-[#ECEBF3] bg-[#FAFAFE] p-4 text-left">
            <TrustLine icon="🔒">Secure connection established</TrustLine>
            <TrustLine icon="🏦">You&rsquo;re paying the seller directly</TrustLine>
            <TrustLine icon="⚡">Fast and encrypted</TrustLine>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-[#9A99A8]">
            Please don&rsquo;t close this window.
            <br />
            You&rsquo;ll be redirected automatically.
          </p>
        </div>
      </div>
    </main>
  );
}

function TrustLine({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 text-[13px] font-medium text-[#6C6B7B]">
      <span className="text-[15px]">{icon}</span>
      {children}
    </div>
  );
}
