import { createClient } from '@supabase/supabase-js'

let cachedClient = null

export function getSupabaseClient() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  const missing = []

  if (!supabaseUrl) {
    missing.push('VITE_SUPABASE_URL')
  }

  if (!supabaseAnonKey) {
    missing.push('VITE_SUPABASE_ANON_KEY')
  }

  if (missing.length > 0) {
    return {
      client: null,
      error: `Missing ${missing.join(' and/or ')}. Create a .env.local (or .env) in project root and restart Vite.`,
    }
  }

  if (!cachedClient) {
    cachedClient = createClient(supabaseUrl, supabaseAnonKey)
  }

  return { client: cachedClient, error: null }
}
