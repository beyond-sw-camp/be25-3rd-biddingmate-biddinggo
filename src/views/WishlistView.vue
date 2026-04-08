<template>
  <WishlistScreen
    :has-next="hasNext"
    :items="wishlistItems"
    :loading="loading"
    @load-more="loadMoreWishlists"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getUserWishlists } from '../api/users'
import noImage from '../assets/no-image.svg'
import WishlistScreen from '../components/mypage/wishlists/WishlistScreen.vue'

const wishlistItems = ref([])
const hasNext = ref(true)
const loading = ref(false)
const page = ref(1)
const pageSize = 10

const statusLabels = {
  PENDING: '경매 예정',
  ON_GOING: '경매 진행 중',
  ENDED: '경매 종료',
  CANCELLED: '경매 취소',
}

function formatAmount(value) {
  return `${Number(value || 0).toLocaleString('ko-KR')} 원`
}

function formatRemainingTime(endDate) {
  if (!endDate) {
    return ''
  }

  const endTime = new Date(endDate).getTime()

  if (Number.isNaN(endTime)) {
    return ''
  }

  const remainingMilliseconds = endTime - Date.now()

  if (remainingMilliseconds <= 0) {
    return '종료'
  }

  if (remainingMilliseconds < 60000) {
    return '1분 미만'
  }

  const remainingMinutes = Math.ceil(remainingMilliseconds / 60000)
  const days = Math.floor(remainingMinutes / 1440)
  const hours = Math.floor((remainingMinutes % 1440) / 60)
  const minutes = remainingMinutes % 60

  if (days > 0) {
    return `${days}일 ${hours}시간`
  }

  if (hours > 0) {
    return `${hours}시간 ${minutes}분`
  }

  return `${minutes}분`
}

function normalizeWishlistItem(item = {}) {
  const price = item.buyNowPrice || item.startPrice

  return {
    id: item.auctionId,
    auctionId: item.auctionId,
    bidCount: `입찰 ${Number(item.bidCount || 0).toLocaleString('ko-KR')}회`,
    brand: item.brand || '',
    currentPrice: formatAmount(price),
    createdAt: item.createdAt,
    deadlineMinutes: Number.MAX_SAFE_INTEGER,
    highlighted: item.status === 'ON_GOING',
    image: item.representativeImageUrl || noImage,
    interestCount: Number(item.wishCount || 0),
    itemId: item.itemId,
    name: [item.brand, item.name].filter(Boolean).join(' ') || `상품 #${item.itemId}`,
    numericPrice: Number(price || 0),
    status: item.status,
    tag: statusLabels[item.status] || item.status || '',
    time: formatRemainingTime(item.endDate),
    type: item.type,
  }
}

async function loadMoreWishlists() {
  if (loading.value || !hasNext.value) {
    return
  }

  const requestedPage = page.value
  loading.value = true

  try {
    const response = await getUserWishlists({
      page: requestedPage,
      size: pageSize,
      order: 'ASC',
      sortBy: 'CREATED_AT',
    })
    const content = response?.content || []
    const existingIds = new Set(wishlistItems.value.map((item) => item.id))
    const nextItems = content.map(normalizeWishlistItem).filter((item) => !existingIds.has(item.id))

    wishlistItems.value = [...wishlistItems.value, ...nextItems]
    page.value += 1
    hasNext.value = typeof response?.hasNext === 'boolean'
      ? response.hasNext
      : requestedPage < Number(response?.totalPages ?? requestedPage)
  } catch {
    hasNext.value = false
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMoreWishlists()
})
</script>
