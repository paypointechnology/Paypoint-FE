"use client";

import { useState } from "react";
import OnboardingShell from "./_components/OnboardingShell";
import StepBusiness from "./_components/StepBusiness";
import StepBank from "./_components/StepBank";
import StepDone from "./_components/StepDone";

/**
 * Paypoint seller onboarding — a 3-step wizard.
 * Single client component holding step state (1–3) with a subtle fade between steps.
 * Frontend only: Continue / Connect / Skip advance, Back goes previous.
 */
export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  return (
    <OnboardingShell current={step}>
      <div key={step} className="animate-onboard-fade">
        {step === 1 && <StepBusiness onContinue={() => setStep(2)} />}
        {step === 2 && (
          <StepBank
            onConnect={() => setStep(3)}
            onSkip={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && <StepDone />}
      </div>
    </OnboardingShell>
  );
}
