"use client";

import Link from "next/link";
import { useState } from "react";

/** Public "coming soon" / waitlist page. Frontend only — the email capture is a
 *  local success state until the backend (and real auth) goes live. */
export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-white px-5 py-12 text-center">
      {/* Brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[440px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(95,88,244,0.12),transparent_70%)]"
      />
      {/* Faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#14132b08_1px,transparent_1px),linear-gradient(to_bottom,#14132b08_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_60%,transparent_100%)]"
      />

      <div className="relative w-full max-w-[560px]">
        <img
          src="/assets/paypoint-wordmark-indigo.png"
          alt="Paypoint"
          className="mx-auto h-8 w-auto"
        />

        <span className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#EEEDFE] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#5F58F4]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5F58F4] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5F58F4]" />
          </span>
          Launching soon
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-[-0.02em] text-[#14132B] sm:text-5xl">
          Get paid with <span className="text-[#5F58F4]">one link.</span>
        </h1>

        <p className="mx-auto mt-4 max-w-[460px] text-base leading-relaxed text-[#33323F]">
          Paypoint is almost here. Turn any product or service into a payment
          page and get paid straight to your bank. Join the waitlist and we&rsquo;ll
          tell you the moment we go live.
        </p>

        {!joined ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setJoined(true);
            }}
            className="mx-auto mt-8 flex w-full max-w-[460px] flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@business.com"
              aria-label="Email address"
              className="h-12 flex-1 rounded-xl border border-[#E3E2EE] bg-white px-4 text-sm text-[#14132B] outline-none transition placeholder:text-[#9A99A8] focus:border-[#5F58F4] focus:ring-2 focus:ring-[#EEEDFE]"
            />
            <button
              type="submit"
              className="h-12 shrink-0 rounded-xl bg-[#5F58F4] px-6 text-sm font-semibold text-white transition hover:bg-[#4A43D6]"
            >
              Join the waitlist
            </button>
          </form>
        ) : (
          <div className="mx-auto mt-8 flex max-w-[460px] items-center justify-center gap-2.5 rounded-xl border border-[#D4F3E2] bg-[#E7F8EF] px-5 py-4 text-sm font-medium text-[#0B7A4B]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20 6 9 17l-5-5" />
            </svg>
            You&rsquo;re on the list — we&rsquo;ll email you at launch.
          </div>
        )}

        <p className="mt-5 text-xs text-[#9A99A8]">
          No spam. Just one email when Paypoint is live.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-[#6C6B7B] transition-colors hover:text-[#14132B]"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to home
        </Link>
      </div>
    </main>
  );
}
