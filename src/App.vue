<template>
  <AppShell
    v-if="route.meta.navSection === 'main'"
    :current-nav-key="currentNavKey"
    :current-screen="currentScreen"
    :navigation-items="navigationItems"
    @navigate="navigate"
    @open-mypage="openMyPage"
  >
    <RouterView />
  </AppShell>

  <RouterView v-else />
</template>

<script setup>
import { computed } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import AppShell from './components/AppShell.vue'
import { navigationItems } from './data/marketplaceData'

const route = useRoute()
const router = useRouter()

const currentNavKey = computed(() => String(route.meta.navKey ?? ''))
const currentScreen = computed(() => String(route.name ?? ''))

function navigate(path) {
  if (typeof path === 'string' && path) {
    router.push(path)
  }
}

function openMyPage() {
  router.push('/mypage')
}
</script>
