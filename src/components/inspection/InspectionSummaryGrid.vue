<script setup>
defineProps({
  summary: {
    type: Array,
    required: true,
  },
  summaryIcon: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <div class="inspection-summary-grid">
    <article
      v-for="item in summary"
      :key="item.label"
      class="inspection-summary-card"
    >
      <div class="inspection-summary-icon" :class="`is-${item.tone}`">
        {{ summaryIcon(item.label) }}
      </div>
      <div class="inspection-summary-copy">
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
      </div>
    </article>
  </div>
</template>
