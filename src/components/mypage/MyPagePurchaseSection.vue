<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  purchaseBadgeClass: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <section class="mypage-section">
    <div class="mypage-section-header">
      <h3>진행 중 구매 현황</h3>
      <button type="button">View All</button>
    </div>

    <div class="mypage-purchase-list">
      <article
        v-for="(item, index) in items"
        :key="`${item.title}-${index}`"
        class="mypage-purchase-card"
      >
        <div class="mypage-purchase-copy">
          <span class="mypage-chip" :class="purchaseBadgeClass(item.status)">{{ item.status }}</span>
          <h4>{{ item.title }}</h4>
          <p>구매자: {{ item.buyer }}</p>
        </div>

        <div class="mypage-purchase-price">
          <strong>{{ item.price }}</strong>
          <span>{{ item.date }}</span>
        </div>
      </article>
    </div>
  </section>
</template>
