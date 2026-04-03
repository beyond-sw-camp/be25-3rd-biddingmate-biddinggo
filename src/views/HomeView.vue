<script setup>
import { useRouter } from 'vue-router'
import HomeScreen from '../components/HomeScreen.vue'
import { assets, bestItems } from '../data/marketplaceData'

const router = useRouter()

function openDetail(item) {
  router.push(`/auctions/${item.id}`)
}

function openList() {
  router.push('/auctions')
}
</script>

<template>
  <HomeScreen
    :assets="assets"
    :items="bestItems"
    @open-detail="openDetail"
    @open-list="openList"
  />
</template>
