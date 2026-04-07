<script setup>
import { computed } from 'vue'
import { getGradeBadge } from '../../utils/gradeBadge'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

defineEmits(['open-inquiry', 'open-seller'])

const sellerGradeBadge = computed(() => getGradeBadge(props.item?.sellerGrade))
</script>

<template>
  <div class="seller-card">
    <div class="seller-meta">
      <div class="seller-avatar">
        <img v-if="item.sellerAvatar" :src="item.sellerAvatar" :alt="item.seller" />
        <span v-else>{{ item.seller?.slice(0, 1) || '판' }}</span>
      </div>
      <div class="seller-info">
        <button type="button" class="seller-name-button" @click="$emit('open-seller')">
          {{ item.seller }}
        </button>
        <img
          v-if="sellerGradeBadge"
          :src="sellerGradeBadge"
          :alt="`${item.sellerGrade} 등급`"
          class="seller-grade-image"
        />
        <span v-else class="seller-grade">{{ item.sellerGrade }}</span>
      </div>
    </div>
    <button type="button" class="seller-button" @click="$emit('open-inquiry')">문의 하기</button>
  </div>
</template>
