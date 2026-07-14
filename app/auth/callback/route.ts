import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * OAuth + email-link callback handler.
 * Supabase redirects here with a `code` (PKCE) after Google sign-in or an
 * email confirmation link. We exchange it for a session (which sets the auth
 * cookies via the server client) and then forward the user on.
 *
 * Supports an optional `next` param for post-login destination.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  // Only allow relative, in-app redirects to avoid open-redirect abuse.
  const safeNext = next.startsWith("/") ? next : "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Respect proxy/load-balancer forwarded host in production.
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${safeNext}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${safeNext}`);
      } else {
        return NextResponse.redirect(`${origin}${safeNext}`);
      }
    }
  }

  // No code, or exchange failed -> back to login with an error flag.
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
