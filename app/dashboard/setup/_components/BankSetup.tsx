"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepBank, { type BankDetails } from "../../../onboarding/_components/StepBank";
import { saveBank } from "../actions";

/**
 * Bank connection — reuses the onboarding StepBank component.
 * Bank select + 10-digit account resolves a name (simulated); on confirm we
 * persist the resolved details plus a placeholder subaccount_code so the gate
 * unlocks. Real settlement account is a Paystack Subaccount (Phase 3).
 */
export default function BankSetup() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleConnect(details?: BankDetails) {
    if (!details) {
      // "I'll do this later" — nothing to persist; back to the checklist.
      router.push("/dashboard");
      return;
    }
    const res = await saveBank(details);
    if (!res.ok) {
      setError(res.error ?? "Something went wrong.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div>
      <StepBank
        onConnect={handleConnect}
        onSkip={() => router.push("/dashboard")}
        onBack={() => router.push("/dashboard")}
      />
      {error && (
        <p className="mt-4 text-center text-sm text-[#B42318]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
