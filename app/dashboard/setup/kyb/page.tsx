import { getSetupStatus } from "@/lib/setup";
import { createClient } from "@/lib/supabase/server";
import SetupCard from "../_components/SetupCard";
import StepDoneCard from "../_components/StepDoneCard";
import KybSetup from "../_components/KybSetup";

/** Resume point: a seller whose business already passed CAC goes straight to
 *  the owner (BVN) stage instead of re-entering their RC number. */
async function getKybStage(): Promise<"business" | "owner"> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return "business";
    const { data: profile } = await supabase
      .from("profiles")
      .select("kyb_status")
      .eq("id", user.id)
      .single();
    return profile?.kyb_status === "business_verified" ? "owner" : "business";
  } catch {
    return "business";
  }
}

export default async function KybSetupPage() {
  const status = await getSetupStatus();
  const stage = status.kyb ? "business" : await getKybStage();
  return (
    <SetupCard>
      {status.kyb ? (
        <StepDoneCard
          heading="Business verified"
          subtitle="Your business and its owner passed our verification checks."
        />
      ) : (
        <KybSetup initialStage={stage} />
      )}
    </SetupCard>
  );
}
