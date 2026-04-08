<template>
  <PurchaseHistoryScreen
    :error-message="errorMessage"
    :has-next="hasNext"
    :items="purchaseItems"
    :loading="loading"
    :load-detail="loadPurchaseDetail"
    :save-shipping-address="savePurchaseShippingAddress"
    @load-more="loadMorePurchases"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getUserPurchases, getWinnerDealDetail, updateWinnerDealShippingAddress } from '../api/users'
import noImage from '../assets/no-image.svg'
import PurchaseHistoryScreen from '../components/mypage/purchases/PurchaseHistoryScreen.vue'

const purchaseItems = ref([])
const hasNext = ref(true)
const loading = ref(false)
const errorMessage = ref('')
const page = ref(1)
const pageSize = 10
const defaultOffset = 1073741824

const enumStatusLabels = {
  PAID: '발송 대기',
  SHIPPED: '배송 중',
  DELIVERED: '배송 완료',
  CONFIRMED: '거래 완료',
  CANCELLED: '취소',
}

const compactStatusLabels = {
  발송대기: '발송 대기',
  배송중: '배송 중',
  배송완료: '배송 완료',
  거래완료: '거래 완료',
  취소: '취소',
}

function normalizeDealStatus(status) {
  const rawStatus = String(status || '').trim()
  const compactStatus = rawStatus.replace(/\s+/g, '')

  return enumStatusLabels[rawStatus] || compactStatusLabels[compactStatus] || rawStatus || '-'
}

function isWaitingForShipment(item = {}) {
  return normalizeDealStatus(item.status) === '발송 대기'
}

function formatAmount(value) {
  return `${Number(value || 0).toLocaleString('ko-KR')} 원`
}

function formatDate(value) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

function hasShippingAddress(item = {}) {
  return Boolean(item.recipient || item.tel || item.zipcode || item.address || item.detailAddress)
}

function hasShippingInfo(item = {}) {
  return Boolean(item.carrier || item.trackingNumber)
}

function buildShippingAddress(item = {}) {
  if (!hasShippingAddress(item)) {
    return null
  }

  return {
    name: item.recipient || '',
    phone: item.tel || '',
    zip: item.zipcode || '',
    address1: item.address || '',
    address2: item.detailAddress || '',
  }
}

function buildShippingInfo(item = {}) {
  if (!hasShippingInfo(item)) {
    return null
  }

  return {
    courier: item.carrier || '',
    trackingNumber: item.trackingNumber || '',
  }
}

function getPurchaseModalType(item = {}) {
  if (item.canRegisterShippingAddress || (isWaitingForShipment(item) && !hasShippingAddress(item))) {
    return 'pending-no-address'
  }

  if (item.canConfirmPurchase) {
    return 'delivery-complete-awaiting-confirm'
  }

  return 'readonly'
}

function normalizeWinnerDeal(item = {}) {
  return {
    id: item.winnerDealId,
    winnerDealId: item.winnerDealId,
    auctionId: item.auctionId,
    itemId: item.itemId,
    viewerRole: item.viewerRole,
    name: item.itemName || `상품 #${item.itemId}`,
    image: item.itemImageUrl || item.imageUrl || noImage,
    status: normalizeDealStatus(item.status),
    rawStatus: item.status,
    price: formatAmount(item.winnerPrice),
    winnerPrice: item.winnerPrice,
    sellerName: item.sellerName || '',
    winnerName: item.winnerName || '',
    confirmedAt: item.confirmedAt,
    createdAt: item.createdAt,
    date: formatDate(item.createdAt),
    modalType: getPurchaseModalType(item),
    shippingAddress: buildShippingAddress(item),
    shippingInfo: buildShippingInfo(item),
    canRegisterShippingAddress: Boolean(item.canRegisterShippingAddress),
    canRegisterTrackingNumber: Boolean(item.canRegisterTrackingNumber),
    canConfirmPurchase: Boolean(item.canConfirmPurchase),
    canWriteReview: Boolean(item.canWriteReview),
  }
}

async function loadPurchaseDetail(item) {
  if (!item?.winnerDealId) {
    return item
  }

  const detail = await getWinnerDealDetail(item.winnerDealId)

  return normalizeWinnerDeal({ ...item, ...detail })
}

async function savePurchaseShippingAddress(item, address) {
  await updateWinnerDealShippingAddress(item.winnerDealId, {
    zipcode: address.zip,
    address: address.address1,
    detailAddress: address.address2,
    recipient: address.name,
    tel: address.phone,
  })
}

async function loadMorePurchases() {
  if (loading.value || !hasNext.value) {
    return
  }

  const requestedPage = page.value
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await getUserPurchases({
      page: requestedPage,
      size: pageSize,
      order: 'ASC',
      offset: defaultOffset,
    })
    const content = response?.content || []
    const existingIds = new Set(purchaseItems.value.map((item) => item.id))
    const nextItems = content.map(normalizeWinnerDeal).filter((item) => !existingIds.has(item.id))

    purchaseItems.value = [...purchaseItems.value, ...nextItems]
    page.value += 1
    hasNext.value = typeof response?.hasNext === 'boolean'
      ? response.hasNext
      : requestedPage < Number(response?.totalPages ?? requestedPage)
  } catch (error) {
    errorMessage.value = error?.message || '구매 내역을 불러오지 못했습니다.'
    hasNext.value = false
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMorePurchases()
})
</script>
