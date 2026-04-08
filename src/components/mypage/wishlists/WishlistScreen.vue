<template>
  <section class="page-header-block">
    <h1>관심 경매 내역</h1>
  </section>

  <section class="filter-bar wishlist-filter-bar">
    <v-text-field
      v-model="searchQuery"
      class="wishlist-search-field"
      density="comfortable"
      hide-details
      placeholder="상품명 또는 경매 번호 검색"
      prepend-inner-icon="mdi-magnify"
      variant="solo"
    />

    <v-menu location="bottom end" offset="12">
      <template #activator="{ props: menuProps }">
        <button class="sort-menu__trigger" type="button" v-bind="menuProps">
          <span>{{ currentSortLabel }}</span>
          <v-icon icon="mdi-chevron-down" />
        </button>
      </template>

      <div class="sort-menu__panel">
        <button
          v-for="option in sortOptions"
          :key="option.value"
          class="sort-menu__item"
          :class="{ 'sort-menu__item--active': sortOption === option.value }"
          type="button"
          @click="sortOption = option.value"
        >
          {{ option.label }}
        </button>
      </div>
    </v-menu>
  </section>

  <div class="list-grid mypage-auction-card-grid">
    <AuctionCard
      v-for="item in filteredFavoriteItems"
      :key="item.id"
      :clock-icon="clockIcon"
      :heart-icon="heartIcon"
      :image-src="noImage"
      :item="item"
      :wishlist-processing="wishlistProcessingIds.has(item.auctionId)"
      @click="openDetail(item)"
      @select="openDetail"
      @toggle-wishlist="toggleWishlist"
    />
  </div>

  <div ref="loadMoreTarget" class="load-more-sentinel">
    <span v-if="loading">관심 경매를 불러오는 중입니다.</span>
    <span v-else-if="!hasNext && items.length">마지막 관심 경매입니다.</span>
    <span v-else-if="!items.length">관심 경매가 없습니다.</span>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import AuctionCard from '../../AuctionCard.vue'
import noImage from '../../../assets/no-image.svg'

const props = defineProps({
  hasNext: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  wishlistProcessingIds: {
    type: Object,
    default: () => new Set(),
  },
})

const emit = defineEmits(['load-more', 'open-detail', 'toggle-wishlist'])
const searchQuery = ref('')
const sortOption = ref('latest')
const loadMoreTarget = ref(null)
const clockIcon = 'https://www.figma.com/api/mcp/asset/4ef495a0-f919-4c28-9d20-c5dfe3e99e93'
const heartIcon = 'https://www.figma.com/api/mcp/asset/64e7d0cd-6ebd-4492-a951-2b0ca40524d2'
let observer = null

const sortOptions = [
  { value: 'latest', label: '최신순' },
  { value: 'interest', label: '관심순' },
  { value: 'price-desc', label: '높은 가격순' },
  { value: 'price-asc', label: '낮은 가격순' },
  { value: 'deadline', label: '마감 임박순' },
]

const currentSortLabel = computed(() => {
  return sortOptions.find((option) => option.value === sortOption.value)?.label ?? '최신순'
})

const filteredFavoriteItems = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()

  const searchedItems = props.items.filter((item) => {
    return !keyword
      || item.title.toLowerCase().includes(keyword)
      || String(item.auctionId || '').includes(keyword)
  })

  return [...searchedItems].sort((left, right) => {
    switch (sortOption.value) {
      case 'interest':
        return right.interestCount - left.interestCount
      case 'price-desc':
        return right.numericPrice - left.numericPrice
      case 'price-asc':
        return left.numericPrice - right.numericPrice
      case 'deadline':
        return left.deadlineMinutes - right.deadlineMinutes
      case 'latest':
      default:
        return Number(right.id || 0) - Number(left.id || 0)
    }
  })
})

function openDetail(item) {
  emit('open-detail', item)
}

function toggleWishlist(item) {
  emit('toggle-wishlist', item)
}

function requestLoadMore() {
  if (props.hasNext && !props.loading) {
    emit('load-more')
  }
}

function handleScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const viewportHeight = window.innerHeight
  const scrollHeight = document.documentElement.scrollHeight

  if (scrollTop + viewportHeight >= scrollHeight - 160) {
    requestLoadMore()
  }
}

watch(
  () => [props.items.length, props.hasNext, props.loading],
  () => nextTick(handleScroll),
)

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        requestLoadMore()
      }
    },
    { rootMargin: '160px' },
  )

  if (loadMoreTarget.value) {
    observer.observe(loadMoreTarget.value)
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  nextTick(handleScroll)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', handleScroll)
})
</script>
