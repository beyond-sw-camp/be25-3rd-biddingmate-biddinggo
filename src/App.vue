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

  <AppToast />
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import AppShell from './components/AppShell.vue'
import AppToast from './components/shared/AppToast.vue'
import { useAuth } from './composables/useAuth'
import { navigationItems } from './data/marketplaceData'

const route = useRoute()
const router = useRouter()
const { auth, initializeAuth, logout } = useAuth()

const currentNavKey = computed(() => String(route.meta.navKey ?? ''))
const currentScreen = computed(() => String(route.name ?? ''))

onMounted(() => {
  initializeAuth()
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

  if (String(route.path).startsWith('/mypage')) {
    router.push('/')
  }
}
</script>
