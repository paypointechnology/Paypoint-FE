"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSetupStatus } from "@/lib/setup";
import { slugify, digitsOnly } from "@/app/_lib/format";

export type CreatePageResult =
  | { ok: true; slug: string }
  | { ok: false; error: string };

const SLUG_FALLBACK = "page";

/**
 * Persist a new payment page for the signed-in seller.
 * - Setup-gated (defense-in-depth; the route also gates the builder).
 * - Uploads the optional product photo to the owner-scoped page-images bucket.
 * - Ensures a globally-unique slug, retrying with a short suffix on collision.
 */
export async function createPage(
  formData: FormData,
): Promise<CreatePageResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "You are not signed in." };

  // Defense-in-depth: creating a page requires completed setup.
  const setup = await getSetupStatus();
  if (!setup.complete) {
    return { ok: false, error: "Complete your setup before creating a page." };
  }

  const title = String(formData.get("title") ?? "").trim();
  const priceDigits = digitsOnly(String(formData.get("price") ?? ""));
  if (!title) return { ok: false, error: "Add a title for your page." };
  if (!priceDigits) return { ok: false, error: "Add a price for your page." };

  const type = String(formData.get("type") ?? "product");
  const description = String(formData.get("description") ?? "").trim();
  const delivery = String(formData.get("delivery") ?? "").trim();

  let collectFields: unknown = { phone: false, email: false, address: false };
  try {
    const raw = formData.get("collect_fields");
    if (typeof raw === "string" && raw) collectFields = JSON.parse(raw);
  } catch {
    /* keep default */
  }

  // Optional product photo → page-images/<uid>/...
  let imageUrl: string | null = null;
  const photo = formData.get("photo");
  if (photo instanceof File && photo.size > 0) {
    const ext = photo.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${user.id}/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("page-images")
      .upload(path, photo, { upsert: true, contentType: photo.type });
    if (uploadError) return { ok: false, error: uploadError.message };
    const {
      data: { publicUrl },
    } = supabase.storage.from("page-images").getPublicUrl(path);
    imageUrl = publicUrl;
  }

  const base = slugify(title) || SLUG_FALLBACK;
  const record = {
    user_id: user.id,
    title,
    type: type === "service" ? "service" : "product",
    price_kobo: Number(priceDigits) * 100,
    currency: "NGN",
    description: description || null,
    image_url: imageUrl,
    delivery_info: delivery || null,
    collect_fields: collectFields,
    is_active: true,
    setup_complete: true,
  };

  // Insert, retrying the slug on unique-constraint collisions.
  for (let attempt = 0; attempt < 5; attempt++) {
    const slug =
      attempt === 0 ? base : `${base}-${Math.random().toString(36).slice(2, 6)}`;
    const { error } = await supabase
      .from("pages")
      .insert({ ...record, slug });

    if (!error) {
      revalidatePath("/dashboard/pages");
      revalidatePath("/dashboard");
      return { ok: true, slug };
    }
    // 23505 = unique_violation (slug taken) → try another slug.
    if (error.code !== "23505") {
      return { ok: false, error: error.message };
    }
  }

  return { ok: false, error: "Could not generate a unique link. Try again." };
}
