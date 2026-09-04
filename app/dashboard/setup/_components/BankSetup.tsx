"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepBank, { type BankDetails } from "../../../onboarding/_components/StepBank";
import { connectBank, getBanks, resolveBank } from "../actions";

/**
 * Bank connection — reuses the onboarding StepBank component, wired to real
 * Kora bank verification. connectBank re-resolves the account server-side
 * before persisting the settlement details used by the payout leg.
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
    const res = await connectBank({
      bankCode: details.bankCode,
      bankName: details.bankName,
      accountNumber: details.accountNumber,
    });
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
        loadBanks={getBanks}
        resolveAccount={(bankCode, accountNumber) =>
          resolveBank({ bankCode, accountNumber }).then((r) => ({
            ok: r.ok,
            accountName: r.accountName,
            error: r.error,
            dev: r.dev,
          }))
        }
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
