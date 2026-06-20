"use client";

import { useEffect, useState } from "react";
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

const BANKS = [
  "Access Bank",
  "Citibank",
  "Ecobank",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "First City Monument Bank (FCMB)",
  "Globus Bank",
  "Guaranty Trust Bank (GTBank)",
  "Heritage Bank",
  "Keystone Bank",
  "Kuda Microfinance Bank",
  "Moniepoint MFB",
  "OPay",
  "PalmPay",
  "Polaris Bank",
  "Providus Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered",
  "Sterling Bank",
  "SunTrust Bank",
  "Union Bank",
  "United Bank for Africa (UBA)",
  "Unity Bank",
  "Wema Bank (ALAT)",
  "Zenith Bank",
];

type Status = "idle" | "checking" | "verified";

/** Step 2 — connect a bank account: trust intro, then the bank-details form. */
export default function StepBank({
  onConnect,
  onSkip,
  onBack,
}: {
  onConnect: () => void;
  onSkip: () => void;
  onBack: () => void;
}) {
  const [mode, setMode] = useState<"intro" | "form">("intro");

  if (mode === "intro") {
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
          onClick={() => setMode("form")}
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

        <BackLink label="Back" onClick={onBack} />
      </div>
    );
  }

  return <BankForm onVerified={onConnect} onBack={() => setMode("intro")} />;
}

/** The bank-details form: select bank, enter account number, account name auto-verifies. */
function BankForm({
  onVerified,
  onBack,
}: {
  onVerified: () => void;
  onBack: () => void;
}) {
  const [bank, setBank] = useState("");
  const [acct, setAcct] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");

  // Auto-resolve the account name once a bank + 10-digit number are entered.
  // NOTE: simulated until the backend wires real account verification.
  useEffect(() => {
    if (!bank || acct.length !== 10) {
      setStatus("idle");
      setName("");
      return;
    }
    setStatus("checking");
    setName("");
    const t = setTimeout(() => {
      setStatus("verified");
      setName("ADAEZE N. OKEKE");
    }, 900);
    return () => clearTimeout(t);
  }, [bank, acct]);

  return (
    <div>
      <StepHeader
        heading="Add your bank account"
        subtitle="Money settles here. We verify the name before connecting."
      />

      {/* Bank select */}
      <div className="mb-4">
        <label htmlFor="bank" className="mb-1.5 block text-xs font-semibold text-[#6C6B7B]">
          Bank
        </label>
        <div className="relative">
          <select
            id="bank"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className={`h-11 w-full appearance-none rounded-[10px] border border-[#E3E2EE] bg-white px-3.5 pr-10 text-sm outline-none transition focus:border-[#5F58F4] focus:ring-2 focus:ring-[#EEEDFE] ${
              bank ? "text-[#14132B]" : "text-[#9A99A8]"
            }`}
          >
            <option value="" disabled>
              Select your bank
            </option>
            {BANKS.map((b) => (
              <option key={b} value={b} className="text-[#14132B]">
                {b}
              </option>
            ))}
          </select>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9A99A8]"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Account number */}
      <div className="mb-4">
        <label htmlFor="acct" className="mb-1.5 block text-xs font-semibold text-[#6C6B7B]">
          Account number
        </label>
        <input
          id="acct"
          name="acct"
          inputMode="numeric"
          autoComplete="off"
          maxLength={10}
          value={acct}
          onChange={(e) => setAcct(e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="0123456789"
          className="h-11 w-full rounded-[10px] border border-[#E3E2EE] bg-white px-3.5 text-sm tracking-wide text-[#14132B] outline-none transition placeholder:text-[#9A99A8] focus:border-[#5F58F4] focus:ring-2 focus:ring-[#EEEDFE]"
        />
      </div>

      {/* Resolved account name */}
      {status === "checking" && (
        <div className="mb-4 flex items-center gap-2 text-sm text-[#6C6B7B]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-spin" aria-hidden>
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          Checking account&hellip;
        </div>
      )}
      {status === "verified" && (
        <div className="mb-4 flex items-center gap-2.5 rounded-[10px] border border-[#D4F3E2] bg-[#E7F8EF] px-3.5 py-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#12B76A] text-white">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wide text-[#0B7A4B]">
              Account verified
            </p>
            <p className="truncate text-sm font-semibold text-[#14132B]">{name}</p>
          </div>
        </div>
      )}

      <button
        type="button"
        disabled={status !== "verified"}
        onClick={onVerified}
        className="mt-2 h-11 w-full rounded-xl bg-[#5F58F4] text-sm font-semibold text-white transition hover:bg-[#4A43D6] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#5F58F4]"
      >
        Confirm &amp; connect
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#9A99A8]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Your details are encrypted and never shared.
      </p>

      <BackLink label="Back" onClick={onBack} />
    </div>
  );
}

function BackLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="mt-4 text-center">
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-1 text-xs font-medium text-[#9A99A8] transition-colors hover:text-[#6C6B7B]"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m15 18-6-6 6-6" />
        </svg>
        {label}
      </button>
    </div>
  );
}
