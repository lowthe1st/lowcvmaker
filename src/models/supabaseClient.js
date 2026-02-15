import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log("SUPABASE URL:", supabaseUrl)
console.log("SUPABASE KEY EXISTS:", Boolean(supabaseAnonKey))

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in env')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,     // default, men tydligt
    autoRefreshToken: true,
    detectSessionInUrl: true,

    
  }, 

  
})
