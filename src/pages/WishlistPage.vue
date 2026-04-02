<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>관심 경매 내역</h1>
    </section>

    <section class="filter-bar">
      <div class="search-box compact">
        <span>⌕</span>
        <input type="text" placeholder="상품명, 브랜드 검색" />
      </div>
      <button class="sort-button" type="button">최신순</button>
    </section>

    <div class="grid-list">
      <ProductGridCard v-for="(item, index) in favoriteItems" :key="item.name + index" :item="item" />
    </div>
  </MyPageLayout>
</template>

<script setup>
import MyPageLayout from '../components/MyPageLayout.vue'
import ProductGridCard from '../components/ProductGridCard.vue'
import { favoriteItems } from '../data/mypage'
</script>
