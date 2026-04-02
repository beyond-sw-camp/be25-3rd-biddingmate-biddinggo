<script setup>
defineProps({
  assets: {
    type: Object,
    required: true,
  },
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
})

defineEmits(['navigate', 'open-mypage'])
</script>

<template>
  <div class="page-shell">
    <aside class="sidebar">
      <div class="brand-block">
        <h1 class="brand-title">Biddinggo</h1>
        <p class="brand-subtitle">BIDDINGMATE</p>
      </div>

      <nav class="navigation" aria-label="메인 메뉴">
        <button
          v-for="item in navigationItems"
          :key="item.label"
          type="button"
          class="nav-item"
          :class="{ 'is-active': currentNavKey === item.key || (!currentNavKey && currentScreen === item.key) }"
          @click="$emit('navigate', item.route ?? item.key)"
        >
          <img :src="item.icon" :alt="item.label" class="nav-icon" />
          <span>{{ item.label }}</span>
        </button>
      </nav>
    </aside>

    <div class="main-area">
      <header class="topbar">
        <div class="search-box">
          <img :src="assets.searchIcon" alt="" class="search-icon" />
          <span>어떤 경매를 찾으시나요?</span>
        </div>

        <div class="top-links">
          <button type="button" @click="$emit('open-mypage')">마이페이지</button>
          <button type="button">알림</button>
          <button type="button">로그인/회원가입</button>
        </div>
      </header>

      <main class="content">
        <slot />
      </main>
    </div>
  </div>
</template>
