import MetricCard from "../_components/MetricCard";
import PaymentsList from "../_components/PaymentsList";
import { recentPayments } from "../_components/paymentsData";

/**
 * Payments — three summary metrics + the full transaction history.
 * The list (table on desktop, cards on mobile) and the metric cards are both
 * reused components (DRY). Each row links to its receipt.
 */
export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#14132B]">
          Payments
        </h1>
        <p className="mt-1 text-sm text-[#6C6B7B]">
          Every payment collected through your pages.
        </p>
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

      {/* Full history */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#14132B]">
            All payments
          </h2>
          <span className="text-sm font-medium text-[#9A99A8]">
            {recentPayments.length} transactions
          </span>
        </div>
        <PaymentsList rows={recentPayments} />
      </section>
    </div>
  );
}
