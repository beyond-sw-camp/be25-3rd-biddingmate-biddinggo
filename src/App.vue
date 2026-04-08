<template>
  <AppShell
    v-if="route.meta.navSection === 'main'"
    :auth="auth"
    :current-nav-key="currentNavKey"
    :current-screen="currentScreen"
    :navigation-items="navigationItems"
    @navigate="navigate"
    @open-login="openLogin"
    @open-mypage="openMyPage"
    @logout="handleLogout"
  >
    <RouterView />
  </AppShell>

  <RouterView v-else />
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import AppShell from './components/AppShell.vue'
import { useAuth } from './composables/useAuth'
import { navigationItems } from './data/marketplaceData'

const route = useRoute()
const router = useRouter()
const { auth, initializeAuth, logout } = useAuth()

const currentNavKey = computed(() => String(route.meta.navKey ?? ''))
const currentScreen = computed(() => String(route.name ?? ''))

onMounted(async () => {
  await initializeAuth()

  if (
    auth.isAuthenticated
    && auth.status === 'PENDING'
    && !['profile-setup', 'auth-callback', 'login'].includes(String(route.name || ''))
  ) {
    router.replace({
      name: 'profile-setup',
      query: { redirect: route.fullPath },
    })
  }
})

function navigate(path) {
  if (typeof path === 'string' && path) {
    router.push(path)
  }
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
  await logout()
  window.location.reload()
}
</script>
