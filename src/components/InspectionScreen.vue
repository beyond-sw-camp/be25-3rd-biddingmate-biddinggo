<script setup>
import AuctionCard from './AuctionCard.vue'

defineProps({
  assets: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  summary: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="inspection-screen">
    <div class="inspection-header">
      <div>
        <h2>검수 물품 리스트 조회</h2>
        <p>검수 상태를 확인하고 등록 가능한 상품을 관리하세요.</p>
      </div>
      <button type="button" class="inspection-action">검수 신청하기</button>
    </div>

    <div class="inspection-summary-grid">
      <article
        v-for="item in summary"
        :key="item.label"
        class="inspection-summary-card"
        :class="`is-${item.tone}`"
      >
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
      </article>
    </div>

    <div class="inspection-card-grid">
      <AuctionCard
        v-for="(item, index) in items"
        :key="`${item.title}-${index}`"
        :heart-icon="assets.heartIcon"
        :image-src="assets.listWatchImage"
        :item="item"
        price-label="예상 시작가"
        :show-clock="false"
        :show-live-tag="false"
      />
    </div>
  </section>
</template>
