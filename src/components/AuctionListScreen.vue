<script setup>
import AuctionCard from './AuctionCard.vue'

defineProps({
  assets: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
})

defineEmits(['openDetail'])
</script>

<template>
  <section class="list-screen">
    <div class="category-column">
      <button
        v-for="(item, index) in categories"
        :key="`${item.label}-${index}`"
        type="button"
        class="category-button"
        :class="[
          { 'is-active': item.active },
          item.indent === 1 ? 'is-indent-1' : '',
          item.indent === 2 ? 'is-indent-2' : '',
        ]"
      >
        {{ item.label }}
      </button>
    </div>

    <div class="list-column">
      <div class="list-toolbar">
        <div class="list-search">
          <img :src="assets.listSearchIcon" alt="" class="list-search-icon" />
          <span>상품명, 브랜드 검색</span>
        </div>

        <button type="button" class="sort-button">
          최신순
          <img :src="assets.sortChevronIcon" alt="" />
        </button>
      </div>

      <div class="list-grid">
        <AuctionCard
          v-for="(item, index) in items"
          :key="`${item.title}-${index}`"
          :clock-icon="assets.clockIcon"
          :heart-icon="assets.heartIcon"
          :image-src="assets.listWatchImage"
          :item="item"
          @select="$emit('openDetail', $event)"
        />
      </div>
    </div>
  </section>
</template>
