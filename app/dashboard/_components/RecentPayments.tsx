import Link from "next/link";
import PaymentsList from "./PaymentsList";
import type { Payment } from "./paymentsData";

/**
 * Recent payments (dashboard home). Shows the latest few rows and links out to
 * the full Payments page. The table/card-list markup itself lives in the shared
 * PaymentsList component (DRY). Empty until the first real payment lands.
 */
export default function RecentPayments({ rows }: { rows: Payment[] }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#14132B]">
          Recent payments
        </h2>
        {rows.length > 0 && (
          <Link
            href="/dashboard/payments"
            className="text-sm font-semibold text-[#5F58F4] transition-colors hover:text-[#4A43D6]"
          >
            View all
          </Link>
        )}
      </div>

      {rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#ECEBF3] bg-white px-6 py-12 text-center">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#EEEDFE] text-[#5F58F4]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="2" y="5" width="20" height="14" rx="2.5" />
              <path d="M2 10h20" />
            </svg>
          </span>
          <p className="text-sm font-semibold text-[#14132B]">No payments yet</p>
          <p className="mt-1 max-w-xs text-sm text-[#6C6B7B]">
            When a customer pays through one of your pages, it shows up here.
          </p>
        </div>
      ) : (
        <PaymentsList rows={rows} />
      )}
    </section>
  );
}
