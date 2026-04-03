<script setup>
defineProps({
  assets: {
    type: Object,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="detail-left">
    <div class="detail-image-card">
      <img :src="assets.listWatchImage" :alt="item.title" class="detail-image" />
      <button type="button" class="gallery-arrow gallery-arrow-left">‹</button>
      <button type="button" class="gallery-arrow gallery-arrow-right">›</button>
    </div>

    <div class="inspection-banner">
      <div class="inspection-icon">✓</div>
      <div>
        <strong>{{ item.inspectionLabel }}</strong>
        <p>{{ item.inspectionDescription }}</p>
      </div>
    </div>
  </div>
</template>
