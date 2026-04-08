<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAuctionList } from '../api/auctions'
import { getCategoryList } from '../api/categories'
import { createWishlist, deleteWishlist, getWishlistStatus } from '../api/wishlists'
import AuctionListScreen from '../components/AuctionListScreen.vue'
import { assets } from '../data/marketplaceData'
import { authState } from '../lib/authSession'
import { buildCategoryTreeItems, getFallbackCategories, normalizeCategoryRows } from '../utils/category'
import { normalizeAuctionCard } from '../utils/marketplace'

const router = useRouter()
const route = useRoute()
const categoryRows = ref([])
const errorMessage = ref('')
const expandedCategoryIds = ref(new Set())
const items = ref([])
const loading = ref(false)
const selectedCategoryId = ref(readCategoryIdFromQuery())
const wishlistProcessingIds = ref(new Set())

const sortOptions = [
  { key: 'wishlist', label: '관심순', sortBy: 'WISH_COUNT', order: 'DESC' },
  { key: 'popularity', label: '인기순', sortBy: 'POPULARITY', order: 'DESC' },
  { key: 'latest', label: '최신순', sortBy: 'CREATED_AT', order: 'DESC' },
  { key: 'oldest', label: '오래된 순', sortBy: 'CREATED_AT', order: 'ASC' },
  { key: 'price-low', label: '가격 낮은 순', sortBy: 'PRICE', order: 'ASC' },
  { key: 'price-high', label: '가격 높은 순', sortBy: 'PRICE', order: 'DESC' },
]
const selectedSortKey = ref(readSortKeyFromQuery())

const categories = computed(() => buildCategoryTreeItems(categoryRows.value, selectedCategoryId.value, expandedCategoryIds.value))
const selectedSortOption = computed(() => (
  sortOptions.find((option) => option.key === selectedSortKey.value) || sortOptions[2]
))
const selectedSortLabel = computed(() => selectedSortOption.value.label)

function readCategoryIdFromQuery() {
  const categoryId = Number(route.query.categoryId)

  return Number.isFinite(categoryId) && categoryId > 0 ? categoryId : null
}

function readSortKeyFromQuery() {
  const sortKey = String(route.query.sort || '')

  return sortOptions.some((option) => option.key === sortKey) ? sortKey : 'latest'
}

function buildListQuery({ categoryId = selectedCategoryId.value, sortKey = selectedSortKey.value } = {}) {
  const query = {}

  if (categoryId) {
    query.categoryId = categoryId
  }

  if (sortKey && sortKey !== 'latest') {
    query.sort = sortKey
  }

  return query
}

function updateAuctionWishlistState(auctionId, patch) {
  items.value = items.value.map((item) => (
    Number(item.auctionId) === Number(auctionId)
      ? { ...item, ...patch }
      : item
  ))
}

async function hydrateWishlistStatuses(auctionItems) {
  if (!authState.isAuthenticated || !auctionItems.length) {
    return
  }

  const statuses = await Promise.allSettled(
    auctionItems
      .filter((item) => item.auctionId)
      .map(async (item) => ({
        auctionId: item.auctionId,
        status: await getWishlistStatus(item.auctionId),
      })),
  )

  statuses.forEach((result) => {
    if (result.status !== 'fulfilled') {
      return
    }

    updateAuctionWishlistState(result.value.auctionId, {
      isWished: Boolean(result.value.status?.wished ?? result.value.status?.isWished ?? result.value.wished ?? result.value.isWished),
    })
  })
}

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
      sortBy: selectedSortOption.value.sortBy,
      status: 'ON_GOING',
      order: selectedSortOption.value.order,
      categoryId: selectedCategoryId.value,
    })

    const nextItems = (page?.content || []).map(normalizeAuctionCard)
    items.value = nextItems
    await hydrateWishlistStatuses(nextItems)
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

  router.push({
    name: 'auction-detail',
    params: { id: item.auctionId },
    query: buildListQuery(),
  })
}

function selectCategory(category) {
  if (category?.hasChildren) {
    toggleCategory(category)
    return
  }

  selectedCategoryId.value = Number(category?.id || 0) || null
  router.replace({
    name: 'auction-list',
    query: buildListQuery(),
  })
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

function selectSort(option) {
  if (!option?.key || selectedSortKey.value === option.key) {
    return
  }

  selectedSortKey.value = option.key
  router.replace({
    name: 'auction-list',
    query: buildListQuery(),
  })
  loadAuctionList()
}

async function toggleWishlist(item) {
  if (!item?.auctionId) {
    return
  }

  if (!authState.isAuthenticated) {
    router.push('/login')
    return
  }

  const auctionId = item.auctionId
  const nextProcessing = new Set(wishlistProcessingIds.value)

  if (nextProcessing.has(auctionId)) {
    return
  }

  nextProcessing.add(auctionId)
  wishlistProcessingIds.value = nextProcessing

  const previousState = {
    isWished: Boolean(item.isWished),
    wishCount: Number(item.wishCount || 0),
  }

  try {
    if (item.isWished) {
      updateAuctionWishlistState(auctionId, {
        isWished: false,
        wishCount: Math.max(previousState.wishCount - 1, 0),
      })
      await deleteWishlist(auctionId)
      return
    }

    updateAuctionWishlistState(auctionId, {
      isWished: true,
      wishCount: previousState.wishCount + 1,
    })
    await createWishlist(auctionId)
  } catch (error) {
    updateAuctionWishlistState(auctionId, previousState)
    errorMessage.value = error?.message || '찜 처리에 실패했습니다.'
  } finally {
    const doneProcessing = new Set(wishlistProcessingIds.value)
    doneProcessing.delete(auctionId)
    wishlistProcessingIds.value = doneProcessing
  }
}

onMounted(async () => {
  await loadCategories()
  await loadAuctionList()
})

watch(
  () => [route.query.categoryId, route.query.sort],
  () => {
    const nextCategoryId = readCategoryIdFromQuery()
    const nextSortKey = readSortKeyFromQuery()

    if (selectedCategoryId.value === nextCategoryId && selectedSortKey.value === nextSortKey) {
      return
    }

    selectedCategoryId.value = nextCategoryId
    selectedSortKey.value = nextSortKey
    loadAuctionList()
  },
)
</script>

<template>
  <AuctionListScreen
    :assets="assets"
    :categories="categories"
    :error-message="errorMessage"
    :items="items"
    :loading="loading"
    :selected-sort-key="selectedSortKey"
    :selected-sort-label="selectedSortLabel"
    :sort-options="sortOptions"
    :wishlist-processing-ids="wishlistProcessingIds"
    @open-detail="openDetail"
    @select-category="selectCategory"
    @select-sort="selectSort"
    @toggle-category="toggleCategory"
    @toggle-wishlist="toggleWishlist"
  />
</template>
