import { getSetupStatus } from "@/lib/setup";
import SetupCard from "../_components/SetupCard";
import StepDoneCard from "../_components/StepDoneCard";
import BrandSetup from "../_components/BrandSetup";

export default async function BrandSetupPage() {
  const status = await getSetupStatus();
  return (
    <SetupCard>
      {status.brand ? (
        <StepDoneCard
          heading="Your brand is set"
          subtitle="This is what buyers see on your checkout."
        />
      ) : (
        <BrandSetup />
      )}
    </SetupCard>
  );
}
