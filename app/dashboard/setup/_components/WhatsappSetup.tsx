"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepHeader from "../../../onboarding/_components/StepHeader";
import OtpInput from "../../../(auth)/_components/OtpInput";
import { saveWhatsapp } from "../actions";

/**
 * WhatsApp verification — reuses the shared OtpInput.
 * Enter number → "send code" (simulated) → 6-digit OTP (any 6 digits pass for
 * now) → on verify we persist the number and phone_verified via saveWhatsapp.
 *
 * Real OTP delivery is the Meta WhatsApp Cloud API (Phase 2).
 */
export default function WhatsappSetup() {
  const router = useRouter();

  const [phase, setPhase] = useState<"number" | "code">("number");
  const [whatsapp, setWhatsapp] = useState("");
  const [code, setCode] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function sendCode(e: React.FormEvent) {
    e.preventDefault();
    if (whatsapp.trim() === "") return;
    // Simulated send — real delivery arrives with the WhatsApp Cloud API.
    setError(null);
    setPhase("code");
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    if (code.length < 6 || saving) return;
    setSaving(true);
    setError(null);

    const res = await saveWhatsapp({ whatsapp });
    if (!res.ok) {
      setError(res.error ?? "Something went wrong.");
      setSaving(false);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  if (phase === "number") {
    return (
      <div>
        <StepHeader
          heading="Verify your WhatsApp number"
          subtitle="Buyers reach you here, and we use it to confirm it's really you."
        />

        <form onSubmit={sendCode}>
          <label htmlFor="whatsapp" className="mb-1.5 block text-xs font-semibold text-[#6C6B7B]">
            WhatsApp Business Number
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="0801 234 5678"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="h-11 w-full rounded-[10px] border border-[#E3E2EE] bg-white px-3.5 text-sm text-[#14132B] outline-none transition placeholder:text-[#9A99A8] focus:border-[#5F58F4] focus:ring-2 focus:ring-[#EEEDFE]"
          />

          <button
            type="submit"
            disabled={whatsapp.trim() === ""}
            className="mt-5 h-11 w-full rounded-xl bg-[#5F58F4] text-sm font-semibold text-white transition hover:bg-[#4A43D6] disabled:cursor-not-allowed disabled:bg-[#C7C4F7] disabled:hover:bg-[#C7C4F7]"
          >
            Send code
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <StepHeader
        heading="Enter your code"
        subtitle={`We sent a 6-digit code to ${whatsapp} on WhatsApp.`}
      />

      <form onSubmit={verify}>
        <OtpInput value={code} onChange={setCode} />

        {error && (
          <p className="mt-4 text-center text-sm text-[#B42318]" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={code.length < 6 || saving}
          className="mt-6 h-11 w-full rounded-xl bg-[#5F58F4] text-sm font-semibold text-white transition hover:bg-[#4A43D6] disabled:cursor-not-allowed disabled:bg-[#C7C4F7] disabled:hover:bg-[#C7C4F7]"
        >
          {saving ? "Verifying…" : "Verify number"}
        </button>

        <p className="mt-4 text-center text-sm text-[#6C6B7B]">
          Wrong number?{" "}
          <button
            type="button"
            onClick={() => {
              setPhase("number");
              setCode("");
            }}
            className="font-semibold text-[#5F58F4] transition-colors hover:text-[#4A43D6]"
          >
            Change it
          </button>
        </p>
      </form>
    </div>
  );
}
