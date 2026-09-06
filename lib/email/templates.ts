import "server-only";

/**
 * Branded, email-client-safe HTML for Paypoint transactional email.
 * Table-based layout with inline styles (the only reliable approach across
 * Gmail, Outlook, Apple Mail). Brand colours only, no processor names, no em
 * dashes.
 */

const BRAND = "#5F58F4";
const INK = "#14132B";
const MUTED = "#6C6B7B";
const BORDER = "#ECEBF3";
const SOFT = "#F5F4FF";

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://www.paypoint.co";
}

/** Wrap body content in the branded shell. `preheader` is the inbox preview. */
export function baseEmail({
  preheader,
  heading,
  bodyHtml,
  cta,
}: {
  preheader: string;
  heading: string;
  bodyHtml: string;
  cta?: { label: string; href: string };
}): string {
  const year = new Date().getFullYear();
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:#FAFAFE;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${INK};">
  <span style="display:none!important;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${preheader}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAFE;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#FFFFFF;border:1px solid ${BORDER};border-radius:20px;overflow:hidden;">
        <!-- header -->
        <tr><td style="padding:22px 28px;border-bottom:1px solid ${BORDER};">
          <span style="font-size:19px;font-weight:800;letter-spacing:-0.02em;color:${BRAND};">Paypoint.</span>
        </td></tr>
        <!-- body -->
        <tr><td style="padding:30px 28px 8px;">
          <h1 style="margin:0 0 12px;font-size:23px;line-height:1.25;font-weight:800;letter-spacing:-0.02em;color:${INK};">${heading}</h1>
          <div style="font-size:15px;line-height:1.65;color:${MUTED};">${bodyHtml}</div>
        </td></tr>
        ${
          cta
            ? `<tr><td style="padding:22px 28px 6px;">
                 <a href="${cta.href}" style="display:inline-block;background:${BRAND};color:#FFFFFF;text-decoration:none;font-size:15px;font-weight:700;padding:13px 26px;border-radius:12px;">${cta.label}</a>
               </td></tr>`
            : ""
        }
        <!-- footer -->
        <tr><td style="padding:26px 28px 30px;">
          <hr style="border:none;border-top:1px solid ${BORDER};margin:0 0 18px;">
          <p style="margin:0 0 6px;font-size:12px;line-height:1.6;color:#9A99A8;">
            Paypoint helps social businesses turn attention into money in the bank. We are not a bank and never hold your money.
          </p>
          <p style="margin:0;font-size:12px;color:#9A99A8;">© ${year} Paypoint · <a href="${siteUrl()}" style="color:${BRAND};text-decoration:none;">paypoint.co</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
