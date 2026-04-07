<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuctionList } from '../api/auctions'
import { createWishlist, deleteWishlist, getWishlistStatus } from '../api/wishlists'
import HomeScreen from '../components/HomeScreen.vue'
import { assets } from '../data/marketplaceData'
import { authState } from '../lib/authSession'
import { normalizeAuctionCard } from '../utils/marketplace'

const router = useRouter()
const homeItems = ref([])
const loading = ref(false)
const errorMessage = ref('')
const wishlistProcessingIds = ref(new Set())

function updateAuctionWishlistState(auctionId, patch) {
  homeItems.value = homeItems.value.map((item) => (
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

async function loadHomeAuctions() {
  loading.value = true
  errorMessage.value = ''

  try {
    const page = await getAuctionList({
      page: 1,
      size: 4,
      sortBy: 'CREATED_AT',
      status: 'ON_GOING',
      order: 'DESC',
    })

    const nextItems = (page?.content || []).map(normalizeAuctionCard)
    homeItems.value = nextItems
    await hydrateWishlistStatuses(nextItems)
  } catch (error) {
    homeItems.value = []
    errorMessage.value = error?.message || '메인 경매를 불러오지 못했습니다.'
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

function openList() {
  router.push('/auctions')
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

onMounted(() => {
  loadHomeAuctions()
})
</script>

<template>
  <HomeScreen
    :assets="assets"
    :error-message="errorMessage"
    :items="homeItems"
    :loading="loading"
    :wishlist-processing-ids="wishlistProcessingIds"
    @open-detail="openDetail"
    @open-list="openList"
    @toggle-wishlist="toggleWishlist"
  />
</template>
