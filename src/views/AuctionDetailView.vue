<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAuctionDetail } from '../api/auctions'
import { getAuctionInquiryList } from '../api/auctionInquiries'
import { getAuctionBids } from '../api/bids'
import { getSellerReviews } from '../api/reviews'
import AuctionDetailScreen from '../components/AuctionDetailScreen.vue'
import { assets } from '../data/marketplaceData'
import { normalizeAuctionDetail } from '../utils/marketplace'

const route = useRoute()
const router = useRouter()
const errorMessage = ref('')
const item = ref(null)
const loading = ref(false)

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
    const [bidResponse, inquiryResponse, sellerReviewResponse] = await Promise.allSettled([
      getAuctionBids(auctionId, { page: 1, size: 20 }),
      getAuctionInquiryList(auctionId, { page: 1, size: 20 }),
      detail?.sellerId ? getSellerReviews(detail.sellerId, { page: 1, size: 3 }) : Promise.resolve({ content: [] }),
    ])

    item.value = normalizeAuctionDetail(detail, {
      bidHistory: bidResponse.status === 'fulfilled' ? bidResponse.value?.content || [] : [],
      inquiries: inquiryResponse.status === 'fulfilled' ? inquiryResponse.value?.content || [] : [],
      sellerReviews: sellerReviewResponse.status === 'fulfilled' ? sellerReviewResponse.value?.content || [] : [],
    })
  } catch (error) {
    item.value = null
    errorMessage.value = error?.message || '경매 상세 정보를 불러오지 못했습니다.'
  } finally {
    loading.value = false
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
    @back="backToList"
    @refresh="loadAuctionDetail(String(route.params.id || ''))"
  />
</template>
