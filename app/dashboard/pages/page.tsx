import Link from "next/link";
import PageCard from "../_components/PageCard";
import EmptyState from "../_components/EmptyState";
import { sellerPages } from "../_components/pagesData";

/**
 * Pages grid — every payment page the seller has created.
 * Responsive card grid (1 / 2 / 3 cols). Each card carries its own active
 * toggle + Copy/QR/Share actions (PageCard). Falls back to a friendly empty
 * state when the list is empty (kept as a code path).
 */
export default function PagesPage() {
  const pages = sellerPages;
  const activeCount = pages.filter((p) => p.active).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#14132B]">
            Your pages
          </h1>
          <p className="mt-1 text-sm text-[#6C6B7B]">
            {activeCount} active payment {activeCount === 1 ? "page" : "pages"}
          </p>
        </div>
        <Link
          href="/dashboard/create"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#5F58F4] px-4 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(95,88,244,0.25)] transition hover:bg-[#4A43D6]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
          New page
        </Link>
      </header>

      {pages.length === 0 ? (
        // Empty-state code path (won't trigger with sample data, but kept).
        <div className="flex flex-col items-center gap-5">
          <EmptyState
            title="No pages yet"
            description="Create your first Paypoint to start collecting payments — share the link and get paid straight to your bank."
            icon={
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="4" y="3" width="16" height="18" rx="2.5" />
                <path d="M8 8h8M8 12h8M8 16h5" />
              </svg>
            }
          />
          <Link
            href="/dashboard/create"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#5F58F4] px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(95,88,244,0.25)] transition hover:bg-[#4A43D6]"
          >
            Create your first Paypoint
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <PageCard key={page.slug} page={page} />
          ))}
        </div>
      )}
    </div>
  );
}
