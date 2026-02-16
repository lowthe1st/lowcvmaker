import { supabase } from './supabaseClient.js'

/**
 * =========================
 * AUTH STATE SUBSCRIBERS
 * =========================
 */
const authListeners = new Set()
let currentAuthUser = null

function mapUser(user) {
  if (!user) return null
  return {
    id: user.id,
    email: user.email ?? null,
    provider: user.app_metadata?.provider ?? null,
    username: user.user_metadata?.username ?? null,
  }
}

function notifyAuth() {
  for (const listener of authListeners) {
    try {
      listener(currentAuthUser)
    } catch (e) {
      // don't break other listeners
      console.error('Auth listener error:', e)
    }
  }
}

/**
 * Subscribe to auth state updates.
 * Returns an unsubscribe function.
 */
export function watchAuthState(listener) {
  authListeners.add(listener)

  // 1) Init: use session first (fast), then optionally verify user
  ;(async () => {
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) throw sessionError

      const sessionUser = sessionData.session?.user ?? null
      if (sessionUser) {
        currentAuthUser = mapUser(sessionUser)
        notifyAuth()
        return
      }

      // If no session user, try getUser (covers edge cases)
      const { data: userData, error: userError } = await supabase.auth.getUser()
      if (userError) {
        currentAuthUser = null
      } else {
        currentAuthUser = mapUser(userData.user)
      }
      notifyAuth()
    } catch (_err) {
      currentAuthUser = null
      notifyAuth()
    }
  })()

  // 2) Listen to auth changes
  const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
    currentAuthUser = mapUser(session?.user ?? null)
    notifyAuth()
  })

  // cleanup
  return () => {
    authListeners.delete(listener)
    subscription?.subscription?.unsubscribe()
  }
}

/**
 * =========================
 * AUTH ACTIONS
 * =========================
 */

export async function signUpWithEmail(username, email, password) {
  const normalizedUsername = String(username || '').trim()
  const normalizedEmail = String(email || '').trim().toLowerCase()
  const normalizedPassword = String(password || '')

  if (!normalizedUsername) throw new Error('Username is required.')
  if (normalizedUsername.length < 3) throw new Error('Username must be at least 3 characters long.')
  if (!/^[a-zA-Z0-9_.]+$/.test(normalizedUsername)) {
    throw new Error('Username can only contain letters, numbers, underscore, and dot.')
  }
  if (!normalizedEmail || !normalizedPassword) throw new Error('Email and password are required.')

  const { data, error } = await supabase.auth.signUp({
    email: normalizedEmail,
    password: normalizedPassword,
    options: { data: { username: normalizedUsername } },
  })

  if (error) throw error
  return mapUser(data.user)
}

export async function logInWithEmail(email, password) {
  const normalizedEmail = String(email || '').trim().toLowerCase()
  const normalizedPassword = String(password || '')
  if (!normalizedEmail || !normalizedPassword) throw new Error('Email and password are required.')

  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password: normalizedPassword,
  })

  if (error) throw error
  return mapUser(data.user)
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin },
  })
  if (error) throw error
  return data
}

export async function signInWithApple() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: { redirectTo: window.location.origin },
  })
  if (error) throw error
  return data
}

export async function logOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/**
 * =========================
 * DB (PERSISTENT DOCS)
 * =========================
 */

/**
 * Load the user's latest content from user_documents.
 * If the row doesn't exist yet, return empty defaults.
 */
export async function loadLatestContent(userId) {
  if (!userId) throw new Error('Missing userId')

  // maybeSingle handles "0 rows" gracefully in many cases
  const { data, error } = await supabase
    .from('user_documents')
   .select('cv, cover_letter, resume_draft, selected_theme_id, profile_answers, ai_enabled, ai_last_review')
    .eq('user_id', userId)
    .maybeSingle()

  // If no row yet, return defaults
  if (!data) {
    // If there's an error besides "no rows", throw it
    if (error && error.code && error.code !== 'PGRST116') {
      throw error
    }

    return { 
  cv: '', 
  coverLetter: '', 
  resumeDraft: {}, 
  selectedThemeId: 'even',
  profileAnswers: {},
  aiEnabled: false,
  aiLastReview: {},
}

  }

  // If we got data but still an error (rare), throw
  if (error) throw error

  return {
  cv: data.cv ?? '',
  coverLetter: data.cover_letter ?? '',
  resumeDraft: data.resume_draft ?? {},
  selectedThemeId: data.selected_theme_id ?? 'even',
  profileAnswers: data.profile_answers ?? {},
  aiEnabled: Boolean(data.ai_enabled),
  aiLastReview: data.ai_last_review ?? {},
}

}

/**
 * Upsert the user's latest content into user_documents.
 */
export async function saveLatestContent(userId, updates) {
  if (!userId) throw new Error('Missing userId')

  const payload = {
    user_id: userId,
    cv: updates?.cv ?? '',
    cover_letter: updates?.coverLetter ?? '',
    resume_draft: updates?.resumeDraft ?? {},
    selected_theme_id: updates?.selectedThemeId ?? 'even',
    profile_answers: updates.profileAnswers ?? {},
    ai_enabled: updates.aiEnabled ?? false,
    ai_last_review: updates.aiLastReview ?? {},

  }

  const { data, error } = await supabase
    .from('user_documents')
    .upsert(payload, { onConflict: 'user_id' })
    .select('cv, cover_letter, resume_draft, selected_theme_id, profile_answers, ai_enabled, ai_last_review')
    .single()

  if (error) throw error

  return {
    cv: data.cv ?? '',
    coverLetter: data.cover_letter ?? '',
    resumeDraft: data.resume_draft ?? {},
    selectedThemeId: data.selected_theme_id ?? 'even',
    profileAnswers: data.profile_answers ?? {},
    aiEnabled: Boolean(data.ai_enabled),
    aiLastReview: data.ai_last_review ?? {},
  }
}
