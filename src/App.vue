<script setup>
import { computed } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import AppShell from './components/AppShell.vue'
import {
  assets,
  mypageNavigationItems,
  navigationItems,
} from './data/marketplaceData'

const route = useRoute()
const router = useRouter()

const activeNavigationItems = computed(() =>
  route.meta.navSection === 'mypage' ? mypageNavigationItems : navigationItems,
)

const currentNavKey = computed(() => String(route.meta.navKey ?? ''))
const currentScreen = computed(() => String(route.name ?? ''))

function navigate(path) {
  if (typeof path === 'string' && path) {
    router.push(path)
  }
}
</script>

<template>
  <AppShell
    :assets="assets"
    :current-screen="currentScreen"
    :current-nav-key="currentNavKey"
    :navigation-items="activeNavigationItems"
    @navigate="navigate"
    @open-mypage="navigate('/mypage')"
  >
    <RouterView />
  </AppShell>
</template>
