import { getSetupStatus } from "@/lib/setup";
import SetupCard from "../_components/SetupCard";
import StepDoneCard from "../_components/StepDoneCard";
import BankSetup from "../_components/BankSetup";

export default async function BankSetupPage() {
  const status = await getSetupStatus();
  return (
    <SetupCard>
      {status.bank ? (
        <StepDoneCard
          heading="Bank account connected"
          subtitle="Payments settle straight to your bank."
        />
      ) : (
        <BankSetup />
      )}
    </SetupCard>
  );
}
