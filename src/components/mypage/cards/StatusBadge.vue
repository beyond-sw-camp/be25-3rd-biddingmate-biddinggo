<template>
  <span class="status-badge" :class="`status-badge--${tone}`">{{ normalizedLabel }}</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})

const normalizedStatusMap = {
  거래완료: '거래 완료',
  판매완료: '판매 완료',
  배송중: '배송 중',
}

const statusToneMap = {
  '경매 예정': 'pending',
  '경매 진행 중': 'progress',
  '경매 종료': 'success',
  '경매 취소': 'danger',
  '발송 준비': 'pending',
  '발송 대기': 'pending',
  '답변 대기': 'pending',
  '배송 중': 'active',
  '입찰 실패': 'danger',
  '거래 완료': 'success',
  '판매 완료': 'success',
  '배송 완료': 'success',
  '구매 확정': 'success',
  '정산 완료': 'success',
  '답변 완료': 'success',
}

const normalizedLabel = computed(() => normalizedStatusMap[props.status] ?? props.status)
const tone = computed(() => statusToneMap[normalizedLabel.value] ?? 'default')
</script>
