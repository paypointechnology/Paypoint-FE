import PageHeading from "../_components/PageHeading";
import EmptyState from "../_components/EmptyState";

export default function PagesPage() {
  return (
    <div>
      <PageHeading
        title="Your pages"
        subtitle="Every payment page you create lives here."
      />
      <EmptyState
        title="Pages are coming soon"
        description="Soon you'll manage all your payment pages from here — edit, share, and track each one."
        icon={
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="4" y="3" width="16" height="18" rx="2.5" />
            <path d="M8 8h8M8 12h8M8 16h5" />
          </svg>
        }
      />
    </div>
  );
}
