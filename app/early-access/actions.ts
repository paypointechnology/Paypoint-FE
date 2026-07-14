"use server";

import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Waitlist capture. All writes go through the service-role admin client so the
 * `waitlist` table can stay fully RLS-locked (no anon/authenticated access).
 * Step 1 (joinWaitlist) captures the email the instant it's submitted — that's
 * the core capture. Step 2 (submitWaitlistSurvey) enriches the same row with
 * the optional survey; if the user closes the modal early, the email is safe.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type JoinResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export async function joinWaitlist(
  email: string,
  source: string,
): Promise<JoinResult> {
  const clean = email.trim().toLowerCase();
  if (!EMAIL_RE.test(clean)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  try {
    const admin = createAdminClient();
    // Upsert so a repeat signup is idempotent and still returns the row id
    // (lets a returning visitor re-answer the survey).
    const { data, error } = await admin
      .from("waitlist")
      .upsert(
        { email: clean, source: source || "hero" },
        { onConflict: "email" },
      )
      .select("id")
      .single();

    if (error || !data) {
      return { ok: false, error: "Something went wrong. Please try again." };
    }
    return { ok: true, id: data.id };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export type SurveyAnswers = {
  sells?: string;
  channels?: string[];
  challenge?: string;
};

export async function submitWaitlistSurvey(
  id: string,
  answers: SurveyAnswers,
): Promise<{ ok: boolean }> {
  if (!id) return { ok: false };
  try {
    const admin = createAdminClient();
    const { error } = await admin
      .from("waitlist")
      .update({
        sells: answers.sells ?? null,
        channels: answers.channels?.length ? answers.channels : null,
        challenge: answers.challenge ?? null,
        survey_completed: true,
      })
      .eq("id", id);
    return { ok: !error };
  } catch {
    return { ok: false };
  }
}
