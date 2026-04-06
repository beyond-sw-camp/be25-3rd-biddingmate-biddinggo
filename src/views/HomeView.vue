<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuctionList } from '../api/auctions'
import HomeScreen from '../components/HomeScreen.vue'
import { assets } from '../data/marketplaceData'
import { normalizeAuctionCard } from '../utils/marketplace'

const router = useRouter()
const homeItems = ref([])
const loading = ref(false)
const errorMessage = ref('')

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

    homeItems.value = (page?.content || []).map(normalizeAuctionCard)
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
    @open-detail="openDetail"
    @open-list="openList"
  />
</template>
