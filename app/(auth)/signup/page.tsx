"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "../_components/AuthShell";
import Field from "../../_components/Field";
import GoogleButton from "../_components/GoogleButton";
import Divider from "../_components/Divider";

export default function SignupPage() {
  const router = useRouter();
  // Frontend-only: take new sellers into onboarding. Real auth wires in with the backend.
  const goOnboarding = () => router.push("/onboarding");

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
          goOnboarding();
        }}
      >
        <Field
          label="Business name"
          name="business"
          placeholder="e.g. Adaeze Couture"
          autoComplete="organization"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@business.com"
          autoComplete="email"
        />
        <Field
          label="Password"
          name="password"
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
        />
        <button
          type="submit"
          className="mt-2 h-11 w-full rounded-xl bg-[#5F58F4] text-sm font-semibold text-white transition hover:bg-[#4A43D6]"
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
