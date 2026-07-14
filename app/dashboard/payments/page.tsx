import MetricCard from "../_components/MetricCard";
import PaymentsList from "../_components/PaymentsList";
import { getUserPayments, getDashboardMetrics } from "@/lib/data";

/**
 * Payments — three summary metrics + the full transaction history.
 * The list (table on desktop, cards on mobile) and the metric cards are both
 * reused components (DRY). Each row links to its receipt. Empty state until the
 * first real payment lands.
 */
export default async function PaymentsPage() {
  const [rows, metrics] = await Promise.all([
    getUserPayments(),
    getDashboardMetrics(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#14132B]">
          Payments
        </h1>
        <p className="mt-1 text-sm text-[#6C6B7B]">
          Every payment collected through your pages.
        </p>
      </div>

      {/* Metrics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard
          variant="hero"
          label="Total collected"
          value={metrics.totalLabel}
          hint="All time"
        />
        <MetricCard
          label="This month"
          value={metrics.monthLabel}
          hint={metrics.monthName}
        />
        <MetricCard
          label="Active pages"
          value={String(metrics.activePages)}
          hint="Live right now"
        />
      </section>

      {/* Full history */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#14132B]">
            All payments
          </h2>
          {rows.length > 0 && (
            <span className="text-sm font-medium text-[#9A99A8]">
              {rows.length} {rows.length === 1 ? "transaction" : "transactions"}
            </span>
          )}
        </div>

        {rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#ECEBF3] bg-white px-6 py-16 text-center">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#EEEDFE] text-[#5F58F4]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="2" y="5" width="20" height="14" rx="2.5" />
                <path d="M2 10h20" />
              </svg>
            </span>
            <h3 className="text-lg font-semibold tracking-[-0.01em] text-[#14132B]">
              No payments yet
            </h3>
            <p className="mt-1.5 max-w-sm text-sm text-[#6C6B7B]">
              Share a payment page to start collecting. Every payment your
              customers make will appear here with its receipt.
            </p>
          </div>
        ) : (
          <PaymentsList rows={rows} />
        )}
      </section>
    </div>
  );
}
