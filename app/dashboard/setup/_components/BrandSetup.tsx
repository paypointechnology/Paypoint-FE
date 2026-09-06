"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepHeader from "../../../onboarding/_components/StepHeader";
import LogoUpload from "../../../onboarding/_components/LogoUpload";
import Field from "../../../_components/Field";
import { createClient } from "@/lib/supabase/client";
import { saveBrand } from "../actions";

const SWATCHES = ["#5F58F4", "#0B7A4B", "#E0397A", "#F2870D", "#1F7AE0", "#14132B"];

/**
 * Brand setup — reuses the onboarding StepHeader, LogoUpload and Field, wires
 * real state, uploads the logo to the `logos` bucket at `<uid>/...`, and
 * persists business_name, logo_url and brand_color via the saveBrand action.
 */
export default function BrandSetup() {
  const router = useRouter();
  const supabase = createClient();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [brandColor, setBrandColor] = useState(SWATCHES[0]);
  const [logoUrl, setLogoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    firstName.trim() !== "" && businessName.trim() !== "" && logoUrl !== "" && !saving;

  async function handleLogo(file: File) {
    setUploading(true);
    setError(null);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("You need to be logged in.");

      const ext = file.name.split(".").pop() || "png";
      const path = `${user.id}/logo-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("logos")
        .upload(path, file, { upsert: true, contentType: file.type });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("logos").getPublicUrl(path);
      setLogoUrl(data.publicUrl);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSaving(true);
    setError(null);

    const res = await saveBrand({
      businessName,
      logoUrl,
      brandColor,
      firstName,
      lastName,
    });

    if (!res.ok) {
      setError(res.error ?? "Something went wrong.");
      setSaving(false);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div>
      <StepHeader
        heading="Set up your brand"
        subtitle="This is what buyers see on your checkout."
      />

      <LogoUpload previewUrl={logoUrl} uploading={uploading} onSelect={handleLogo} />

      <form onSubmit={handleSubmit}>
        <div className="grid gap-x-3 sm:grid-cols-2">
          <Field
            label="First name"
            name="firstName"
            placeholder="Adaeze"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Field
            label="Last name"
            name="lastName"
            placeholder="Okeke"
            autoComplete="family-name"
            optional
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <Field
          label="Business name"
          name="business"
          placeholder="e.g. Adaeze Couture"
          autoComplete="organization"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />

        {/* Brand color */}
        <div className="mb-5">
          <label className="mb-1.5 block text-xs font-semibold text-[#6C6B7B]">
            Brand color
          </label>
          <div className="flex flex-wrap items-center gap-2.5">
            {SWATCHES.map((c) => {
              const active = brandColor === c;
              return (
                <button
                  key={c}
                  type="button"
                  aria-label={`Use ${c}`}
                  aria-pressed={active}
                  onClick={() => setBrandColor(c)}
                  className={`h-9 w-9 rounded-full transition ${
                    active
                      ? "ring-2 ring-[#14132B] ring-offset-2"
                      : "ring-1 ring-[#ECEBF3]"
                  }`}
                  style={{ backgroundColor: c }}
                />
              );
            })}
          </div>
          <p className="mt-1.5 text-xs text-[#9A99A8]">
            Used to accent your checkout page.
          </p>
        </div>

        {error && (
          <p className="mb-3 text-sm text-[#B42318]" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-2 h-11 w-full rounded-xl bg-[#5F58F4] text-sm font-semibold text-white transition hover:bg-[#4A43D6] disabled:cursor-not-allowed disabled:bg-[#C7C4F7] disabled:hover:bg-[#C7C4F7]"
        >
          {saving ? "Saving…" : "Save & continue"}
        </button>
        {!canSubmit && !saving && (
          <p className="mt-2 text-center text-xs text-[#9A99A8]">
            Add a logo, your first name and business name to continue.
          </p>
        )}
      </form>
    </div>
  );
}
