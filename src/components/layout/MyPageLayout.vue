<template>
  <div class="app-shell">
    <MyPageSidebar />

    <div class="content-shell">
      <header class="topbar">
        <v-text-field
          class="topbar-search-field"
          density="comfortable"
          hide-details
          placeholder="어떤 경매를 찾으시나요?"
          prepend-inner-icon="mdi-magnify"
          variant="solo"
        />

        <div class="topbar-links">
          <RouterLink to="/mypage">마이페이지</RouterLink>
          <button class="topbar-link-button topbar-link-button--icon" type="button" @click="isNotificationOpen = true">
            <span>알림</span>
            <span v-if="unreadBadgeLabel" class="topbar-notification-badge">{{ unreadBadgeLabel }}</span>
          </button>
          <a href="/">로그인/회원가입</a>
        </div>
      </header>

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
import MyPageSidebar from './MyPageSidebar.vue'
import { RouterLink } from 'vue-router'
import { useNotificationCenter } from '../../composables/useNotificationCenter'

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
const { unreadCount } = useNotificationCenter()

const unreadBadgeLabel = computed(() => {
  const count = Number(unreadCount.value || 0)
  if (count <= 0) return ''
  return String(Math.min(count, 99))
})
</script>
