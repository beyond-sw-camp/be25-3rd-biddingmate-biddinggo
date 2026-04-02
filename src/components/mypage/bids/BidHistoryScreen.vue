<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>입찰 내역</h1>
    </section>

    <div class="stack-list">
      <ProductBidCard v-for="item in bidItems" :key="item.date + item.status" :item="item" />
    </div>
  </MyPageLayout>
</template>

<script setup>
import MyPageLayout from '../../MyPageLayout.vue'
import ProductBidCard from '../cards/ProductBidCard.vue'
import { bidItems } from '../../../data/mypage'
</script>

