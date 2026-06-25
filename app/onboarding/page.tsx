"use client";

import { useState } from "react";
import OnboardingShell from "./_components/OnboardingShell";
import StepBusiness from "./_components/StepBusiness";
import StepVerify from "./_components/StepVerify";
import StepBank from "./_components/StepBank";
import StepDone from "./_components/StepDone";

/**
 * Paypoint seller onboarding — a 4-step wizard:
 *   Business → Verify (KYB) → Get paid → Done.
 * Single client component holding step state (1–4) with a subtle fade between
 * steps. Frontend only: Continue / Verify / Connect / Skip advance, Back goes
 * previous.
 */
export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  return (
    <OnboardingShell current={step}>
      <div key={step} className="animate-onboard-fade">
        {step === 1 && <StepBusiness onContinue={() => setStep(2)} />}
        {step === 2 && (
          <StepVerify
            onVerified={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <StepBank
            onConnect={() => setStep(4)}
            onSkip={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && <StepDone />}
      </div>
    </OnboardingShell>
  );
}
