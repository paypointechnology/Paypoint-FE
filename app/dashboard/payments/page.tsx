import { getPaymentsDetailed, getPaymentsSummary } from "@/lib/data";
import PaymentsView from "./PaymentsView";

/**
 * Payments — a summary strip plus the full, searchable, date-grouped payment
 * history with per-payment receipts. Every payment answers who paid, how much,
 * and for what. Real data.
 */
export default async function PaymentsPage() {
  const [rows, summary] = await Promise.all([getPaymentsDetailed(), getPaymentsSummary()]);

  const stats = [
    { v: summary.totalLabel, l: "Total revenue", accent: "brand" as const },
    { v: String(summary.count), l: "Payments" },
    { v: summary.avgLabel, l: "Avg order" },
    { v: summary.successRate, l: "Success rate", accent: "green" as const },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#14132B]">Payments</h1>
        <p className="mt-1 text-sm text-[#6C6B7B]">Every payment in one place.</p>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[#ECEBF3] bg-white sm:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.l} className={`px-4 py-3 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b sm:border-b-0" : ""} border-[#ECEBF3]`}>
            <p className={`truncate text-[15px] font-extrabold tracking-[-0.01em] ${s.accent === "brand" ? "text-[#5F58F4]" : s.accent === "green" ? "text-[#0B7A4B]" : "text-[#14132B]"}`}>{s.v}</p>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-[#9A99A8]">{s.l}</p>
          </div>
        ))}
      </div>

      <PaymentsView payments={rows} />
    </div>
  );
}
