import Link from "next/link";
import MetricCard from "./_components/MetricCard";
import RecentPayments from "./_components/RecentPayments";

/** Dashboard home — greeting, three metric cards, recent payments. */
export default function DashboardHome() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#14132B]">
            Good morning, Adaeze
          </h1>
          <p className="mt-1 text-sm text-[#6C6B7B]">
            Here&rsquo;s how today is going.
          </p>
        </div>
        <Link
          href="/dashboard/create"
          className="hidden h-11 items-center justify-center gap-2 rounded-xl bg-[#5F58F4] px-4 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(95,88,244,0.25)] transition hover:bg-[#4A43D6] sm:flex"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
          Create Paypoint
        </Link>
      </header>

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
