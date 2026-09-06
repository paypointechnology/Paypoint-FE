import { redirect } from "next/navigation";
import { getSetupStatus, WHATSAPP_STEP_ENABLED } from "@/lib/setup";
import SetupCard from "../_components/SetupCard";
import StepDoneCard from "../_components/StepDoneCard";
import WhatsappSetup from "../_components/WhatsappSetup";

export default async function WhatsappSetupPage() {
  // Step paused until the Meta business account is verified (see lib/setup.ts).
  if (!WHATSAPP_STEP_ENABLED) redirect("/dashboard");

  const status = await getSetupStatus();
  return (
    <SetupCard>
      {status.whatsapp ? (
        <StepDoneCard
          heading="WhatsApp verified"
          subtitle="Buyers can reach you on this number."
        />
      ) : (
        <WhatsappSetup />
      )}
    </SetupCard>
  );
}
