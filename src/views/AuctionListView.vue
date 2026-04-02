<script setup>
import { useRouter } from 'vue-router'
import AuctionListScreen from '../components/AuctionListScreen.vue'
import { assets, categoryGroups, listItems } from '../data/marketplaceData'

const router = useRouter()

function openDetail(item) {
  router.push(`/auctions/${item.id}`)
}
</script>

<template>
  <AuctionListScreen
    :assets="assets"
    :categories="categoryGroups"
    :items="listItems"
    @open-detail="openDetail"
  />
</template>
