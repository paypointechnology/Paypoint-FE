"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepVerify from "../../../onboarding/_components/StepVerify";
import StepOwner from "../../../onboarding/_components/StepOwner";
import { verifyBusiness, verifyOwner } from "../actions";

/**
 * KYC/KYB — two stages in one setup step:
 *   1. "business": CAC registration lookup (StepVerify -> verifyBusiness),
 *      which persists kyb_status 'business_verified'.
 *   2. "owner": the owner's BVN check (StepOwner -> verifyOwner), which
 *      completes the step with kyb_status 'verified'.
 * The page passes initialStage so a seller who verified the business earlier
 * resumes straight at the owner check. Errors render inline in each step.
 */
export default function KybSetup({
  initialStage = "business",
}: {
  initialStage?: "business" | "owner";
}) {
  const router = useRouter();
  const [stage, setStage] = useState<"business" | "owner">(initialStage);

  if (stage === "business") {
    return (
      <StepVerify
        verify={(rcNumber) => verifyBusiness({ rcNumber })}
        onVerified={() => setStage("owner")}
        onBack={() => router.push("/dashboard")}
      />
    );
  }

  return (
    <StepOwner
      verify={(bvn) => verifyOwner({ bvn })}
      onVerified={() => {
        router.push("/dashboard");
        router.refresh();
      }}
      onBack={() => router.push("/dashboard")}
    />
  );
}
