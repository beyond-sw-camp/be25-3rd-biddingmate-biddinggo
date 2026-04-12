<template>
  <div class="app-shell">
    <aside
      ref="sidebarRef"
      class="sidebar"
      :class="{ 'sidebar--scrolling': isSidebarScrolling }"
      @scroll="handleSidebarScroll"
    >
      <button class="brand-block app-shell__brand" type="button" @click="$emit('navigate', '/')">
        <strong>Biddinggo</strong>
        <span>BIDDINGMATE</span>
      </button>

      <nav class="sidebar-nav app-shell__nav" aria-label="주요 메뉴">
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
import { onBeforeUnmount, ref, computed } from 'vue'
import NotificationModal from './NotificationModal.vue'
import { useNotificationCenter } from '../composables/useNotificationCenter'

defineProps({
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

defineEmits(['navigate', 'open-login', 'open-mypage', 'logout', 'search'])

const isNotificationOpen = ref(false)
const sidebarRef = ref(null)
const isSidebarScrolling = ref(false)
let sidebarScrollTimer = null

function handleSidebarScroll() {
  if (!sidebarRef.value) {
  return username ? username.slice(0, 10) : '로그인됨'
}}

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

  isSidebarScrolling.value = true

  if (sidebarScrollTimer) {
    window.clearTimeout(sidebarScrollTimer)
  }

  sidebarScrollTimer = window.setTimeout(() => {
    isSidebarScrolling.value = false
  }, 240)
}

onBeforeUnmount(() => {
  if (sidebarScrollTimer) {
    window.clearTimeout(sidebarScrollTimer)
  }
})
</script>
