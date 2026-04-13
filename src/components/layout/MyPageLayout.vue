<template>
  <div class="app-shell">
    <MyPageSidebar />

    <div class="content-shell">
      <header class="topbar">
        <form class="topbar-search-field topbar-search" role="search" @submit.prevent="submitSearch">
          <button type="submit" class="topbar-search__button" aria-label="경매 검색">
            <v-icon icon="mdi-magnify" class="topbar-search__icon" aria-hidden="true" />
          </button>
          <input
            v-model.trim="searchQuery"
            type="search"
            placeholder="어떤 경매를 찾으시나요?"
            aria-label="경매 검색"
            @keydown.enter.prevent="submitSearch"
          />
        </form>

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
import { computed, ref, watch } from 'vue'
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
const searchQuery = ref(currentSearchQuery.value)

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

function submitSearch() {
  searchAuctions(searchQuery.value)
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

watch(
  currentSearchQuery,
  (next) => {
    searchQuery.value = String(next || '')
  },
  { immediate: true },
)
</script>
