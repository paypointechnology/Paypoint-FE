import "server-only";

/**
 * Kora Identity client (KYC/KYB).
 * Verifies Nigerian business registrations (CAC) and owner identity (BVN).
 *
 * DEV FALLBACK: until a real KORA_SECRET_KEY is set (and Identity access is
 * approved on the Kora dashboard), no registry call is made — lookups return a
 * simulated success flagged `dev` so the full setup flow stays testable.
 */

const KORA_BASE = "https://api.korapay.com/merchant/api/v1";

/** True only when a real secret key is configured. */
export function koraConfigured(): boolean {
  const key = process.env.KORA_SECRET_KEY;
  return Boolean(key && key !== "placeholder");
}

export type IdentityErrorCode = "invalid_input" | "not_found" | "unavailable";

export type IdentityResult = {
  ok: boolean;
  dev?: boolean;
  error?: string;
  /** Coarse failure class so each flow can show actionable copy. */
  code?: IdentityErrorCode;
  /** Registered/legal name returned by the registry, when available. */
  registeredName?: string;
  /** Raw provider response — persisted server-side for the audit trail. */
  raw?: unknown;
};

/** Classify a provider failure; the raw message stays in the audit trail. */
function classifyIdentityError(httpStatus: number, json: { error?: unknown; message?: unknown } | null): IdentityErrorCode {
  const raw = `${json?.error ?? ""} ${json?.message ?? ""}`.toLowerCase();
  if (raw.includes("validation") || raw.includes("invalid")) return "invalid_input";
  if (httpStatus === 404 || raw.includes("not found") || raw.includes("no record") || raw.includes("not_found")) return "not_found";
  return "unavailable";
}

/** Registries name the company field inconsistently across ID types. */
function pickRegisteredName(data: unknown): string | undefined {
  if (!data || typeof data !== "object") return undefined;
  const d = data as Record<string, unknown>;
  const name = d.company_name ?? d.registration_name ?? d.business_name ?? d.name;
  return typeof name === "string" && name.trim() ? name.trim() : undefined;
}

async function identityRequest(
  path: string,
  body: Record<string, unknown>,
): Promise<IdentityResult> {
  try {
    const res = await fetch(`${KORA_BASE}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.KORA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const json = (await res.json().catch(() => null)) as
      | { status?: boolean; message?: string; data?: unknown }
      | null;

    if (!res.ok || !json?.status) {
      // Billing/access failures are OPS problems (fund the Kora wallet,
      // enable the Identity sub-product) — sellers see generic copy, but
      // these must be loud in the server logs.
      const msg = (json?.message ?? "").toLowerCase();
      if (msg.includes("insufficient funds") || msg.includes("restricted")) {
        console.error(`[kora:OPS] identity lookup blocked (${path}): ${json?.message}`);
      }
      return {
        ok: false,
        code: classifyIdentityError(res.status, json),
        error: json?.message || "Verification failed. Please try again.",
        raw: json ?? { http_status: res.status },
      };
    }

    return { ok: true, registeredName: pickRegisteredName(json.data), raw: json };
  } catch {
    return {
      ok: false,
      code: "unavailable",
      error: "Could not reach the verification service. Please try again.",
    };
  }
}

/**
 * KYB: look up a business registration against CAC.
 * The live API (stricter than the docs) requires `id` as DIGITS ONLY plus a
 * `registration_type` of "RC" (registered company) or "BN" (business name).
 * `registrationName` is optional context Kora can match against.
 */
export async function verifyCac(
  registrationDigits: string,
  registrationType: "RC" | "BN",
  registrationName?: string,
): Promise<IdentityResult> {
  if (!koraConfigured()) {
    console.log(`[kora:dev] CAC lookup for ${registrationType}${registrationDigits} — simulated success`);
    return { ok: true, dev: true, registeredName: registrationName };
  }

  const body: Record<string, unknown> = {
    id: registrationDigits,
    registration_type: registrationType,
    verification_consent: true,
  };
  if (registrationName) body.registration_name = registrationName;

  const result = await identityRequest("/identities/ng/cac", body);
  if (result.ok) return result;
  const friendly: Record<IdentityErrorCode, string> = {
    invalid_input:
      "That registration number doesn't look right. Enter it exactly as it appears on your CAC certificate, with the RC or BN prefix (e.g. RC1234567).",
    not_found:
      "We couldn't find that number in the CAC registry. Double-check the digits and whether it's an RC or BN registration, then try again.",
    unavailable:
      "The CAC registry check couldn't be completed right now. Please try again in a few minutes.",
  };
  return { ...result, error: friendly[result.code ?? "unavailable"] };
}

export type BvnResult = IdentityResult & {
  /** The registry's name for the BVN holder, when returned. */
  ownerName?: string;
  /**
   * Name-match verdict when validation names were sent:
   *   true  = at least one of first/last matched the registry
   *   false = both were checked and neither matched
   *   undefined = the provider returned no validation block
   */
  nameMatched?: boolean;
};

/** KYC: verify the owner's BVN, matching the given names against the registry. */
export async function verifyBvn(
  bvn: string,
  validation?: { firstName?: string; lastName?: string; dateOfBirth?: string },
): Promise<BvnResult> {
  if (!koraConfigured()) {
    console.log(`[kora:dev] BVN lookup — simulated success`);
    const devName = [validation?.firstName, validation?.lastName]
      .filter(Boolean)
      .join(" ")
      .toUpperCase();
    return { ok: true, dev: true, ownerName: devName || "TEST ACCOUNT OWNER", nameMatched: true };
  }

  const body: Record<string, unknown> = { id: bvn, verification_consent: true };
  if (validation) {
    body.validation = {
      ...(validation.firstName ? { first_name: validation.firstName } : {}),
      ...(validation.lastName ? { last_name: validation.lastName } : {}),
      ...(validation.dateOfBirth ? { date_of_birth: validation.dateOfBirth } : {}),
    };
  }

  const result = await identityRequest("/identities/ng/bvn", body);
  if (!result.ok) {
    const friendly: Record<IdentityErrorCode, string> = {
      invalid_input: "That BVN doesn't look right — it should be exactly 11 digits. Dial *565*0# on your registered line to check it.",
      not_found: "We couldn't find that BVN. Double-check the 11 digits and try again.",
      unavailable: "The BVN check couldn't be completed right now. Please try again in a few minutes.",
    };
    return { ...result, error: friendly[result.code ?? "unavailable"] };
  }

  const d = ((result.raw as { data?: unknown } | null)?.data ?? null) as {
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    full_name?: string;
    validation?: {
      first_name?: { match?: boolean };
      last_name?: { match?: boolean };
    };
  } | null;

  const ownerName =
    d?.full_name?.trim() ||
    [d?.first_name, d?.middle_name, d?.last_name].filter(Boolean).join(" ").trim() ||
    undefined;

  let nameMatched: boolean | undefined;
  const v = d?.validation;
  if (v && (v.first_name || v.last_name)) {
    const matches = [v.first_name?.match, v.last_name?.match].filter((m) => m !== undefined);
    nameMatched = matches.some(Boolean);
  }

  return { ...result, ownerName, nameMatched };
}
