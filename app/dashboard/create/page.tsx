import PageHeading from "../_components/PageHeading";
import EmptyState from "../_components/EmptyState";

export default function CreatePage() {
  return (
    <div>
      <PageHeading
        title="Create a Paypoint"
        subtitle="Turn any product or service into a payment page."
      />
      <EmptyState
        title="The page builder is coming soon"
        description="Soon you'll name your item, set a price, and get a shareable link in seconds — no code, no website."
        icon={
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
        }
      />
    </div>
  );
}
