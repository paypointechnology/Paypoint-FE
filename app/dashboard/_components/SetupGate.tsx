import Link from "next/link";
import type { SetupStatus } from "@/lib/setup";

/**
 * Shown in place of the payment-page builder until setup is complete.
 * Explains why, shows checklist progress, and links back to the dashboard.
 */
export default function SetupGate({ status }: { status: SetupStatus }) {
  const pct = Math.round((status.doneCount / status.total) * 100);

  return (
    <div className="mx-auto flex w-full max-w-[460px] flex-col items-center py-6 text-center sm:py-12">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEEDFE] text-[#5F58F4]">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </span>

      <h1 className="mt-5 text-xl font-bold tracking-[-0.01em] text-[#14132B]">
        Finish setting up to create your first payment page
      </h1>
      <p className="mt-1.5 text-sm text-[#6C6B7B]">
        A few quick steps unlock payment pages and get your money settling to
        your bank.
      </p>

      {/* Progress */}
      <div className="mt-6 w-full rounded-[16px] border border-[#ECEBF3] bg-white p-5 shadow-[0_1px_3px_rgba(20,19,43,0.04)]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#14132B]">Setup progress</span>
          <span className="rounded-full bg-[#EEEDFE] px-3 py-1 text-xs font-semibold text-[#5F58F4]">
            {status.doneCount} of {status.total} done
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#ECEBF3]">
          <div
            className="h-full rounded-full bg-[#5F58F4] transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <Link
        href="/dashboard"
        className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#5F58F4] px-6 text-sm font-semibold text-white transition hover:bg-[#4A43D6]"
      >
        Finish setup
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
