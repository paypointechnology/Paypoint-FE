import { redirect } from "next/navigation";
import SettingsForm from "../_components/SettingsForm";
import DangerZone from "../_components/DangerZone";
import { getProfile } from "@/lib/data";

/**
 * Business settings — a profile summary, the editable business / bank / account
 * cards (real save), and the danger zone. Prefilled with the seller's real
 * profile.
 */
export default async function SettingsPage() {
  const profile = await getProfile();
  if (!profile) redirect("/login");

  const initials =
    (profile.businessName || profile.firstName || "P").trim().slice(0, 2).toUpperCase();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#14132B]">Business</h1>
        <p className="mt-1 text-sm text-[#6C6B7B]">
          Manage your business profile, bank account and security.
        </p>
      </div>

      {/* Profile summary */}
      <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-[#6F68FF] to-[#4A43D6] p-5 text-white">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/20 text-base font-extrabold">
          {profile.logoUrl && profile.logoUrl !== "/assets/paypoint-icon.png" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.logoUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            initials
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-extrabold">{profile.businessName || "Your business"}</p>
          <p className="truncate text-xs text-white/70">{profile.email}</p>
        </div>
        <span className="shrink-0 rounded-full bg-[#12B76A]/25 px-2.5 py-1 text-[10px] font-bold text-[#D4F3E2]">🟢 Active</span>
      </div>

      <SettingsForm profile={profile} />

      <DangerZone businessName={profile.businessName} />
    </div>
  );
}
