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
  errorMessage: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  selectedSortLabel: {
    type: String,
    default: '최신순',
  },
})

defineEmits(['openDetail', 'selectCategory', 'toggleSort'])
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
          { 'is-disabled': !item.selectable },
          item.indent === 1 ? 'is-indent-1' : '',
          item.indent === 2 ? 'is-indent-2' : '',
        ]"
        :disabled="!item.selectable"
        @click="$emit('selectCategory', item)"
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

        <button type="button" class="sort-button" @click="$emit('toggleSort')">
          {{ selectedSortLabel }}
          <img :src="assets.sortChevronIcon" alt="" />
        </button>
      </div>

      <p v-if="errorMessage" class="feedback-strip is-error">{{ errorMessage }}</p>
      <p v-else-if="loading" class="feedback-strip">경매 목록을 불러오는 중입니다.</p>
      <div v-else-if="items.length" class="list-grid">
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
      <p v-else class="feedback-strip">조건에 맞는 경매가 없습니다.</p>
    </div>
  </section>
</template>

<style scoped>
.category-button.is-disabled {
  cursor: default;
  opacity: 0.56;
}

.feedback-strip {
  margin: 0;
  border-radius: 18px;
  background: #fff;
  padding: 18px 20px;
  color: #64748b;
  font-size: 14px;
  text-align: center;
}

.feedback-strip.is-error {
  background: #fef2f2;
  color: #b91c1c;
}
</style>
