<template>
  <div class="app-shell admin-layout">
    <aside class="sidebar admin-layout__sidebar">
      <RouterLink class="brand-block" to="/admin/transactions">
        <strong>Biddinggo</strong>
        <span>BIDDINGMATE</span>
      </RouterLink>

      <nav class="sidebar-nav admin-layout__nav" aria-label="관리자 메뉴">
        <RouterLink
          v-for="item in adminNavItems"
          :key="item.key"
          :to="item.route"
          class="sidebar-link admin-layout__link"
          :class="{ active: isActive(item.route) }"
        >
          <span class="sidebar-link__dot"></span>
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>

    <div class="content-shell">
      <header class="topbar admin-layout__topbar">
        <button class="topbar-link-button" type="button">로그아웃</button>
      </header>

      <main class="page-area admin-layout__page">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { adminNavItems } from '../../data/admin'

const route = useRoute()

function isActive(targetRoute) {
  return route.path === targetRoute
}
</script>
