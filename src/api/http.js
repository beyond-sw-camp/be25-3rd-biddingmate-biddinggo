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
  return response.json().catch(() => null)
}

export async function request(path, options = {}) {
  const target = `${API_BASE_URL}${path}`
  let response

  try {
    response = await fetch(target, {
      credentials: 'include',
      ...options,
    })
  } catch (error) {
    throw new Error(`요청 실패: ${target} 에 연결하지 못했습니다.`)
  }

  const body = await readBody(response)
  const contentType = String(response.headers.get('content-type') || '').toLowerCase()

  if (response.ok && contentType.includes('text/html')) {
    throw new Error('API 대신 HTML이 반환되었습니다. VITE_API_BASE_URL 설정을 확인해주세요.')
  }

  if (!response.ok) {
    throw new Error(body?.message || '요청 처리 중 오류가 발생했습니다.')
  }

  return body
}

export function unwrap(data) {
  return data?.result
}
