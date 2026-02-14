const AUTH_KEY = 'lowcvmaker_auth_user'
const USERS_KEY = 'lowcvmaker_users'
const DOCS_KEY = 'lowcvmaker_docs'

const authListeners = new Set()
let currentAuthUser = readJson(AUTH_KEY, null)

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function notifyAuth() {
  authListeners.forEach((listener) => listener(currentAuthUser))
}

function setAuthUser(user) {
  currentAuthUser = user
  if (user) {
    writeJson(AUTH_KEY, user)
  } else {
    localStorage.removeItem(AUTH_KEY)
  }
  notifyAuth()
  return user
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function normalizeUsername(username) {
  return String(username || '').trim()
}

function validateUsername(username) {
  const normalizedUsername = normalizeUsername(username)

  if (!normalizedUsername) {
    throw new Error('Username is required.')
  }

  if (normalizedUsername.length < 3) {
    throw new Error('Username must be at least 3 characters long.')
  }

  if (!/^[a-zA-Z0-9_.]+$/.test(normalizedUsername)) {
    throw new Error('Username can only contain letters, numbers, underscore, and dot.')
  }

  return normalizedUsername
}

function getUsers() {
  return readJson(USERS_KEY, {})
}

function setUsers(users) {
  writeJson(USERS_KEY, users)
}

function getDocsMap() {
  return readJson(DOCS_KEY, {})
}

function setDocsMap(map) {
  writeJson(DOCS_KEY, map)
}

function buildUserId(provider, email) {
  const normalized = normalizeEmail(email)
  return normalized ? `${provider}:${normalized}` : `${provider}:${Date.now()}`
}

export function watchAuthState(listener) {
  authListeners.add(listener)
  listener(currentAuthUser)
  return () => {
    authListeners.delete(listener)
  }
}

export async function signUpWithEmail(username, email, password) {
  const normalizedUsername = validateUsername(username)
  const normalizedEmail = normalizeEmail(email)
  const normalizedPassword = String(password || '')

  if (!normalizedEmail || !normalizedPassword) {
    throw new Error('Email and password are required.')
  }

  const users = getUsers()
  if (users[normalizedEmail]) {
    throw new Error('Account already exists for this email.')
  }

  const user = {
    id: buildUserId('email', normalizedEmail),
    provider: 'email',
    email: normalizedEmail,
    username: normalizedUsername,
  }

  users[normalizedEmail] = {
    email: normalizedEmail,
    password: normalizedPassword,
    username: normalizedUsername,
    user,
  }
  setUsers(users)

  return setAuthUser(user)
}

export async function logInWithEmail(email, password) {
  const normalizedEmail = normalizeEmail(email)
  const normalizedPassword = String(password || '')

  if (!normalizedEmail || !normalizedPassword) {
    throw new Error('Email and password are required.')
  }

  const users = getUsers()
  const account = users[normalizedEmail]

  if (!account || account.password !== normalizedPassword) {
    throw new Error('Invalid email or password.')
  }

  const loggedInUser = {
    ...account.user,
    username: account.username || account.user?.username || null,
  }

  return setAuthUser(loggedInUser)
}

export async function signInWithGoogle() {
  const user = {
    id: buildUserId('google', `user-${Date.now()}@google.local`),
    provider: 'google',
    email: null,
    username: null,
  }
  return setAuthUser(user)
}

export async function signInWithApple() {
  const user = {
    id: buildUserId('apple', `user-${Date.now()}@apple.local`),
    provider: 'apple',
    email: null,
    username: null,
  }
  return setAuthUser(user)
}

export async function loadLatestContent(userId) {
  const docsMap = getDocsMap()
  return docsMap[userId] || { cv: '', coverLetter: '' }
}

export async function saveLatestContent(userId, updates) {
  const docsMap = getDocsMap()
  const previous = docsMap[userId] || { cv: '', coverLetter: '' }
  const next = {
    ...previous,
    ...updates,
  }

  docsMap[userId] = next
  setDocsMap(docsMap)
  return next
}

export async function logOut() {
  setAuthUser(null)
}
