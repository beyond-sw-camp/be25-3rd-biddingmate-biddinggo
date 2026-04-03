<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuctionDetailScreen from '../components/AuctionDetailScreen.vue'
import { assets, findAuctionItemById } from '../data/marketplaceData'

const route = useRoute()
const router = useRouter()

const selectedItem = computed(() => findAuctionItemById(String(route.params.id)))

watchEffect(() => {
  if (!selectedItem.value) {
    router.replace('/auctions')
  }
})

function backToList() {
  router.push('/auctions')
}
</script>

<template>
  <AuctionDetailScreen
    v-if="selectedItem"
    :assets="assets"
    :item="selectedItem"
    @back="backToList"
  />
</template>
