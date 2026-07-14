"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepVerify from "../../../onboarding/_components/StepVerify";
import { saveKyb } from "../actions";

/**
 * Business verification (KYB) — reuses the onboarding StepVerify component.
 * Its RC/BN input and simulated ~1.2s check drive onVerified, where we persist
 * kyb_status = 'verified'. Real KYB runs via Dojah (Phase 3).
 */
export default function KybSetup() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleVerified() {
    const res = await saveKyb();
    if (!res.ok) {
      setError(res.error ?? "Something went wrong.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div>
      <StepVerify onVerified={handleVerified} onBack={() => router.push("/dashboard")} />
      {error && (
        <p className="mt-4 text-center text-sm text-[#B42318]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
