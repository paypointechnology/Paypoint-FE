import Link from "next/link";
import PaymentsList from "./PaymentsList";
import { recentPayments } from "./paymentsData";

/**
 * Recent payments (dashboard home). Shows the latest few rows and links out to
 * the full Payments page. The table/card-list markup itself lives in the shared
 * PaymentsList component (DRY).
 */
export default function RecentPayments() {
  const rows = recentPayments.slice(0, 5);

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#14132B]">
          Recent payments
        </h2>
        <Link
          href="/dashboard/payments"
          className="text-sm font-semibold text-[#5F58F4] transition-colors hover:text-[#4A43D6]"
        >
          View all
        </Link>
      </div>

      <PaymentsList rows={rows} />
    </section>
  );
}
