<script setup>
import { computed, ref, watch } from 'vue'
import AuctionCard from './AuctionCard.vue'

const props = defineProps({
  assets: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  showCategories: {
    type: Boolean,
    default: true,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  currentPage: {
    type: Number,
    default: 1,
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
  selectedSortKey: {
    type: String,
    default: 'latest',
  },
  sortOptions: {
    type: Array,
    default: () => [],
  },
  wishlistProcessingIds: {
    type: Object,
    default: () => new Set(),
  },
  toolbarSearchText: {
    type: String,
    default: '상품명, 브랜드 검색',
  },
  toolbarSearchValue: {
    type: String,
    default: '',
  },
  totalPages: {
    type: Number,
    default: 1,
  },
})

const emit = defineEmits(['changePage', 'openDetail', 'selectCategory', 'selectSort', 'submitSearch', 'toggleCategory', 'toggleWishlist'])
const searchKeyword = ref(props.toolbarSearchValue)

const effectiveSortOptions = computed(() => (
  props.sortOptions.length
    ? props.sortOptions
    : [{ key: 'latest', label: props.selectedSortLabel }]
))

watch(
  () => props.toolbarSearchValue,
  (value) => {
    searchKeyword.value = value
  },
)

function selectSort(option) {
  emit('selectSort', option)
}

function submitSearch() {
  emit('submitSearch', searchKeyword.value.trim())
}

function updatePage(page) {
  emit('changePage', page)
}
</script>

<template>
  <section class="list-screen" :class="{ 'is-search-mode': !showCategories }">
    <div v-if="showCategories" class="category-column">
      <button
        v-for="item in categories"
        :key="item.id"
        type="button"
        class="category-button"
        :class="[
          { 'is-active': item.active },
          { 'is-disabled': !item.selectable && !item.hasChildren },
          { 'is-branch': item.hasChildren },
          { 'is-expanded': item.hasChildren && item.expanded },
          item.depth === 1 ? 'is-indent-1' : '',
          item.depth === 2 ? 'is-indent-2' : '',
        ]"
        :disabled="!item.selectable && !item.hasChildren"
        :aria-expanded="item.hasChildren ? item.expanded : undefined"
        @click="item.hasChildren ? $emit('toggleCategory', item) : $emit('selectCategory', item)"
      >
        <span>{{ item.label }}</span>
        <span
          v-if="item.hasChildren"
          class="category-toggle-icon"
          :class="{ 'is-expanded': item.expanded }"
          aria-hidden="true"
        >
          ›
        </span>
      </button>
    </div>

    <div class="list-column" :class="{ 'is-full': !showCategories }">
      <div class="list-toolbar">
        <form class="list-search" role="search" @submit.prevent="submitSearch">
          <v-icon icon="mdi-magnify" class="list-search-icon" size="18" />
          <input
            v-model="searchKeyword"
            type="search"
            class="list-search-input"
            :placeholder="toolbarSearchText"
          />
        </form>

        <v-menu location="bottom end" offset="12">
          <template #activator="{ props: menuProps }">
            <button class="sort-menu__trigger" type="button" v-bind="menuProps">
              <span>{{ selectedSortLabel }}</span>
              <v-icon icon="mdi-chevron-down" />
            </button>
          </template>
          <div class="sort-menu__panel">
            <button
              v-for="option in effectiveSortOptions"
              :key="option.key"
              type="button"
              class="sort-menu__item"
              :class="{ 'sort-menu__item--active': option.key === selectedSortKey }"
              @click="selectSort(option)"
            >
              {{ option.label }}
            </button>
          </div>
        </v-menu>
      </div>

      <p v-if="errorMessage" class="feedback-strip is-error">{{ errorMessage }}</p>
      <p v-else-if="loading" class="feedback-strip">경매 목록을 불러오는 중입니다.</p>
      <div v-else-if="items.length" class="list-grid">
        <AuctionCard
          v-for="(item, index) in items"
          :key="`${item.title}-${index}`"
          :heart-icon="assets.heartIcon"
          :image-src="assets.listWatchImage"
          :item="item"
          :wishlist-processing="wishlistProcessingIds.has(item.auctionId)"
          @select="$emit('openDetail', $event)"
          @toggle-wishlist="$emit('toggleWishlist', $event)"
        />
      </div>
      <p v-else class="feedback-strip">조건에 맞는 경매가 없습니다.</p>

      <div class="list-pagination">
        <v-pagination
          :length="totalPages"
          :model-value="currentPage"
          active-color="primary"
          density="comfortable"
          rounded="circle"
          total-visible="7"
          @update:model-value="updatePage"
        />
      </div>
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
  border-radius: 14px;
  background: #fff;
  padding: 14px 15px;
  color: #64748b;
  font-size: 11px;
  text-align: center;
}

.feedback-strip.is-error {
  background: #fef2f2;
  color: #b91c1c;
}

.list-pagination {
  display: flex;
  justify-content: center;
  margin-top: 28px;
}

.list-pagination :deep(.v-pagination__item),
.list-pagination :deep(.v-pagination__prev),
.list-pagination :deep(.v-pagination__next) {
  color: #23008d;
  font-weight: 700;
}

.list-pagination :deep(.v-btn) {
  border: 1px solid rgba(35, 0, 141, 0.18);
  background: #f4f0ff;
  box-shadow: none;
}

.list-pagination :deep(.v-pagination__item--is-active .v-btn) {
  border-color: #23008d;
  background: #23008d;
  color: #fff;
}

.list-pagination :deep(.v-pagination__item--is-active .v-btn__overlay) {
  opacity: 0;
}

.list-pagination :deep(.v-btn:hover) {
  border-color: #23008d;
  background: #e7defd;
}

.list-pagination :deep(.v-pagination__item--is-active .v-btn:hover) {
  background: #1b006e;
}
</style>
