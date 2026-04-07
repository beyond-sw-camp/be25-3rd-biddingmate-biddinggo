import { reactive, readonly } from 'vue'

const STORAGE_KEY = 'biddinggo.auth.session'

const state = reactive({
  initialized: false,
  isAuthenticated: false,
  accessToken: '',
  type: 'Bearer',
  memberId: null,
  username: '',
  authorities: [],
  issuedAt: 0,
  expiredAt: 0,
})

function normalizeAuthorities(authorities) {
  if (!Array.isArray(authorities)) {
    return []
  }

  return authorities
    .map((authority) => {
      if (typeof authority === 'string') {
        return authority
      }

      return authority?.authority || authority?.role || ''
    })
    .filter(Boolean)
}

function readStoredSession() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)

    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function persistSession() {
  if (typeof window === 'undefined') {
    return
  }

  if (!state.accessToken) {
    window.localStorage.removeItem(STORAGE_KEY)
    return
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      accessToken: state.accessToken,
      type: state.type,
      memberId: state.memberId,
      username: state.username,
      authorities: state.authorities,
      issuedAt: state.issuedAt,
      expiredAt: state.expiredAt,
    }),
  )
}

function applySession(snapshot = {}) {
  const source = snapshot && typeof snapshot === 'object' ? snapshot : {}

  state.accessToken = String(source.accessToken || '').trim()
  state.type = String(source.type || 'Bearer')
  state.memberId = source.memberId === null || source.memberId === undefined ? null : Number(source.memberId)
  state.username = String(source.username || '')
  state.authorities = normalizeAuthorities(source.authorities)
  state.issuedAt = Number(source.issuedAt || 0)
  state.expiredAt = Number(source.expiredAt || 0)
  state.isAuthenticated = Boolean(state.accessToken)
}

applySession(readStoredSession())

export const authState = readonly(state)

export function getAccessToken() {
  return state.accessToken
}

export function setSession(loginResponse = {}) {
  applySession({
    accessToken: loginResponse.accessToken ?? state.accessToken,
    type: loginResponse.type ?? state.type,
    memberId: loginResponse.memberId ?? state.memberId,
    username: loginResponse.username ?? state.username,
    authorities: loginResponse.authorities ?? state.authorities,
    issuedAt: loginResponse.issuedAt ?? state.issuedAt,
    expiredAt: loginResponse.expiredAt ?? state.expiredAt,
  })
  state.initialized = true
  persistSession()
}

export function setUserInfo(userInfo = {}) {
  state.memberId = userInfo.memberId === null || userInfo.memberId === undefined ? state.memberId : Number(userInfo.memberId)
  state.username = String(userInfo.username || state.username || '')
  state.authorities = normalizeAuthorities(userInfo.role ?? state.authorities)
  state.isAuthenticated = Boolean(state.accessToken)
  state.initialized = true
  persistSession()
}

export function clearSession() {
  applySession()
  state.initialized = true
  persistSession()
}

export function markInitialized() {
  state.initialized = true
}
