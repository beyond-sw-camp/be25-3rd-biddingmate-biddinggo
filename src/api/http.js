import { clearSession, getAccessToken, setSession, shouldRefreshAccessToken } from '../lib/authSession'

function deriveApiBaseUrl() {
  const explicitApiBaseUrl = String(import.meta.env.VITE_API_BASE_URL || '').trim()

  if (explicitApiBaseUrl) {
    return explicitApiBaseUrl.replace(/\/$/, '')
  }

  const proxyTarget = String(import.meta.env.VITE_DEV_PROXY_TARGET || '').trim()

  if (proxyTarget) {
    return proxyTarget.replace(/\/$/, '')
  }

  return ''
}

export const API_BASE_URL = deriveApiBaseUrl()

let refreshPromise = null

export function buildQueryString(params = {}) {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value))
    }
  })

  const suffix = query.toString()

  return suffix ? `?${suffix}` : ''
}

async function readBody(response) {
  const contentType = String(response.headers.get('content-type') || '').toLowerCase()

  if (contentType.includes('application/json')) {
    return response.json().catch(() => null)
  }

  return response.text().catch(() => null)
}

function withAuthorizationHeader(headers = {}, auth = false) {
  if (!auth) {
    return headers
  }

  const accessToken = getAccessToken()

  if (!accessToken) {
    return headers
  }

  const hasAuthorizationHeader = Object.keys(headers).some((key) => key.toLowerCase() === 'authorization')

  if (hasAuthorizationHeader) {
    return headers
  }

  return {
    ...headers,
    Authorization: `Bearer ${accessToken}`,
  }
}

async function attemptRefreshToken() {
  if (!API_BASE_URL) {
    return false
  }

  if (!refreshPromise) {
    refreshPromise = (async () => {
      let response

      try {
        response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        })
      } catch {
        clearSession()
        return false
      }

      const body = await readBody(response)

      if (!response.ok || typeof body !== 'object' || !body?.result?.accessToken) {
        clearSession()
        return false
      }

      setSession(body.result)
      return true
    })().finally(() => {
      refreshPromise = null
    })
  }

  return refreshPromise
}

function needsCookie(path) {

  return path === '/api/v1/auth/refresh'
    || path === '/api/v1/auth/logout'
    || path === '/api/v1/auth/check'
    || path === '/api/v1/admin/auth/login'
}

async function performRequest(path, options = {}, allowRefresh = true) {
  const { auth = false, ...fetchOptions } = options
  const target = `${API_BASE_URL}${path}`
  let response

  if (auth && allowRefresh && path !== '/api/v1/auth/refresh' && shouldRefreshAccessToken()) {
    await attemptRefreshToken()
  }

  try {
    response = await fetch(target, {
      credentials: needsCookie(path) ? 'include' : 'omit',
      ...fetchOptions,
      headers: withAuthorizationHeader(fetchOptions.headers || {}, auth),
    })
  } catch {
    throw new Error(`요청 실패: ${target} 에 연결하지 못했습니다.`)
  }

  if (auth && response.status === 401 && allowRefresh && path !== '/api/v1/auth/refresh') {
    const refreshed = await attemptRefreshToken()

    if (refreshed) {
      return performRequest(path, options, false)
    }
  }

  const body = await readBody(response)
  const contentType = String(response.headers.get('content-type') || '').toLowerCase()

  if (response.ok && contentType.includes('text/html')) {
    throw new Error('API 대신 HTML이 반환되었습니다. VITE_API_BASE_URL 설정을 확인해주세요.')
  }

  if (!response.ok) {
    if (typeof body === 'object' && body?.message) {
      throw new Error(body.message)
    }

    throw new Error('요청 처리 중 오류가 발생했습니다.')
  }

  return body
}

export async function request(path, options = {}) {
  return performRequest(path, options)
}

export function unwrap(data) {
  return data?.result
}
