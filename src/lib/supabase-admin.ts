import { createClient } from '@supabase/supabase-js'

// Server-only klijent. Koristi service role (secret) key koji zaobilazi RLS.
// NIKADA ne importovati ovo u client komponentu — secret key ne sme u browser.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})
