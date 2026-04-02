<template>
  <article class="product-grid-card" :class="{ highlighted: item.highlighted }">
    <div class="product-grid-card__image-wrap">
      <span v-if="item.tag" class="deal-tag">{{ item.tag }}</span>
      <img :src="item.image" :alt="item.name" class="product-grid-card__image" />
      <button class="wish-button" type="button">♡</button>
    </div>
    <div class="product-grid-card__content">
      <h3>{{ item.name }}</h3>
      <p class="price-label">현재 입찰가</p>
      <strong>{{ item.currentPrice }}</strong>
      <div class="product-grid-card__meta">
        <span>{{ item.bidCount }}</span>
        <span>{{ item.time }}</span>
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
