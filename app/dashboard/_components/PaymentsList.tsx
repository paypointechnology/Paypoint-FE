import Link from "next/link";
import StatusPill from "./StatusPill";
import type { Payment } from "./paymentsData";

/**
 * Shared payments list. ONE source of markup, two callers (DRY):
 *   1. RecentPayments (dashboard home) — a short slice.
 *   2. Payments page — the full history.
 * Desktop (md:+): a clean table. Mobile (< md): a stacked card list of the same
 * rows. Every row links to its receipt (/pay/receipt/{reference}).
 */
export default function PaymentsList({ rows }: { rows: Payment[] }) {
  return (
    <>
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
            {rows.map((p) => (
              <tr
                key={p.reference}
                className="relative border-b border-[#ECEBF3] last:border-0 transition-colors hover:bg-[#FAFAFE]"
              >
                <td className="px-5 py-3.5 font-medium text-[#14132B]">
                  <Link
                    href={`/pay/receipt/${p.reference}`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {p.customer}
                  </Link>
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
        {rows.map((p) => (
          <li key={p.reference}>
            <Link
              href={`/pay/receipt/${p.reference}`}
              className="block rounded-2xl border border-[#ECEBF3] bg-white p-4 shadow-[0_1px_3px_rgba(20,19,43,0.04)] transition-colors hover:bg-[#FAFAFE]"
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
                <p className="shrink-0 font-semibold text-[#14132B]">
                  {p.amount}
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <StatusPill status={p.status} />
                <span className="text-xs text-[#9A99A8]">{p.date}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
