<template>
  <AppShell
    v-if="route.meta.navSection === 'main'"
    :auth="auth"
    :current-nav-key="currentNavKey"
    :current-screen="currentScreen"
    :initial-search-query="currentSearchQuery"
    :navigation-items="navigationItems"
    @navigate="navigate"
    @open-login="openLogin"
    @open-mypage="openMyPage"
    @logout="handleLogout"
    @search="searchAuctions"
  >
    <RouterView />
  </AppShell>

  <RouterView v-else />
  <AppToast />
  <NotificationToastStack />
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import AppShell from './components/AppShell.vue'
import NotificationToastStack from './components/NotificationToastStack.vue'
import AppToast from './components/shared/AppToast.vue'
import { useAuth } from './composables/useAuth'
import { useNotificationCenter } from './composables/useNotificationCenter'
import { navigationItems } from './data/marketplaceData'

const route = useRoute()
const router = useRouter()
const { auth, initializeAuth, logout } = useAuth()

const currentNavKey = computed(() => String(route.meta.navKey ?? ''))
const currentScreen = computed(() => String(route.name ?? ''))
const currentSearchQuery = computed(() => String(route.query.q || ''))

function hasAdminAuthority(authorities = auth.authorities) {
  if (!Array.isArray(authorities)) return false
  return authorities.some((authority) => {
    const normalized = String(authority || '').toUpperCase()
    return normalized === 'ROLE_ADMIN' || normalized === 'ADMIN'
  })
}

const { initializeNotificationCenter, shutdownNotificationCenter } = useNotificationCenter()

onMounted(async () => {
  await initializeAuth()

  if (auth.isAuthenticated) {
    await initializeNotificationCenter()
  }

  if (
    auth.isAuthenticated
    && auth.status === 'PENDING'
    && !hasAdminAuthority()
    && !['profile-setup', 'auth-callback', 'login', 'admin-login'].includes(String(route.name || ''))
  ) {
    router.replace({
      name: 'profile-setup',
      query: { redirect: route.fullPath },
    })
  }
})

watch(
  () => auth.isAuthenticated,
  (isAuthenticated) => {
    if (isAuthenticated) {
      void initializeNotificationCenter()
      return
    }

    shutdownNotificationCenter({ clear: true })
  },
)



function navigate(path) {
  if (typeof path === 'string' && path) {
    router.push(path)
  }
}

function searchAuctions(query) {
  const keyword = String(query || '').trim()

  if (!keyword) {
    return
  }

  router.push({
    name: 'auction-search',
    query: { q: keyword },
  })
}

function openLogin() {
  router.push('/login')
}

function openMyPage() {
  if (!auth.isAuthenticated) {
    router.push('/login')
    return
  }

  router.push('/mypage')
}

async function handleLogout() {
  shutdownNotificationCenter({ clear: true })
  await logout()
  window.location.reload()
}

</script>
