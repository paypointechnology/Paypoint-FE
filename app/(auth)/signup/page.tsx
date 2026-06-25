"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "../_components/AuthShell";
import Field from "../../_components/Field";
import GoogleButton from "../_components/GoogleButton";
import Divider from "../_components/Divider";

export default function SignupPage() {
  const router = useRouter();
  // Frontend-only: email/password sign-up goes to verification; Google is already
  // verified, so it goes straight to onboarding. Real auth wires in with the backend.
  const goVerify = () => router.push("/verify");
  const goOnboarding = () => router.push("/onboarding");

  // Controlled so we can require all fields (incl. the WhatsApp Business number).
  // Business name is captured in onboarding, not here.
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit =
    whatsapp.trim() !== "" && email.trim() !== "" && password.trim() !== "";

  return (
    <AuthShell
      heading="Create your account"
      subheading="Start getting paid in minutes."
      altPrompt="Already have an account?"
      altLinkText="Log in"
      altHref="/login"
    >
      <GoogleButton label="Sign up with Google" onClick={goOnboarding} />
      <Divider />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!canSubmit) return;
          goVerify();
        }}
      >
        <Field
          label="WhatsApp Business Number"
          name="whatsapp"
          type="tel"
          inputMode="numeric"
          placeholder="0801 234 5678"
          autoComplete="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@business.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-2 h-11 w-full rounded-xl bg-[#5F58F4] text-sm font-semibold text-white transition hover:bg-[#4A43D6] disabled:cursor-not-allowed disabled:bg-[#C7C4F7] disabled:hover:bg-[#C7C4F7]"
        >
          Create account
        </button>
        <p className="mt-4 text-center text-xs leading-relaxed text-[#9A99A8]">
          By creating an account, you agree to our{" "}
          <Link href="#" className="text-[#6C6B7B] underline underline-offset-2 hover:text-[#14132B]">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-[#6C6B7B] underline underline-offset-2 hover:text-[#14132B]">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </AuthShell>
  );
}
