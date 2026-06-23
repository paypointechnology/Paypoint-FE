"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

/**
 * Settings — client-side form. Frontend only: nothing is persisted.
 * Sections: Business (name, phone, logo upload + preview), Bank account /
 * payouts (connected bank, masked account, reassurance, change-bank), and
 * Account (email + sign out). Inputs match the shared Field style.
 */

const inputClass =
  "h-11 w-full rounded-[10px] border border-[#E3E2EE] bg-white px-3.5 text-sm text-[#14132B] outline-none transition placeholder:text-[#9A99A8] focus:border-[#5F58F4] focus:ring-2 focus:ring-[#EEEDFE]";
const cardClass =
  "rounded-2xl border border-[#ECEBF3] bg-white p-5 shadow-[0_1px_3px_rgba(20,19,43,0.04)] sm:p-6";

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5">
      <h2 className="text-base font-semibold tracking-[-0.01em] text-[#14132B]">
        {title}
      </h2>
      {description && (
        <p className="mt-1 text-sm text-[#6C6B7B]">{description}</p>
      )}
    </div>
  );
}

export default function SettingsForm() {
  const router = useRouter();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function onLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoUrl(URL.createObjectURL(file));
  }

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Business */}
      <form onSubmit={onSave} className={cardClass}>
        <SectionHeader
          title="Business"
          description="This appears on your checkout pages and receipts."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="business-name"
              className="mb-1.5 block text-xs font-semibold text-[#6C6B7B]"
            >
              Business name
            </label>
            <input
              id="business-name"
              name="business-name"
              type="text"
              defaultValue="Adaeze Couture"
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor="business-phone"
              className="mb-1.5 block text-xs font-semibold text-[#6C6B7B]"
            >
              Phone
            </label>
            <input
              id="business-phone"
              name="business-phone"
              type="tel"
              inputMode="tel"
              defaultValue="0801 234 5678"
              className={inputClass}
            />
          </div>
        </div>

        {/* Logo upload + preview */}
        <div className="mt-5">
          <p className="mb-1.5 text-xs font-semibold text-[#6C6B7B]">
            Business logo
          </p>
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#ECEBF3] bg-[#F5F4FF]">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt="Logo preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/assets/paypoint-icon.png"
                  alt="Current logo"
                  className="h-8 w-8 object-contain"
                />
              )}
            </span>
            <div>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#E3E2EE] bg-white px-4 text-sm font-semibold text-[#33323F] transition-colors hover:border-[#C7C4F7] hover:bg-[#F5F4FF] hover:text-[#5F58F4]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 16V4M7 9l5-5 5 5" />
                  <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                </svg>
                Upload logo
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={onLogoChange}
                className="hidden"
              />
              <p className="mt-1.5 text-xs text-[#9A99A8]">
                Shown on your checkout pages and receipts.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#5F58F4] px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(95,88,244,0.25)] transition hover:bg-[#4A43D6]"
          >
            Save changes
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0B7A4B]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Saved
            </span>
          )}
        </div>
      </form>

      {/* Bank account / payouts */}
      <section className={cardClass}>
        <SectionHeader title="Bank account" />

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#ECEBF3] bg-[#FAFAFE] p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEEDFE] text-[#5F58F4]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 10 12 4l9 6" />
                <path d="M5 10v8M19 10v8M9 10v8M15 10v8M3 21h18" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-[#14132B]">
                Zenith Bank
              </p>
              <p className="text-sm text-[#6C6B7B]">•••• 6789</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F8EF] px-2.5 py-1 text-xs font-medium text-[#0B7A4B]">
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
            Connected
          </span>
        </div>

        <p className="mt-3 text-sm text-[#6C6B7B]">
          Money settles directly to your bank. We never hold your funds.
        </p>

        <button
          type="button"
          onClick={() => router.push("/onboarding")}
          className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#E3E2EE] bg-white px-4 text-sm font-semibold text-[#33323F] transition-colors hover:border-[#C7C4F7] hover:bg-[#F5F4FF] hover:text-[#5F58F4]"
        >
          Change bank
        </button>
      </section>

      {/* Account */}
      <section className={cardClass}>
        <SectionHeader title="Account" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-[#9A99A8]">Email</p>
            <p className="mt-0.5 text-sm font-medium text-[#14132B]">
              adaeze@adaezecouture.com
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#E3E2EE] bg-white px-4 text-sm font-semibold text-[#B42318] transition-colors hover:border-[#F3C6C2] hover:bg-[#FEECEB]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="m16 17 5-5-5-5M21 12H9" />
          </svg>
          Sign out
        </button>
      </section>
    </div>
  );
}
