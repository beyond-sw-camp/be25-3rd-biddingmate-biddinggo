<template>
  <div class="app-shell">
    <aside class="sidebar">
      <button class="brand-block app-shell__brand" type="button" @click="$emit('navigate', '/')">
        <strong>Biddinggo</strong>
        <span>BIDDINGMATE</span>
      </button>

      <nav class="sidebar-nav app-shell__nav" aria-label="메인 메뉴">
        <button
          v-for="item in navigationItems"
          :key="item.label"
          type="button"
          class="sidebar-link app-shell__nav-link"
          :class="{ active: currentNavKey === item.key || (!currentNavKey && currentScreen === item.key) }"
          @click="$emit('navigate', item.route ?? item.key)"
        >
          <span
            class="app-shell__nav-icon"
            :style="{ '--nav-icon-url': `url(${item.icon})` }"
            aria-hidden="true"
          ></span>
          <span>{{ item.label }}</span>
        </button>
      </nav>
    </aside>

    <div class="content-shell">
      <header class="topbar">
        <form class="topbar-search-field topbar-search" role="search" @submit.prevent="submitSearch">
          <img :src="searchIcon" alt="" class="topbar-search__icon" />
          <input
            v-model.trim="searchQuery"
            type="search"
            placeholder="어떤 경매를 찾으시나요?"
            aria-label="경매 검색"
          />
        </form>

        <div class="topbar-links">
          <button class="topbar-link-button" type="button" @click="$emit('open-mypage')">마이페이지</button>
          <button class="topbar-link-button topbar-link-button--icon" type="button" @click="isNotificationOpen = true">
            <span>알림</span>
            <span v-if="unreadBadgeLabel" class="topbar-notification-badge">{{ unreadBadgeLabel }}</span>
          </button>
          <template v-if="auth.isAuthenticated">
            <span class="topbar-auth-label">{{ displayUsername }}</span>
            <button class="topbar-link-button" type="button" @click="$emit('logout')">로그아웃</button>
          </template>
          <button v-else class="topbar-link-button" type="button" @click="$emit('open-login')">로그인/회원가입</button>
        </div>
      </header>

      <main class="page-area">
        <slot />
      </main>
    </div>

    <NotificationModal :open="isNotificationOpen" @close="isNotificationOpen = false" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import NotificationModal from './NotificationModal.vue'
import { useNotificationCenter } from '../composables/useNotificationCenter'

const searchIcon = 'https://www.figma.com/api/mcp/asset/43c34f06-dced-42d0-9368-8ac16f87d2f7'

const props = defineProps({
  currentScreen: {
    type: String,
    required: true,
  },
  currentNavKey: {
    type: String,
    default: '',
  },
  navigationItems: {
    type: Array,
    required: true,
  },
  auth: {
    type: Object,
    required: true,
  },
  initialSearchQuery: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['navigate', 'open-login', 'open-mypage', 'logout', 'search'])

const isNotificationOpen = ref(false)
const searchQuery = ref(String(props.initialSearchQuery || ''))
const displayUsername = computed(() => {
  const username = String(props.auth.nickname || props.auth.name || props.auth.username || '').trim()

  return username ? username.slice(0, 10) : '로그인됨'
})

const { unreadCount } = useNotificationCenter()

const unreadBadgeLabel = computed(() => {
  const count = Number(unreadCount.value || 0)
  if (count <= 0) return ''
  return String(Math.min(count, 99))
})

function submitSearch() {
  if (!searchQuery.value) {
    return
  }

  emit('search', searchQuery.value)
}

watch(
  () => props.initialSearchQuery,
  (next) => {
    searchQuery.value = String(next || '')
  },
  { immediate: true },
)
</script>
