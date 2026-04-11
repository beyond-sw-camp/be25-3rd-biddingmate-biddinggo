<template>
  <div class="app-shell">
    <MyPageSidebar />

    <div class="content-shell">
      <MainTopbar
        :auth="auth"
        :initial-search-query="currentSearchQuery"
        @open-login="openLogin"
        @open-mypage="openMyPage"
        @open-notification="isNotificationOpen = true"
        @logout="handleLogout"
        @search="searchAuctions"
      />

      <main class="page-area">
        <RouterView />
      </main>
    </div>

    <NotificationModal :open="isNotificationOpen" @close="isNotificationOpen = false" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import NotificationModal from '../NotificationModal.vue'
import MainTopbar from './MainTopbar.vue'
import MyPageSidebar from './MyPageSidebar.vue'

const route = useRoute()
const router = useRouter()
const { auth, logout } = useAuth()
const isNotificationOpen = ref(false)

const currentSearchQuery = computed(() => String(route.query.q || ''))

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
  router.push('/mypage')
}

async function handleLogout() {
  await logout()
  router.push('/')
}
</script>
