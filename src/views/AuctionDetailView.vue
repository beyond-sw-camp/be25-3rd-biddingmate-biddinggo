<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAuctionDetail } from '../api/auctions'
import { getAuctionInquiryList } from '../api/auctionInquiries'
import { getAuctionBids } from '../api/bids'
import { getSellerReviews } from '../api/reviews'
import { createWishlist, deleteWishlist, getWishlistStatus } from '../api/wishlists'
import AuctionDetailScreen from '../components/AuctionDetailScreen.vue'
import { assets } from '../data/marketplaceData'
import { authState } from '../lib/authSession'
import { normalizeAuctionDetail } from '../utils/marketplace'

const route = useRoute()
const router = useRouter()
const errorMessage = ref('')
const item = ref(null)
const loading = ref(false)
const wishlistProcessing = ref(false)

async function loadAuctionDetail(auctionId) {
  if (!auctionId) {
    item.value = null
    errorMessage.value = '경매 정보를 찾을 수 없습니다.'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const detail = await getAuctionDetail(auctionId)
    const [bidResponse, inquiryResponse, sellerReviewResponse, wishlistStatusResponse] = await Promise.allSettled([
      getAuctionBids(auctionId, { page: 1, size: 20 }),
      getAuctionInquiryList(auctionId, { page: 1, size: 20 }),
      detail?.sellerId ? getSellerReviews(detail.sellerId, { page: 1, size: 3 }) : Promise.resolve({ content: [] }),
      authState.isAuthenticated ? getWishlistStatus(auctionId) : Promise.resolve({ wished: false }),
    ])

    item.value = normalizeAuctionDetail(detail, {
      bidHistory: bidResponse.status === 'fulfilled' ? bidResponse.value?.content || [] : [],
      inquiries: inquiryResponse.status === 'fulfilled' ? inquiryResponse.value?.content || [] : [],
      sellerReviews: sellerReviewResponse.status === 'fulfilled' ? sellerReviewResponse.value?.content || [] : [],
      wishlistStatus: wishlistStatusResponse.status === 'fulfilled' ? wishlistStatusResponse.value : { wished: false },
    })
  } catch (error) {
    item.value = null
    errorMessage.value = error?.message || '경매 상세 정보를 불러오지 못했습니다.'
  } finally {
    loading.value = false
  }
}

async function toggleWishlist() {
  if (!item.value?.auctionId || wishlistProcessing.value) {
    return
  }

  if (!authState.isAuthenticated) {
    router.push('/login')
    return
  }

  wishlistProcessing.value = true

  try {
    if (item.value.isWished) {
      await deleteWishlist(item.value.auctionId)
      item.value = {
        ...item.value,
        isWished: false,
        wishCount: Math.max(Number(item.value.wishCount || 0) - 1, 0),
      }
      return
    }

    await createWishlist(item.value.auctionId)
    item.value = {
      ...item.value,
      isWished: true,
      wishCount: Number(item.value.wishCount || 0) + 1,
    }
  } catch (error) {
    errorMessage.value = error?.message || '찜 처리에 실패했습니다.'
  } finally {
    wishlistProcessing.value = false
  }
}

function backToList() {
  router.push('/auctions')
}

watch(
  () => route.params.id,
  (value) => {
    loadAuctionDetail(String(value || ''))
  },
  { immediate: true },
)
</script>

<template>
  <AuctionDetailScreen
    :assets="assets"
    :error-message="errorMessage"
    :item="item"
    :loading="loading"
    :wishlist-processing="wishlistProcessing"
    @back="backToList"
    @refresh="loadAuctionDetail(String(route.params.id || ''))"
    @toggle-wishlist="toggleWishlist"
  />
</template>
