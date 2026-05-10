import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

// ── General client — SSR-safe, @supabase/supabase-js uses no browser APIs ─────
// url/key are empty strings on server if env vars missing — client won't crash,
// all requests will simply fail and trigger seed fallback in queries.ts
export const supabase: SupabaseClient = createClient(url, key)

// ── Browser client for auth — only call inside 'use client' components ─────────
export function createSupabaseBrowser(): SupabaseClient {
  return createBrowserClient(url, key)
}
