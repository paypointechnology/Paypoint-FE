"use client";

import StepHeader from "./StepHeader";

const TRUST_ROWS = [
  {
    title: "Bank-grade security",
    icon: (
      <>
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </>
    ),
  },
  {
    title: "Instant settlement to your bank",
    icon: (
      <>
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
      </>
    ),
  },
  {
    title: "You stay in control of your funds",
    icon: (
      <>
        <path d="M20 6 9 17l-5-5" />
      </>
    ),
  },
];

/** Step 2 — connect a bank account (placeholder) with the trust promise. */
export default function StepBank({
  onConnect,
  onSkip,
  onBack,
}: {
  onConnect: () => void;
  onSkip: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <StepHeader
        heading="Connect your bank to get paid"
        subtitle="Payments settle straight to your bank, instantly."
      />

      {/* Explainer / trust panel */}
      <div className="rounded-xl border border-[#ECEBF3] bg-[#FAFAFE] p-5">
        <div className="mb-4 flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEEDFE] text-[#5F58F4]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m3 10 9-7 9 7" />
              <path d="M4 10v10h16V10" />
              <path d="M9 20v-6h6v6" />
            </svg>
          </span>
          <p className="text-sm leading-relaxed text-[#33323F]">
            <span className="font-semibold text-[#14132B]">
              Paypoint never holds your money.
            </span>{" "}
            Every payment settles directly into your own bank account.
          </p>
        </div>

        <ul className="space-y-3">
          {TRUST_ROWS.map((row) => (
            <li key={row.title} className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E7F8EF] text-[#12B76A]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {row.icon}
                </svg>
              </span>
              <span className="text-sm text-[#33323F]">{row.title}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={onConnect}
        className="mt-6 h-11 w-full rounded-xl bg-[#5F58F4] text-sm font-semibold text-white transition hover:bg-[#4A43D6]"
      >
        Connect bank account
      </button>

      <button
        type="button"
        onClick={onSkip}
        className="mt-3 h-10 w-full rounded-xl text-sm font-medium text-[#6C6B7B] transition-colors hover:text-[#14132B]"
      >
        I&rsquo;ll do this later
      </button>

      <div className="mt-2 text-center">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-xs font-medium text-[#9A99A8] transition-colors hover:text-[#6C6B7B]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </button>
      </div>
    </div>
  );
}
