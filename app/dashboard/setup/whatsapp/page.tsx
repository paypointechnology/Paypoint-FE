import { getSetupStatus } from "@/lib/setup";
import SetupCard from "../_components/SetupCard";
import StepDoneCard from "../_components/StepDoneCard";
import WhatsappSetup from "../_components/WhatsappSetup";

export default async function WhatsappSetupPage() {
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
