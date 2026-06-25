"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "../_components/AuthShell";
import OtpInput from "../_components/OtpInput";

/**
 * Post-signup verification: WhatsApp number, then email.
 * Frontend only — codes are simulated (any 6 digits pass). Real OTP delivery
 * (WhatsApp + email) wires in with the backend.
 */
export default function VerifyPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [code, setCode] = useState("");

  const isWhatsApp = step === 1;

  const onVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) return;
    if (isWhatsApp) {
      setStep(2);
      setCode("");
    } else {
      router.push("/onboarding");
    }
  };

  return (
    <AuthShell
      heading={isWhatsApp ? "Verify your WhatsApp number" : "Verify your email"}
      subheading={
        isWhatsApp
          ? "We sent a 6-digit code to your WhatsApp Business number. Enter it below."
          : "Almost there. Enter the 6-digit code we emailed you."
      }
      altPrompt="Wrong details?"
      altLinkText="Go back"
      altHref="/signup"
    >
      {/* progress dots */}
      <div className="mb-6 flex items-center justify-center gap-1.5">
        <span className="h-1.5 w-6 rounded-full bg-[#5F58F4]" />
        <span className={`h-1.5 w-6 rounded-full ${isWhatsApp ? "bg-[#E3E2EE]" : "bg-[#5F58F4]"}`} />
      </div>

      <form onSubmit={onVerify}>
        <OtpInput value={code} onChange={setCode} />

        <button
          type="submit"
          disabled={code.length < 6}
          className="mt-6 h-11 w-full rounded-xl bg-[#5F58F4] text-sm font-semibold text-white transition hover:bg-[#4A43D6] disabled:cursor-not-allowed disabled:bg-[#C7C4F7] disabled:hover:bg-[#C7C4F7]"
        >
          {isWhatsApp ? "Verify number" : "Verify email"}
        </button>

        <p className="mt-4 text-center text-sm text-[#6C6B7B]">
          Didn&rsquo;t get a code?{" "}
          <button
            type="button"
            className="font-semibold text-[#5F58F4] transition-colors hover:text-[#4A43D6]"
          >
            Resend code
          </button>
        </p>
      </form>
    </AuthShell>
  );
}
