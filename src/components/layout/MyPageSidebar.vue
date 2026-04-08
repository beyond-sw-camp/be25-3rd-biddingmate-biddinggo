<template>
  <aside class="sidebar">
    <RouterLink class="brand-block" to="/">
      <strong>Biddinggo</strong>
      <span>BIDDINGMATE</span>
    </RouterLink>

    <nav class="sidebar-nav" aria-label="마이페이지 메뉴">
      <RouterLink
        v-for="item in navItems"
        :key="item.route"
        :to="item.route"
        class="sidebar-link"
        :class="{ active: isActive(item.route) }"
      >
        <span class="sidebar-link__dot"></span>
        {{ item.label }}
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { navItems } from '../../data/mypage'

const route = useRoute()

function isActive(targetRoute) {
  return route.path === targetRoute
}
</script>
