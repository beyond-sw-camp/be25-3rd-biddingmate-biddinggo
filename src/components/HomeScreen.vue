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
})

defineEmits(['openDetail', 'openList'])
</script>

<template>
  <div>
    <section class="hero-section">
      <img :src="assets.heroBackground" alt="" class="hero-background" />
      <div class="hero-overlay"></div>

      <div class="hero-copy">
        <h2>
          대한민국 경매,<br />
          한 곳에서 확인하세요
        </h2>
        <p>
          실시간으로 진행되는 프리미엄 아이템 경매. Biddinggo<br />
          에서 가장 빠르고 안전하게 비딩을 시작하세요.
        </p>
        <button type="button" class="hero-button" @click="$emit('openList')">지금 둘러보기</button>
      </div>
    </section>

    <section class="best-section">
      <div class="section-heading">
        <h3>Best Items</h3>
        <p>현재 가장 인기 있는 경매</p>
      </div>

      <div class="card-grid">
        <AuctionCard
          v-for="(item, index) in items"
          :key="`${item.title}-${index}`"
          :clock-icon="assets.clockIcon"
          :heart-icon="assets.heartIcon"
          :image-src="assets.watchImage"
          :item="item"
          @select="$emit('openDetail', $event)"
        />
      </div>
    </section>
  </div>
</template>
