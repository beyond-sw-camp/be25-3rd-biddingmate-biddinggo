<template>
  <article class="history-card">
    <img :src="item.image" :alt="item.name" class="history-card__thumb" />
    <div class="history-card__body">
      <div>
        <span class="status-pill">{{ item.status }}</span>
        <h3>{{ item.name }}</h3>
        <p class="history-card__meta">{{ item.time }}</p>
      </div>
      <div class="history-card__pricebox">
        <p>현재가</p>
        <strong>{{ item.currentPrice }}</strong>
        <p>내 입찰가</p>
        <strong>{{ item.myBid }}</strong>
        <span>{{ item.date }}</span>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
