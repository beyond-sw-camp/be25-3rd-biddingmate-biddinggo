<template>
  <SurfaceCard as="article" class="history-card">
    <img :src="item.image" :alt="item.name" class="history-card__thumb" />
    <div class="history-card__body">
      <div class="history-card__content">
        <StatusBadge :status="item.status" />
        <h3>{{ item.name }}</h3>
        <div class="history-card__time">
          <v-icon icon="mdi-alarm" />
          <p class="history-card__meta">{{ item.time }}</p>
        </div>
      </div>
      <div class="history-card__pricebox">
        <p>현재가</p>
        <strong>{{ item.currentPrice }}</strong>
        <p>내 입찰가</p>
        <strong>{{ item.myBid }}</strong>
        <span>{{ item.date }}</span>
      </div>
    </div>
  </SurfaceCard>
</template>

<script setup>
import SurfaceCard from '../../SurfaceCard.vue'
import StatusBadge from './StatusBadge.vue'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
