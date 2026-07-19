import Link from "next/link";
import { getUserPages } from "@/lib/data";
import CheckoutsList from "./CheckoutsList";

/**
 * Checkouts — every payment page the seller has created, with a performance
 * strip, search, filter, sort, and per-card share / archive / delete. Falls
 * back to a friendly empty state for new sellers.
 */
export default async function CheckoutsPage() {
  const pages = await getUserPages();

  return (
    <div className="flex flex-col gap-5">
      {/* Page heading */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#14132B]">Your checkouts</h1>
          <p className="mt-1 text-sm text-[#6C6B7B]">Manage, share and track every checkout.</p>
        </div>
        <Link
          href="/dashboard/create"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#5F58F4] px-4 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(95,88,244,0.25)] transition hover:bg-[#4A43D6]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
          Create
        </Link>
      </div>

      {pages.length === 0 ? (
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-dashed border-[#ECEBF3] bg-white px-6 py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EEEDFE] text-3xl">🏷️</span>
          <div>
            <h2 className="text-lg font-extrabold tracking-[-0.01em] text-[#14132B]">
              Your first checkout starts your first sale.
            </h2>
            <p className="mx-auto mt-1.5 max-w-sm text-sm text-[#6C6B7B]">
              Create a checkout for any product or service and start accepting
              payments in minutes. No website needed.
            </p>
          </div>
          <Link
            href="/dashboard/create"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#5F58F4] px-5 text-sm font-semibold text-white transition hover:bg-[#4A43D6]"
          >
            Create your first checkout
          </Link>
        </div>
      ) : (
        <CheckoutsList pages={pages} />
      )}
    </div>
  );
}
