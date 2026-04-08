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
  const displayName = computed(() => authState.nickname || authState.name || authState.username || '?뚯썝')

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
      throw new Error('濡쒓렇???좏겙???놁뒿?덈떎. ?ㅼ떆 ?쒕룄?댁＜?몄슂.')
    }

    setSession({ accessToken, type: 'Bearer' })

    try {
      await syncCurrentUser()

      try {
        const loginResponse = await refreshAccessToken()
        setSession(loginResponse)
      } catch {
        // refresh 荑좏궎媛 ?꾩쭅 ?녿뜑?쇰룄 access token留뚯쑝濡?利됱떆 ?뚯뒪?몃뒗 媛?ν븯??
      }

      return authState
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

