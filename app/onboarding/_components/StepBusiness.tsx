"use client";

import Field from "../../_components/Field";
import LogoUpload from "./LogoUpload";
import StepHeader from "./StepHeader";

/** Step 1 — set up the business profile buyers see at checkout. */
export default function StepBusiness({ onContinue }: { onContinue: () => void }) {
  return (
    <div>
      <StepHeader
        heading="Set up your business"
        subtitle="This is what buyers see on your checkout."
      />

      <LogoUpload />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onContinue();
        }}
      >
        <div className="grid gap-x-3 sm:grid-cols-2">
          <Field
            label="First name"
            name="firstName"
            placeholder="Adaeze"
            autoComplete="given-name"
          />
          <Field
            label="Last name"
            name="lastName"
            placeholder="Okeke"
            autoComplete="family-name"
          />
        </div>
        <Field
          label="Business name"
          name="business"
          placeholder="e.g. Adaeze Couture"
          autoComplete="organization"
        />

        <button
          type="submit"
          className="mt-2 h-11 w-full rounded-xl bg-[#5F58F4] text-sm font-semibold text-white transition hover:bg-[#4A43D6]"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
