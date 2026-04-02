<script setup>
import SectionHeader from '../shared/SectionHeader.vue'

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
</script>

<template>
  <section class="mypage-section">
    <SectionHeader
      title="입찰 내역"
      action-label="View All"
      wrapper-class="mypage-section-header"
    />

    <div class="mypage-bid-list">
      <article
        v-for="(item, index) in items"
        :key="`${item.title}-${index}`"
        class="mypage-bid-card"
      >
        <img :src="assets.mypageProductImage" :alt="item.title" class="mypage-bid-image" />

        <div class="mypage-bid-content">
          <div class="mypage-bid-copy">
            <span class="mypage-chip is-auction">{{ item.status }}</span>
            <h4>{{ item.title }}</h4>
            <div class="mypage-time">
              <img :src="assets.clockIcon" alt="" />
              <span>{{ item.time }}</span>
            </div>
          </div>

          <div class="mypage-bid-prices">
            <span>현재가</span>
            <strong>{{ item.currentPrice }}</strong>
            <span>내 입찰가</span>
            <strong>{{ item.myBidPrice }}</strong>
            <span>{{ item.date }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
