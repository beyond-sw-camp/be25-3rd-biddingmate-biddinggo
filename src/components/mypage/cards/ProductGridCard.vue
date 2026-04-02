<template>
  <SurfaceCard as="article" class="product-grid-card" :class="{ highlighted: item.highlighted }">
    <div class="product-grid-card__image-wrap">
      <span v-if="item.tag" class="deal-tag">{{ item.tag }}</span>
      <img :src="item.image" :alt="item.name" class="product-grid-card__image" />
      <button class="wish-button" type="button" aria-label="찜하기">
        <v-icon icon="mdi-heart-outline" />
      </button>
    </div>

    <div class="product-grid-card__content">
      <h3>{{ item.name }}</h3>
      <p class="price-label">현재 입찰가</p>
      <strong>{{ item.currentPrice }}</strong>
      <div class="product-grid-card__meta">
        <span>{{ item.bidCount }}</span>
        <p>|</p>
        <v-icon icon="mdi-alarm" />
        <span>{{ item.time }}</span>
      </div>
    </div>
  </SurfaceCard>
</template>

<script setup>
import SurfaceCard from '../../SurfaceCard.vue'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
