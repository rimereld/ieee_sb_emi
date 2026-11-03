import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Public Supabase connection for the Join and Contact forms.
// These two values are meant to be public: they ship in the website's JavaScript,
// and the database only lets visitors INSERT form entries (see supabase/migrations).
// VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY env vars override them if set.
const DEFAULT_URL = "https://hupuobgxaxhtumlbidcy.supabase.co"
const DEFAULT_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1cHVvYmd4YXhodHVtbGJpZGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM3MDIzMzYsImV4cCI6MjEwOTI3ODMzNn0.bmlBcCQISH3cZJ-WbTgoGeLs8Xx4fKQS0qjSQpYhRhc"

const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim() || DEFAULT_URL
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() || DEFAULT_ANON_KEY

function makeClient(): SupabaseClient | null {
  try {
    return createClient(url, anonKey)
  } catch (error) {
    console.error("[supabase] invalid configuration", error)
    return null
  }
}

/** null only if the configuration is invalid — the forms then show a friendly error instead of crashing. */
export const supabase = makeClient()
