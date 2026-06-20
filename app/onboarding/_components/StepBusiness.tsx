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
        <Field
          label="Business name"
          name="business"
          placeholder="e.g. Adaeze Couture"
          autoComplete="organization"
        />
        <Field
          label="Phone number"
          name="phone"
          type="tel"
          placeholder="e.g. 0801 234 5678"
          autoComplete="tel"
          optional
          helper="For buyer support and receipts."
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
