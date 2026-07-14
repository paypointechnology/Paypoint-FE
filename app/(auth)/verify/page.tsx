"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AuthShell from "../_components/AuthShell";
import { createClient } from "@/lib/supabase/client";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Post-signup "check your inbox" screen.
 * Email confirmation is ON, so a new account has no session until the user
 * clicks the link we emailed (which lands on /auth/callback → /dashboard).
 * From here they can only resend the email or head back to log in.
 */
function VerifyInner() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const supabase = createClient();

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleResend() {
    if (!email || status === "sending") return;
    setStatus("sending");
    setError(null);

    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${getSiteUrl()}/auth/callback` },
    });

    if (resendError) {
      setError(resendError.message);
      setStatus("idle");
      return;
    }
    setStatus("sent");
  }

  return (
    <AuthShell
      heading="Check your inbox"
      subheading={
        email
          ? `We sent a confirmation link to ${email}. Click it to activate your account.`
          : "We sent a confirmation link to your email. Click it to activate your account."
      }
      altPrompt="Wrong email?"
      altLinkText="Back to sign up"
      altHref="/signup"
    >
      {/* Mail mark */}
      <div className="mb-6 flex justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEEDFE] text-[#5F58F4]">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </span>
      </div>

      <div className="rounded-xl border border-[#ECEBF3] bg-[#FAFAFE] p-4 text-center text-sm leading-relaxed text-[#33323F]">
        Didn&rsquo;t get it? Check your spam folder, or resend the email below.
      </div>

      {error && (
        <p className="mt-4 text-center text-sm text-[#B42318]" role="alert">
          {error}
        </p>
      )}

      {status === "sent" ? (
        <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-[#D4F3E2] bg-[#E7F8EF] px-4 py-3 text-sm font-medium text-[#0B7A4B]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Confirmation email resent
        </div>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          disabled={!email || status === "sending"}
          className="mt-5 h-11 w-full rounded-xl bg-[#5F58F4] text-sm font-semibold text-white transition hover:bg-[#4A43D6] disabled:cursor-not-allowed disabled:bg-[#C7C4F7] disabled:hover:bg-[#C7C4F7]"
        >
          {status === "sending" ? "Resending…" : "Resend email"}
        </button>
      )}

      <p className="mt-4 text-center text-sm text-[#6C6B7B]">
        Already confirmed?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#5F58F4] transition-colors hover:text-[#4A43D6]"
        >
          Back to log in
        </Link>
      </p>
    </AuthShell>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={null}>
      <VerifyInner />
    </Suspense>
  );
}
