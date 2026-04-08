<template>
  <section class="page-header-block">
    <h1>입찰 내역</h1>
  </section>

  <section class="filter-bar">
    <div class="filter-chips">
      <button
        v-for="tag in filterTags"
        :key="tag.value"
        class="chip"
        :class="{ active: selectedTag === tag.value }"
        type="button"
        @click="selectedTag = tag.value"
      >
        {{ tag.label }}
      </button>
    </div>
    <v-text-field
      v-model="searchQuery"
      class="page-search-field"
      density="comfortable"
      hide-details
      placeholder="상품명으로 검색"
      prepend-inner-icon="mdi-magnify"
      variant="solo"
    />
  </section>

  <div class="bid-history-list">
    <ProductBidCard
      v-for="item in filteredBidItems"
      :key="item.id ?? `${item.date}-${item.status}-${item.name}`"
      :item="item"
      @open-detail="$emit('open-detail', item)"
    />
  </div>

  <div ref="loadMoreTarget" class="load-more-sentinel">
    <span v-if="loading">불러오는 중...</span>
    <span v-else-if="!hasNext && items.length">마지막 입찰 내역입니다.</span>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import ProductBidCard from '../cards/ProductBidCard.vue'

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
})

const emit = defineEmits(['load-more', 'open-detail'])

const ALL_TAG = '__ALL__'
const statusFilterTags = ['경매 예정', '경매 진행 중', '경매 종료', '경매 취소']
const loadMoreTarget = ref(null)
const selectedTag = ref(ALL_TAG)
const searchQuery = ref('')
let observer = null

const filterTags = computed(() => [
  { label: '전체', value: ALL_TAG },
  ...statusFilterTags.map((status) => ({
    label: status,
    value: status,
  })),
])

const filteredBidItems = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()

  return props.items.filter((item) => {
    const matchesTag = selectedTag.value === ALL_TAG || item.status === selectedTag.value
    const matchesSearch = !keyword || item.name.toLowerCase().includes(keyword)
    return matchesTag && matchesSearch
  })
})

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

watch(
  () => [props.items.length, props.hasNext, props.loading],
  () => {
    nextTick(handleScroll)
  },
)
</script>
