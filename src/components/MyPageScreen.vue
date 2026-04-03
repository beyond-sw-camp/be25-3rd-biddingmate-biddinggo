<script setup>
import MyPageBidSection from './mypage/MyPageBidSection.vue'
import MyPageProfileCard from './mypage/MyPageProfileCard.vue'
import MyPagePurchaseSection from './mypage/MyPagePurchaseSection.vue'

const props = defineProps({
  assets: {
    type: Object,
    required: true,
  },
  profile: {
    type: Object,
    required: true,
  },
  bidItems: {
    type: Array,
    required: true,
  },
  purchaseItems: {
    type: Array,
    required: true,
  },
})

function purchaseBadgeClass(status) {
  return status === '거래완료' ? 'is-complete' : 'is-waiting'
}
</script>

<template>
  <section class="mypage-screen">
    <header class="mypage-header">
      <h2>마이페이지</h2>
    </header>

    <MyPageProfileCard :assets="assets" :profile="profile" />
    <MyPageBidSection :assets="assets" :items="bidItems" />
    <MyPagePurchaseSection :items="purchaseItems" :purchase-badge-class="purchaseBadgeClass" />
  </section>
</template>
