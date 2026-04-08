<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { searchAuctions } from '../api/auctions'
import { createWishlist, deleteWishlist, getWishlistStatus } from '../api/wishlists'
import AuctionListScreen from '../components/AuctionListScreen.vue'
import { assets } from '../data/marketplaceData'
import { authState } from '../lib/authSession'
import { normalizeAuctionCard } from '../utils/marketplace'

const route = useRoute()
const router = useRouter()
const errorMessage = ref('')
const items = ref([])
const loading = ref(false)
const wishlistProcessingIds = ref(new Set())

const sortOptions = [{ key: 'latest', label: '최신순' }]
const selectedSortKey = ref('latest')
const selectedSortLabel = computed(() => sortOptions[0].label)
const searchQuery = computed(() => String(route.query.q || '').trim())
const toolbarSearchText = computed(() => (
  searchQuery.value ? `"${searchQuery.value}" 검색 결과` : '검색 결과'
))

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

async function loadSearchResults() {
  if (!searchQuery.value) {
    items.value = []
    errorMessage.value = '검색어를 입력해주세요.'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const page = await searchAuctions(searchQuery.value, {
      page: 1,
      size: 12,
    })
    const nextItems = (page?.content || []).map(normalizeAuctionCard)
    items.value = nextItems
    await hydrateWishlistStatuses(nextItems)
  } catch (error) {
    items.value = []
    errorMessage.value = error?.message || '검색 결과를 불러오지 못했습니다.'
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
    query: {
      from: 'search',
      q: searchQuery.value,
    },
  })
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

function noop() {}

onMounted(loadSearchResults)

watch(
  () => route.query.q,
  (next, previous) => {
    if (String(next || '') === String(previous || '')) {
      return
    }

    loadSearchResults()
  },
)
</script>

<template>
  <AuctionListScreen
    :assets="assets"
    :categories="[]"
    :error-message="errorMessage"
    :items="items"
    :loading="loading"
    :selected-sort-key="selectedSortKey"
    :selected-sort-label="selectedSortLabel"
    :show-categories="false"
    :sort-options="sortOptions"
    :toolbar-search-text="toolbarSearchText"
    :wishlist-processing-ids="wishlistProcessingIds"
    @open-detail="openDetail"
    @select-category="noop"
    @select-sort="noop"
    @toggle-category="noop"
    @toggle-wishlist="toggleWishlist"
  />
</template>
