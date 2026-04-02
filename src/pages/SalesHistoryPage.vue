<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>판매 내역</h1>
    </section>

    <div class="stack-list">
      <StatusRowCard v-for="item in salesStatusItems" :key="item.date + item.status" :item="item" />
    </div>
  </MyPageLayout>
</template>

<script setup>
import MyPageLayout from '../components/MyPageLayout.vue'
import StatusRowCard from '../components/StatusRowCard.vue'
import { salesStatusItems } from '../data/mypage'
</script>
