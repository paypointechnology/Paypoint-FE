import SettingsForm from "../_components/SettingsForm";

/**
 * Settings — single column of setting cards (Business, Bank account, Account).
 * All interactivity lives in SettingsForm (client). Frontend only.
 */
export default function SettingsPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#14132B]">
          Settings
        </h1>
        <p className="mt-1 text-sm text-[#6C6B7B]">
          Manage your business profile and payout details.
        </p>
      </header>

      <SettingsForm />
    </div>
  );
}
