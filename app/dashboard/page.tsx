import Link from "next/link";
import { getSetupStatus } from "@/lib/setup";
import MetricCard from "./_components/MetricCard";
import RecentPayments from "./_components/RecentPayments";
import SetupChecklist from "./_components/SetupChecklist";

/** Dashboard home — setup checklist (until complete), greeting, metrics, recent payments. */
export default async function DashboardHome() {
  const status = await getSetupStatus();

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#14132B]">
            Good morning, Adaeze 👋
          </h1>
          <p className="mt-1 text-sm text-[#6C6B7B]">
            Here&rsquo;s a quick look at your business today.
          </p>
        </div>
        <Link
          href="/dashboard/create"
          className="hidden h-11 items-center justify-center gap-2 rounded-xl bg-[#5F58F4] px-4 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(95,88,244,0.25)] transition hover:bg-[#4A43D6] sm:flex"
        >
          {status.complete ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 5v14M5 12h14" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          )}
          Create Paypoint
        </Link>
      </header>

      {/* Setup checklist — shown until all four steps are done */}
      {!status.complete && <SetupChecklist status={status} />}

      {/* Metrics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard
          variant="hero"
          label="Total collected"
          value="₦1,240,000"
          hint="All time"
        />
        <MetricCard label="This month" value="₦320,000" hint="June 2026" />
        <MetricCard label="Active pages" value="8" hint="Live right now" />
      </section>

      {/* Recent payments */}
      <RecentPayments />
    </div>
  );
}
