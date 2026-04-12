<template>
  <div class="app-shell">
    <aside class="sidebar">
      <RouterLink class="brand-block" to="/mypage">
        <strong>Biddinggo</strong>
        <span>BIDDINGMATE</span>
      </RouterLink>

      <nav class="sidebar-nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.route"
          :to="item.route"
          class="sidebar-link"
          :class="{ active: $route.path === item.route }"
        >
          <span class="sidebar-link__dot"></span>
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>

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
        <slot />
      </main>
    </div>

    <NotificationModal :open="isNotificationOpen" @close="isNotificationOpen = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { navItems } from '../../data/mypage'
import NotificationModal from '../NotificationModal.vue'
import { useNotificationCenter } from '../../composables/useNotificationCenter'

const isNotificationOpen = ref(false)
const { unreadCount } = useNotificationCenter()

const unreadBadgeLabel = computed(() => {
  const count = Number(unreadCount.value || 0)
  if (count <= 0) return ''
  return String(Math.min(count, 99))
})
</script>
