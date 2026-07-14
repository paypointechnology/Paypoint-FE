import { redirect } from "next/navigation";
import SettingsForm from "../_components/SettingsForm";
import { getProfile } from "@/lib/data";

/**
 * Settings — single column of setting cards (Business, Bank account, Account),
 * prefilled with the seller's real profile. Interactivity lives in SettingsForm.
 */
export default async function SettingsPage() {
  const profile = await getProfile();
  if (!profile) redirect("/login");

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#14132B]">
          Settings
        </h1>
        <p className="mt-1 text-sm text-[#6C6B7B]">
          Manage your business profile and payout details.
        </p>
      </div>

      <SettingsForm profile={profile} />
    </div>
  );
}
