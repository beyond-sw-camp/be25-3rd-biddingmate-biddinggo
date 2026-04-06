import { computed } from 'vue'
import { buildSocialLoginUrl, checkAuthStatus, logoutAuth, refreshAccessToken } from '../api/auth'
import {
  authState,
  clearSession,
  getAccessToken,
  markInitialized,
  setSession,
  setUserInfo,
} from '../lib/authSession'

let initializePromise = null

async function syncCurrentUser() {
  const userInfo = await checkAuthStatus()
  setUserInfo(userInfo)

  return userInfo
}

async function restoreSessionFromRefresh() {
  const loginResponse = await refreshAccessToken()
  setSession(loginResponse)
  await syncCurrentUser()

  return true
}

export function useAuth() {
  const displayName = computed(() => authState.username || '회원')

  async function initializeAuth() {
    if (authState.initialized) {
      return authState.isAuthenticated
    }

    if (initializePromise) {
      return initializePromise
    }

    initializePromise = (async () => {
      try {
        if (getAccessToken()) {
          try {
            await syncCurrentUser()
            return true
          } catch {
            await restoreSessionFromRefresh()
            return true
          }
        }

        await restoreSessionFromRefresh()
        return true
      } catch {
        clearSession()
        markInitialized()
        return false
      } finally {
        initializePromise = null
      }
    })()

    return initializePromise
  }

  async function completeLoginFromCallback(accessToken) {
    if (!accessToken) {
      throw new Error('로그인 토큰이 없습니다. 다시 시도해주세요.')
    }

    setSession({ accessToken, type: 'Bearer' })

    try {
      await syncCurrentUser()

      try {
        const loginResponse = await refreshAccessToken()
        setSession(loginResponse)
      } catch {
        // refresh 쿠키가 아직 없더라도 access token만으로 즉시 테스트는 가능하다.
      }

      return true
    } catch (error) {
      clearSession()
      throw error
    }
  }

  function startLogin(provider = 'kakao') {
    window.location.assign(buildSocialLoginUrl(provider))
  }

  async function logout() {
    try {
      await logoutAuth()
    } finally {
      clearSession()
      markInitialized()
    }
  }

  return {
    auth: authState,
    displayName,
    initializeAuth,
    completeLoginFromCallback,
    startLogin,
    logout,
  }
}
