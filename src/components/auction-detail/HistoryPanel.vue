<script setup>
import SectionHeader from '../shared/SectionHeader.vue'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})

defineEmits(['view-all'])
</script>

<template>
  <div class="history-panel">
    <SectionHeader
      action-class="history-view-all"
      action-label="View All"
      title="입찰 기록"
      title-class="history-heading"
      wrapper-class="history-header"
      @action="$emit('view-all')"
    />
    <div class="history-list">
      <div v-for="(row, index) in item.history" :key="`${row.bidder}-${index}`" class="history-row">
        <span>{{ row.bidder }}</span>
        <strong>{{ row.amount }}</strong>
        <span>{{ row.date }}</span>
      </div>
    </div>
  </div>
</template>
