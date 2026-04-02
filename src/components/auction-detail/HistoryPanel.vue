<script setup>
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
    <div class="history-header">
      <div class="history-heading">입찰 기록</div>
      <button type="button" class="history-view-all" @click="$emit('view-all')">View All</button>
    </div>
    <div class="history-list">
      <div v-for="(row, index) in item.history" :key="`${row.bidder}-${index}`" class="history-row">
        <span>{{ row.bidder }}</span>
        <strong>{{ row.amount }}</strong>
        <span>{{ row.date }}</span>
      </div>
    </div>
  </div>
</template>
