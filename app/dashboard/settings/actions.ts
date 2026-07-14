"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type SaveResult = { ok: boolean; error?: string; logoUrl?: string };

/**
 * Persist the seller's business profile (name, WhatsApp phone, and optional
 * new logo). Writes are RLS-scoped to the signed-in user. The logo file is
 * uploaded to the owner-scoped `logos/<uid>/` path and its public URL saved.
 */
export async function saveBusiness(formData: FormData): Promise<SaveResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "You are not signed in." };

  const businessName = String(formData.get("business_name") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp") ?? "").trim();
  const logo = formData.get("logo");

  const update: Record<string, string> = {
    business_name: businessName,
    whatsapp,
  };

  // Optional logo upload.
  if (logo instanceof File && logo.size > 0) {
    const ext = logo.name.split(".").pop()?.toLowerCase() || "png";
    const path = `${user.id}/logo-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("logos")
      .upload(path, logo, { upsert: true, contentType: logo.type });
    if (uploadError) return { ok: false, error: uploadError.message };
    const {
      data: { publicUrl },
    } = supabase.storage.from("logos").getPublicUrl(path);
    update.logo_url = publicUrl;
  }

  const { error } = await supabase
    .from("profiles")
    .update(update)
    .eq("id", user.id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard");
  return { ok: true, logoUrl: update.logo_url };
}
