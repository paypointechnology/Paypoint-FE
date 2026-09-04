"use client";

import { useRouter } from "next/navigation";
import StepVerify from "../../../onboarding/_components/StepVerify";
import { verifyBusiness } from "../actions";

/**
 * Business verification (KYB) — reuses the onboarding StepVerify component,
 * wired to the real CAC lookup (Kora Identity) via the verifyBusiness action.
 * The action persists kyb_status + registration details itself; errors render
 * inline inside StepVerify.
 */
export default function KybSetup() {
  const router = useRouter();

  return (
    <StepVerify
      verify={(rcNumber) => verifyBusiness({ rcNumber })}
      onVerified={() => {
        router.push("/dashboard");
        router.refresh();
      }}
      onBack={() => router.push("/dashboard")}
    />
  );
}
