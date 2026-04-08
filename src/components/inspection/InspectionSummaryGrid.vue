<script setup>
const summaryIcons = {
  total: 'https://www.figma.com/api/mcp/asset/d0fac2d5-25e7-4240-bfaa-d3bd7893bea2',
  review: 'https://www.figma.com/api/mcp/asset/1a6f1ea2-4466-47b9-8bf4-f7e9e316503a',
  approve: 'https://www.figma.com/api/mcp/asset/eb90a267-5c24-4c23-8c5f-c71fd3f48e1e',
  auction: 'https://www.figma.com/api/mcp/asset/5f7d33d8-7be5-4161-9609-79376f14e630',
}

defineProps({
  summary: {
    type: Array,
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
        <img :src="summaryIcons[item.tone]" :alt="item.label" class="inspection-summary-icon-image" />
      </div>
      <div class="inspection-summary-copy">
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
      </div>
    </article>
  </div>
</template>
