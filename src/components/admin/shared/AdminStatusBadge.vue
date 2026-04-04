<template>
  <span class="admin-status-badge" :class="badgeClass">{{ status }}</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})

const toneMap = {
  '거래 완료': 'complete',
  '발송 대기': 'pending',
  '배송 중': 'shipping',
  '배송 완료': 'delivered',
  '답변 완료': 'answered',
  '답변 대기': 'waiting',
}

const badgeClass = computed(() => `admin-status-badge--${toneMap[props.status] ?? 'default'}`)
</script>
