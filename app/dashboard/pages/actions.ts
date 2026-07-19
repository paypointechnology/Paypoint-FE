"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/** Activate / archive a checkout. RLS restricts updates to the owner's rows. */
export async function setPageActive(slug: string, active: boolean): Promise<{ ok: boolean }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { ok: false };
    const { error } = await supabase.from("pages").update({ is_active: active }).eq("slug", slug);
    if (error) return { ok: false };
    revalidatePath("/dashboard/pages");
    revalidatePath("/dashboard");
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

/** Permanently delete a checkout. Its payment records are retained (page_id
 *  is set null on delete). RLS restricts deletes to the owner's rows. */
export async function deletePage(slug: string): Promise<{ ok: boolean }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { ok: false };
    const { error } = await supabase.from("pages").delete().eq("slug", slug);
    if (error) return { ok: false };
    revalidatePath("/dashboard/pages");
    revalidatePath("/dashboard");
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
