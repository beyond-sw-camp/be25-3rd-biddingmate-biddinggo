<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuctionList } from '../api/auctions'
import { getCategoryList } from '../api/categories'
import AuctionListScreen from '../components/AuctionListScreen.vue'
import { assets } from '../data/marketplaceData'
import { buildCategoryTreeItems, getFallbackCategories, normalizeCategoryRows } from '../utils/category'
import { normalizeAuctionCard } from '../utils/marketplace'

const router = useRouter()
const categoryRows = ref([])
const errorMessage = ref('')
const expandedCategoryIds = ref(new Set())
const items = ref([])
const loading = ref(false)
const selectedCategoryId = ref(null)
const selectedSort = ref('CREATED_AT')

const categories = computed(() => buildCategoryTreeItems(categoryRows.value, selectedCategoryId.value, expandedCategoryIds.value))
const selectedSortLabel = computed(() => (selectedSort.value === 'WISH_COUNT' ? '인기순' : '최신순'))

async function loadCategories() {
  try {
    const response = await getCategoryList()
    const rows = response?.categories || response || []
    categoryRows.value = normalizeCategoryRows(Array.isArray(rows) && rows.length ? rows : getFallbackCategories())
  } catch {
    categoryRows.value = normalizeCategoryRows(getFallbackCategories())
  }

  expandedCategoryIds.value = new Set(
    categoryRows.value
      .filter((category) => category.hasChildren)
      .map((category) => Number(category.id)),
  )
}

async function loadAuctionList() {
  loading.value = true
  errorMessage.value = ''

  try {
    const page = await getAuctionList({
      page: 1,
      size: 12,
      sortBy: selectedSort.value,
      status: 'ON_GOING',
      order: 'DESC',
      categoryId: selectedCategoryId.value,
    })

    items.value = (page?.content || []).map(normalizeAuctionCard)
  } catch (error) {
    items.value = []
    errorMessage.value = error?.message || '경매 목록을 불러오지 못했습니다.'
  } finally {
    loading.value = false
  }
}

function openDetail(item) {
  if (!item?.auctionId) {
    return
  }

  router.push(`/auctions/${item.auctionId}`)
}

function selectCategory(category) {
  if (category?.hasChildren) {
    toggleCategory(category)
    return
  }

  selectedCategoryId.value = Number(category?.id || 0) || null
  loadAuctionList()
}

function toggleCategory(category) {
  if (!category?.hasChildren) {
    return
  }

  const next = new Set(expandedCategoryIds.value)
  const categoryId = Number(category.id)

  if (next.has(categoryId)) {
    next.delete(categoryId)
  } else {
    next.add(categoryId)
  }

  expandedCategoryIds.value = next
}

function toggleSort() {
  selectedSort.value = selectedSort.value === 'CREATED_AT' ? 'WISH_COUNT' : 'CREATED_AT'
  loadAuctionList()
}

onMounted(async () => {
  await loadCategories()
  await loadAuctionList()
})
</script>

<template>
  <AuctionListScreen
    :assets="assets"
    :categories="categories"
    :error-message="errorMessage"
    :items="items"
    :loading="loading"
    :selected-sort-label="selectedSortLabel"
    @open-detail="openDetail"
    @select-category="selectCategory"
    @toggle-category="toggleCategory"
    @toggle-sort="toggleSort"
  />
</template>
