import { getSetupStatus } from "@/lib/setup";
import SetupCard from "../_components/SetupCard";
import StepDoneCard from "../_components/StepDoneCard";
import KybSetup from "../_components/KybSetup";

export default async function KybSetupPage() {
  const status = await getSetupStatus();
  return (
    <SetupCard>
      {status.kyb ? (
        <StepDoneCard
          heading="Business verified"
          subtitle="Your business passed our verification check."
        />
      ) : (
        <KybSetup />
      )}
    </SetupCard>
  );
}
