import "server-only";

/**
 * WhatsApp Cloud API client for OTP delivery.
 * Sends the approved "Authentication" template with the one-time code.
 *
 * DEV FALLBACK: until a real (non-test) WABA + approved template is wired
 * (WHATSAPP_ACCESS_TOKEN / WHATSAPP_OTP_TEMPLATE set to real values), no message
 * is actually sent. The code is logged server-side and returned as `dev` so the
 * setup UI can surface it, letting us test the full generate -> verify flow.
 */

const GRAPH_VERSION = "v21.0";

/** True only when real credentials AND an approved template are configured. */
export function whatsappConfigured(): boolean {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const template = process.env.WHATSAPP_OTP_TEMPLATE;
  return Boolean(
    token && token !== "placeholder" &&
    phoneId && phoneId !== "placeholder" &&
    template,
  );
}

export type SendResult = { ok: boolean; dev?: boolean; error?: string };

/** Send the OTP via the authentication template. `wa` = digits only (234...). */
export async function sendOtpTemplate(wa: string, code: string): Promise<SendResult> {
  if (!whatsappConfigured()) {
    // Dev fallback — no real send.
    console.log(`[whatsapp:dev] OTP for ${wa} = ${code}`);
    return { ok: true, dev: true };
  }

  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID!;
  const token = process.env.WHATSAPP_ACCESS_TOKEN!;
  const template = process.env.WHATSAPP_OTP_TEMPLATE!;
  const lang = process.env.WHATSAPP_OTP_TEMPLATE_LANG || "en_US";

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${phoneId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: wa,
          type: "template",
          template: {
            name: template,
            language: { code: lang },
            // Authentication template: the code fills the body AND the
            // "Copy code" button (implemented as a url button under the hood).
            components: [
              { type: "body", parameters: [{ type: "text", text: code }] },
              {
                type: "button",
                sub_type: "url",
                index: "0",
                parameters: [{ type: "text", text: code }],
              },
            ],
          },
        }),
      },
    );

    if (!res.ok) {
      const body = await res.text();
      console.error("[whatsapp] send failed", res.status, body);
      return { ok: false, error: "Could not send the code. Please try again." };
    }
    return { ok: true };
  } catch (e) {
    console.error("[whatsapp] send error", e);
    return { ok: false, error: "Could not send the code. Please try again." };
  }
}
