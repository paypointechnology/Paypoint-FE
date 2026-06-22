"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthShell from "../_components/AuthShell";
import Field from "../../_components/Field";
import GoogleButton from "../_components/GoogleButton";
import Divider from "../_components/Divider";

export default function LoginPage() {
  const router = useRouter();
  // Frontend-only: returning sellers land on the dashboard. Real auth wires in with the backend.
  const goDashboard = () => router.push("/dashboard");

  return (
    <AuthShell
      heading="Welcome back"
      subheading="Log in to your Paypoint dashboard."
      altPrompt="New to Paypoint?"
      altLinkText="Create an account"
      altHref="/signup"
    >
      <GoogleButton label="Continue with Google" onClick={goDashboard} />
      <Divider />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goDashboard();
        }}
      >
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
          placeholder="Enter your password"
          autoComplete="current-password"
          rightSlot={
            <Link
              href="#"
              className="text-xs font-medium text-[#5F58F4] transition-colors hover:text-[#4A43D6]"
            >
              Forgot password?
            </Link>
          }
        />
        <button
          type="submit"
          className="mt-2 h-11 w-full rounded-xl bg-[#5F58F4] text-sm font-semibold text-white transition hover:bg-[#4A43D6]"
        >
          Log in
        </button>
      </form>
    </AuthShell>
  );
}
