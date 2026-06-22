import PageHeading from "../_components/PageHeading";
import EmptyState from "../_components/EmptyState";

export default function SettingsPage() {
  return (
    <div>
      <PageHeading
        title="Settings"
        subtitle="Manage your business profile and payout details."
      />
      <EmptyState
        title="Settings are coming soon"
        description="Soon you'll update your business profile, bank details, and notification preferences right here."
        icon={
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l1.7-1.3-1.8-3.1-2 .8a7.4 7.4 0 0 0-2.6-1.5L14.4 2H9.6l-.3 2a7.4 7.4 0 0 0-2.6 1.5l-2-.8L2.9 7.8l1.7 1.3a7.6 7.6 0 0 0 0 3l-1.7 1.3 1.8 3.1 2-.8a7.4 7.4 0 0 0 2.6 1.5l.3 2h4.8l.3-2a7.4 7.4 0 0 0 2.6-1.5l2 .8 1.8-3.1-1.7-1.3Z" />
          </svg>
        }
      />
    </div>
  );
}
