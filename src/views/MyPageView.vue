<script setup>
import MyPageScreen from '../components/MyPageScreen.vue'
import {
  assets,
  mypageBidItems,
  mypageProfile,
  mypagePurchaseItems,
} from '../data/marketplaceData'
</script>

<template>
  <MyPageScreen
    :assets="assets"
    :profile="mypageProfile"
    :bid-items="mypageBidItems"
    :purchase-items="mypagePurchaseItems"
  />
</template>
