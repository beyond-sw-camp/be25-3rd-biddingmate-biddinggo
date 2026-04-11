<template>
  <div class="app-shell">
    <aside class="sidebar">
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
      <MainTopbar
        :auth="auth"
        :initial-search-query="initialSearchQuery"
        @open-login="$emit('open-login')"
        @open-mypage="$emit('open-mypage')"
        @open-notification="isNotificationOpen = true"
        @logout="$emit('logout')"
        @search="$emit('search', $event)"
      />

      <main class="page-area">
        <slot />
      </main>
    </div>

    <NotificationModal :open="isNotificationOpen" @close="isNotificationOpen = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MainTopbar from './layout/MainTopbar.vue'
import NotificationModal from './NotificationModal.vue'

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
</script>
