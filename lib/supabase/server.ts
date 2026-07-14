import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server Supabase client for Server Components, Route Handlers, and Server Actions.
 * Reads/writes the auth session via Next.js cookies using the current
 * getAll/setAll interface.
 *
 * Note: In a Server Component, cookies are read-only — the `setAll` write will
 * throw. We swallow that error because the middleware (updateSession) is
 * responsible for refreshing the session cookie on every request.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component — cookies are read-only here.
            // Safe to ignore; middleware refreshes the session cookie.
          }
        },
      },
    },
  );
}
