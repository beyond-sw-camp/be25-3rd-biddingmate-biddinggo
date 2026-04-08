<script setup>
import AuctionCard from './AuctionCard.vue'

defineProps({
  assets: {
    type: Object,
    required: true,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  wishlistProcessingIds: {
    type: Object,
    default: () => new Set(),
  },
})

defineEmits(['openDetail', 'openList', 'toggleWishlist'])
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

      <p v-if="errorMessage" class="feedback-strip is-error">{{ errorMessage }}</p>
      <p v-else-if="loading" class="feedback-strip">메인 경매를 불러오는 중입니다.</p>
      <div v-else-if="items.length" class="card-grid">
        <AuctionCard
          v-for="(item, index) in items"
          :key="`${item.title}-${index}`"
          :clock-icon="assets.clockIcon"
          :heart-icon="assets.heartIcon"
          :image-src="assets.watchImage"
          :item="item"
          :wishlist-processing="wishlistProcessingIds.has(item.auctionId)"
          @select="$emit('openDetail', $event)"
          @toggle-wishlist="$emit('toggleWishlist', $event)"
        />
      </div>
      <p v-else class="feedback-strip">현재 노출할 경매가 없습니다.</p>
    </section>
  </div>
</template>

<style scoped>
.feedback-strip {
  margin: 0;
  border-radius: 18px;
  background: #f8fafc;
  padding: 18px 20px;
  color: #64748b;
  font-size: 14px;
  text-align: center;
}

.feedback-strip.is-error {
  background: #fef2f2;
  color: #b91c1c;
}
</style>
