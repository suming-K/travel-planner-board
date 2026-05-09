import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// ── General purpose client (queries, data fetch) ──────────────────────────────
export const supabase = createClient(url, key)

// ── Auth-aware browser client (auth state, session cookies) ──────────────────
// Call inside components/hooks only (client-side)
export function createSupabaseBrowser() {
  return createBrowserClient(url, key)
}
