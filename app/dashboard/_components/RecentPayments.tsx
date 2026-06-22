import StatusPill from "./StatusPill";
import { recentPayments } from "./paymentsData";

/**
 * Recent payments.
 * Desktop (md:+): a clean table. Mobile (< md): a stacked card list of the same
 * rows so nothing is cramped. Both read the same sample data (DRY).
 */
export default function RecentPayments() {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#14132B]">
          Recent payments
        </h2>
        <span className="text-sm font-medium text-[#9A99A8]">
          {recentPayments.length} this week
        </span>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-[#ECEBF3] bg-white shadow-[0_1px_3px_rgba(20,19,43,0.04)] md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#ECEBF3] text-xs font-semibold uppercase tracking-wide text-[#9A99A8]">
              <th className="px-5 py-3 font-semibold">Customer</th>
              <th className="px-5 py-3 font-semibold">Item</th>
              <th className="px-5 py-3 font-semibold">Amount</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 text-right font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentPayments.map((p, i) => (
              <tr
                key={`${p.customer}-${i}`}
                className="border-b border-[#ECEBF3] last:border-0 transition-colors hover:bg-[#FAFAFE]"
              >
                <td className="px-5 py-3.5 font-medium text-[#14132B]">
                  {p.customer}
                </td>
                <td className="px-5 py-3.5 text-[#6C6B7B]">{p.item}</td>
                <td className="px-5 py-3.5 font-semibold text-[#14132B]">
                  {p.amount}
                </td>
                <td className="px-5 py-3.5">
                  <StatusPill status={p.status} />
                </td>
                <td className="px-5 py-3.5 text-right text-[#9A99A8]">
                  {p.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <ul className="flex flex-col gap-3 md:hidden">
        {recentPayments.map((p, i) => (
          <li
            key={`${p.customer}-${i}`}
            className="rounded-2xl border border-[#ECEBF3] bg-white p-4 shadow-[0_1px_3px_rgba(20,19,43,0.04)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-semibold text-[#14132B]">
                  {p.customer}
                </p>
                <p className="mt-0.5 truncate text-sm text-[#6C6B7B]">
                  {p.item}
                </p>
              </div>
              <p className="shrink-0 font-semibold text-[#14132B]">{p.amount}</p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <StatusPill status={p.status} />
              <span className="text-xs text-[#9A99A8]">{p.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
