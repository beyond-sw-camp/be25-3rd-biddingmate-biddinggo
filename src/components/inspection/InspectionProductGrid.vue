<script setup>
defineProps({
  assets: {
    type: Object,
    required: true,
  },
  badgeClass: {
    type: Function,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
})

defineEmits(['open-detail'])
</script>

<template>
  <div class="inspection-card-grid">
    <article
      v-for="(item, index) in items"
      :key="`${item.title}-${index}`"
      class="inspection-product-card"
      @click="$emit('open-detail', item)"
    >
      <div class="inspection-product-image-wrap">
        <img :src="assets.listWatchImage" :alt="item.title" class="inspection-product-image" />
        <span class="inspection-badge" :class="badgeClass(item.status)">
          {{ item.status }}
        </span>
      </div>

      <div class="inspection-product-body">
        <h3>{{ item.title }}</h3>
        <div class="inspection-product-meta">
          <div>
            <span>검수 등급</span>
            <strong>{{ item.inspectionGrade }}</strong>
          </div>
          <span>{{ item.inspectionDate }}</span>
        </div>
      </div>
    </article>
  </div>
</template>
