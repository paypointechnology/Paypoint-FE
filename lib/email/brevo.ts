import "server-only";

/**
 * Transactional email via the Brevo (Sendinblue) HTTP API.
 * Server-only. Reads BREVO_API_KEY, EMAIL_FROM, EMAIL_FROM_NAME from the env.
 * Fails safe: if the key is missing or Brevo errors, it returns { ok:false }
 * and never throws, so callers (e.g. waitlist signup) are never blocked by
 * email delivery.
 *
 * Docs: https://developers.brevo.com/reference/sendtransacemail
 */

export type SendEmailArgs = {
  to: string;
  toName?: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  /** Optional Brevo tags for analytics/filtering. */
  tags?: string[];
};

export type SendEmailResult = { ok: boolean; error?: string; messageId?: string };

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

export async function sendEmail({
  to,
  toName,
  subject,
  html,
  text,
  replyTo,
  tags,
}: SendEmailArgs): Promise<SendEmailResult> {
  const key = process.env.BREVO_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || "hello@paypoint.co";
  const fromName = process.env.EMAIL_FROM_NAME || "Paypoint";

  if (!key) {
    // Not configured yet — don't crash, just report.
    console.warn(`[email] BREVO_API_KEY not set; skipped email to ${to} ("${subject}")`);
    return { ok: false, error: "BREVO_API_KEY not set" };
  }

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": key,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: fromName, email: fromEmail },
        to: [{ email: to, ...(toName ? { name: toName } : {}) }],
        subject,
        htmlContent: html,
        ...(text ? { textContent: text } : {}),
        ...(replyTo ? { replyTo: { email: replyTo } } : {}),
        ...(tags && tags.length ? { tags } : {}),
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[email] Brevo ${res.status} sending to ${to}: ${body}`);
      return { ok: false, error: `Brevo ${res.status}` };
    }

    const data = (await res.json().catch(() => ({}))) as { messageId?: string };
    return { ok: true, messageId: data.messageId };
  } catch (err) {
    console.error("[email] Brevo request failed:", err);
    return { ok: false, error: "request failed" };
  }
}
