import PageHeading from "../_components/PageHeading";
import EmptyState from "../_components/EmptyState";

export default function PaymentsPage() {
  return (
    <div>
      <PageHeading
        title="Payments"
        subtitle="A full history of money collected through your pages."
      />
      <EmptyState
        title="Payment history is coming soon"
        description="Soon you'll see every transaction here — filter by status, search customers, and export records."
        icon={
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="M3 10h18" />
            <path d="M7 15h3" />
          </svg>
        }
      />
    </div>
  );
}
