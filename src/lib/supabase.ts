import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Keys come from environment variables (see .env.example):
// locally from .env, in production from the Vercel project settings.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/** null when the keys aren't set — the forms then show a friendly error instead of crashing. */
export const supabase: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null
