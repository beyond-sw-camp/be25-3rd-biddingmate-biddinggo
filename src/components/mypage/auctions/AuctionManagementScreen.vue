<template>
  <MyPageLayout>
    <section class="page-header-inline">
      <h1>경매 관리</h1>
      <button class="primary-button" type="button">+ 경매 등록하기</button>
    </section>

    <section class="stats-grid">
      <SurfaceCard as="article" v-for="card in auctionSummary" :key="card.label" class="stat-card">
        <span class="stat-card__icon"></span>
        <div>
          <p>{{ card.label }}</p>
          <strong>{{ card.value }}</strong>
        </div>
      </SurfaceCard>
    </section>

    <section class="filter-bar">
      <div class="filter-chips">
        <button class="chip active" type="button">전체</button>
        <button class="chip" type="button">경매 진행 중</button>
        <button class="chip" type="button">낙찰</button>
        <button class="chip" type="button">유찰</button>
      </div>
      <div class="search-box compact">
        <v-icon class="search-box__icon" icon="mdi-magnify" />
        <input type="text" placeholder="상품명 또는 브랜드 검색" />
      </div>
    </section>

    <div class="grid-list">
      <ProductGridCard v-for="(item, index) in auctionItems" :key="item.name + index" :item="item" />
    </div>
  </MyPageLayout>
</template>

<script setup>
import SurfaceCard from '../../SurfaceCard.vue'
import MyPageLayout from '../../layout/MyPageLayout.vue'
import ProductGridCard from '../cards/ProductGridCard.vue'
import { auctionItems, auctionSummary } from '../../../data/mypage'
</script>
