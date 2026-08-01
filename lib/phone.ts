/**
 * Nigerian phone number normalization to E.164.
 * Accepts the common local/international forms sellers type and returns both a
 * display form (+234...) and the digits-only form the WhatsApp API wants
 * (234...). Returns null when the number isn't a valid NG mobile number.
 *
 *   "0801 234 5678"   -> { e164: "+2348012345678", wa: "2348012345678" }
 *   "+234 803 000 1122" -> { e164: "+2348030001122", wa: "2348030001122" }
 *   "8012345678"      -> { e164: "+2348012345678", wa: "2348012345678" }
 */
export type NormalizedPhone = { e164: string; wa: string };

export function normalizeNgPhone(input: string): NormalizedPhone | null {
  const d = (input || "").replace(/\D/g, "");
  let wa: string | null = null;

  if (d.startsWith("234") && d.length === 13) wa = d;
  else if (d.startsWith("2340") && d.length === 14) wa = "234" + d.slice(4);
  else if (d.startsWith("0") && d.length === 11) wa = "234" + d.slice(1);
  else if (d.length === 10) wa = "234" + d;

  // NG mobile numbers: 234 + [7,8,9] + 9 more digits.
  if (!wa || !/^234[789]\d{9}$/.test(wa)) return null;
  return { e164: `+${wa}`, wa };
}
