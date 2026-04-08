<template>
  <DashboardScreen
    :bid-items="bidItems"
    :overview-user="overviewUser"
    :purchase-status-items="purchaseStatusItems"
    :sales-history-items="salesHistoryItems"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getUserDashboard } from '../api/users'
import defaultAvatar from '../assets/default-avatar.svg'
import noImage from '../assets/no-image.svg'
import DashboardScreen from '../components/mypage/dashboard/DashboardScreen.vue'
import {
  bidItems as fallbackBidItems,
  overviewUser as fallbackOverviewUser,
  purchaseStatusItems as fallbackPurchaseStatusItems,
} from '../data/mypage'
import { salesHistoryItems as fallbackSalesHistoryItems } from '../data/salesHistory'

const overviewUser = ref(fallbackOverviewUser)
const bidItems = ref(fallbackBidItems)
const purchaseStatusItems = ref(fallbackPurchaseStatusItems)
const salesHistoryItems = ref(fallbackSalesHistoryItems)
const auctionStatusLabels = {
  PENDING: '경매 예정',
  ON_GOING: '경매 진행 중',
  ENDED: '경매 종료',
  CANCELLED: '경매 취소',
}

function formatPoints(point) {
  const pointValue = Number(point ?? 0)

  if (Number.isNaN(pointValue)) {
    return `${point} 원`
  }

  return `${pointValue.toLocaleString()} 원`
}

function formatPrice(price) {
  if (price === null || price === undefined || price === '') {
    return '-'
  }

  const priceValue = Number(price)

  if (Number.isNaN(priceValue)) {
    return String(price)
  }

  return `${priceValue.toLocaleString()}원`
}

function formatDate(date) {
  if (!date) {
    return ''
  }

  return String(date).replace('T', ' ')
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

function normalizeOverviewUser(user = {}) {
  return {
    ...fallbackOverviewUser,
    avatar: user.imageUrl || user.profileImageUrl || fallbackOverviewUser.avatar || defaultAvatar,
    name: user.nickname || fallbackOverviewUser.name,
    points: formatPoints(user.point ?? fallbackOverviewUser.points),
  }
}

function normalizeBiddingItem(item = {}) {
  return {
    status: auctionStatusLabels[item.status] || item.status || '-',
    name: item.itemName || '-',
    image: item.representativeImageUrl || item.imageUrl || noImage,
    time: formatRemainingTime(item.endDate),
    currentPrice: formatPrice(item.currentPrice),
    myBid: formatPrice(item.myBidPrice),
    date: formatDate(item.endDate),
  }
}

function normalizeWonItem(item = {}) {
  return {
    status: item.status || '낙찰',
    name: item.itemName || '-',
    image: item.representativeImageUrl || item.imageUrl || noImage,
    price: formatPrice(item.price ?? item.finalPrice ?? item.currentPrice ?? item.myBidPrice),
    date: formatDate(item.endDate ?? item.wonDate ?? item.date),
    modalType: 'readonly',
  }
}

async function loadUserDashboard() {
  try {
    const userDashboard = await getUserDashboard()
    overviewUser.value = normalizeOverviewUser(userDashboard)
    bidItems.value = (userDashboard?.biddingItems || []).map(normalizeBiddingItem)
    const wonItems = (userDashboard?.wonItems || []).map(normalizeWonItem)
    purchaseStatusItems.value = wonItems
    salesHistoryItems.value = wonItems
  } catch {
    overviewUser.value = fallbackOverviewUser
    bidItems.value = fallbackBidItems
    purchaseStatusItems.value = fallbackPurchaseStatusItems
    salesHistoryItems.value = fallbackSalesHistoryItems
  }
}

onMounted(() => {
  loadUserDashboard()
})
</script>
