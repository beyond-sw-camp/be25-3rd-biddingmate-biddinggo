<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>마이페이지</h1>
    </section>

    <section class="hero-card hero-card--center">
      <div class="hero-user">
        <img :src="overviewUser.avatar" :alt="overviewUser.name" class="avatar avatar--small" />
        <strong>{{ overviewUser.name }}</strong>
      </div>
      <div class="hero-points">
        <p>보유 포인트</p>
        <strong>{{ overviewUser.points }}</strong>
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <h2>입찰 내역</h2>
        <RouterLink to="/mypage/bids">View All</RouterLink>
      </div>
      <div class="stack-list">
        <ProductBidCard v-for="item in bidItems.slice(0, 2)" :key="item.date + item.status" :item="item" />
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <h2>진행 중 구매 현황</h2>
        <RouterLink to="/mypage/purchases">View All</RouterLink>
      </div>
      <div class="stack-list">
        <StatusRowCard v-for="item in purchaseStatusItems.slice(0, 2)" :key="item.date + item.status" :item="item" :muted="item.status === '발송 대기'" />
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <h2>진행 중 판매 현황</h2>
        <RouterLink to="/mypage/sales">View All</RouterLink>
      </div>
      <div class="stack-list">
        <StatusRowCard v-for="item in salesStatusItems.slice(0, 2)" :key="item.date + item.status" :item="item" :muted="item.status === '발송 대기'" />
      </div>
    </section>
  </MyPageLayout>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import MyPageLayout from '../components/MyPageLayout.vue'
import ProductBidCard from '../components/ProductBidCard.vue'
import StatusRowCard from '../components/StatusRowCard.vue'
import { bidItems, overviewUser, purchaseStatusItems, salesStatusItems } from '../data/mypage'
</script>
