"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepHeader from "../../../onboarding/_components/StepHeader";
import OtpInput from "../../../(auth)/_components/OtpInput";
import { sendWhatsappOtp, verifyWhatsappOtp } from "../actions";

/**
 * WhatsApp verification (Phase 2, real OTP).
 * Enter number → sendWhatsappOtp (generates + stores a hashed code, sends it via
 * the WhatsApp Cloud API) → 6-digit OtpInput → verifyWhatsappOtp checks it and
 * persists phone_verified.
 *
 * Dev fallback: until a real WABA + approved template is wired, no message is
 * sent and the code comes back so we can test the flow (shown as a hint below).
 */
export default function WhatsappSetup() {
  const router = useRouter();

  const [phase, setPhase] = useState<"number" | "code">("number");
  const [whatsapp, setWhatsapp] = useState("");
  const [code, setCode] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devCode, setDevCode] = useState<string | null>(null);

  async function requestCode() {
    if (whatsapp.trim() === "" || sending) return;
    setSending(true);
    setError(null);
    setDevCode(null);

    const res = await sendWhatsappOtp({ whatsapp });
    setSending(false);
    if (!res.ok) {
      setError(res.error ?? "Something went wrong.");
      return;
    }
    if (res.dev && res.devCode) setDevCode(res.devCode);
    setCode("");
    setPhase("code");
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    if (code.length < 6 || verifying) return;
    setVerifying(true);
    setError(null);

    const res = await verifyWhatsappOtp({ whatsapp, code });
    if (!res.ok) {
      setError(res.error ?? "Something went wrong.");
      setVerifying(false);
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            requestCode();
          }}
        >
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

          {error && (
            <p className="mt-3 text-sm text-[#B42318]" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={whatsapp.trim() === "" || sending}
            className="mt-5 h-11 w-full rounded-xl bg-[#5F58F4] text-sm font-semibold text-white transition hover:bg-[#4A43D6] disabled:cursor-not-allowed disabled:bg-[#C7C4F7] disabled:hover:bg-[#C7C4F7]"
          >
            {sending ? "Sending…" : "Send code"}
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

      {devCode && (
        <div className="mb-4 rounded-[10px] border border-[#E3E2EE] bg-[#FAFAFE] px-3.5 py-2.5 text-center text-sm text-[#6C6B7B]">
          Dev mode (no message sent). Your code is{" "}
          <span className="font-bold tracking-wide text-[#14132B]">{devCode}</span>
        </div>
      )}

      <form onSubmit={verify}>
        <OtpInput value={code} onChange={setCode} />

        {error && (
          <p className="mt-4 text-center text-sm text-[#B42318]" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={code.length < 6 || verifying}
          className="mt-6 h-11 w-full rounded-xl bg-[#5F58F4] text-sm font-semibold text-white transition hover:bg-[#4A43D6] disabled:cursor-not-allowed disabled:bg-[#C7C4F7] disabled:hover:bg-[#C7C4F7]"
        >
          {verifying ? "Verifying…" : "Verify number"}
        </button>

        <div className="mt-4 flex items-center justify-center gap-4 text-sm text-[#6C6B7B]">
          <button
            type="button"
            onClick={requestCode}
            disabled={sending}
            className="font-semibold text-[#5F58F4] transition-colors hover:text-[#4A43D6] disabled:opacity-50"
          >
            {sending ? "Resending…" : "Resend code"}
          </button>
          <span className="text-[#E3E2EE]">|</span>
          <button
            type="button"
            onClick={() => {
              setPhase("number");
              setCode("");
              setError(null);
              setDevCode(null);
            }}
            className="font-semibold text-[#5F58F4] transition-colors hover:text-[#4A43D6]"
          >
            Change number
          </button>
        </div>
      </form>
    </div>
  );
}
