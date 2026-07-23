"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/brevo";
import { waitlistWelcomeEmail } from "@/lib/email/templates";

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

    // Already on the list? Return the row id without re-sending the welcome.
    const { data: existing } = await admin
      .from("waitlist")
      .select("id")
      .eq("email", clean)
      .maybeSingle();
    if (existing) return { ok: true, id: existing.id };

    const { data, error } = await admin
      .from("waitlist")
      .insert({ email: clean, source: source || "hero" })
      .select("id")
      .single();

    // Lost a race to a concurrent signup — fetch and return the existing row.
    if (error?.code === "23505") {
      const { data: dup } = await admin
        .from("waitlist")
        .select("id")
        .eq("email", clean)
        .maybeSingle();
      if (dup) return { ok: true, id: dup.id };
    }
    if (error || !data) {
      return { ok: false, error: "Something went wrong. Please try again." };
    }

    // Send the welcome email. Never block signup on email delivery.
    try {
      const mail = waitlistWelcomeEmail();
      await sendEmail({ to: clean, subject: mail.subject, html: mail.html, text: mail.text, tags: ["waitlist-welcome"] });
    } catch {
      /* email failure must not fail the signup */
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
