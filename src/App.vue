<script setup>
import { computed, ref } from 'vue'
import AppShell from './components/AppShell.vue'
import AuctionDetailScreen from './components/AuctionDetailScreen.vue'
import AuctionListScreen from './components/AuctionListScreen.vue'
import HomeScreen from './components/HomeScreen.vue'
import InspectionScreen from './components/InspectionScreen.vue'
import MyPageScreen from './components/MyPageScreen.vue'
import RegisterScreen from './components/RegisterScreen.vue'
import {
  assets,
  bestItems,
  categoryGroups,
  inspectionItems,
  inspectionSummary,
  listItems,
  mypageBidItems,
  mypageNavigationItems,
  mypageProfile,
  mypagePurchaseItems,
  navigationItems,
} from './data/marketplaceData'

const currentScreen = ref('home')
const selectedItem = ref(null)
const registerEntryMode = ref('select')

const activeNavigationItems = computed(() =>
  currentScreen.value === 'mypage' ? mypageNavigationItems : navigationItems,
)

const currentNavKey = computed(() =>
  currentScreen.value === 'mypage' ? 'mypage-dashboard' : currentScreen.value,
)

function openScreen(screen) {
  if (screen === 'home' || screen === 'list' || screen === 'register' || screen === 'inspection' || screen === 'mypage') {
    registerEntryMode.value = screen === 'register' ? 'select' : registerEntryMode.value
    currentScreen.value = screen
  }
}

function openRegister(mode = 'select') {
  registerEntryMode.value = mode
  currentScreen.value = 'register'
}

function openDetail(item) {
  selectedItem.value = item
  currentScreen.value = 'detail'
}
</script>

<template>
  <AppShell
    :assets="assets"
    :current-screen="currentScreen"
    :current-nav-key="currentNavKey"
    :navigation-items="activeNavigationItems"
    @navigate="openScreen"
    @open-mypage="openScreen('mypage')"
  >
    <HomeScreen
      v-if="currentScreen === 'home'"
      :assets="assets"
      :items="bestItems"
      @open-detail="openDetail"
      @open-list="openScreen('list')"
    />

    <AuctionListScreen
      v-else-if="currentScreen === 'list'"
      :assets="assets"
      :categories="categoryGroups"
      :items="listItems"
      @open-detail="openDetail"
    />

    <AuctionDetailScreen
      v-else-if="currentScreen === 'detail' && selectedItem"
      :assets="assets"
      :item="selectedItem"
      @back="openScreen('list')"
    />

    <RegisterScreen
      v-else-if="currentScreen === 'register'"
      :initial-mode="registerEntryMode"
    />

    <InspectionScreen
      v-else-if="currentScreen === 'inspection'"
      :assets="assets"
      :items="inspectionItems"
      :summary="inspectionSummary"
      @open-register="openRegister"
    />

    <MyPageScreen
      v-else-if="currentScreen === 'mypage'"
      :assets="assets"
      :profile="mypageProfile"
      :bid-items="mypageBidItems"
      :purchase-items="mypagePurchaseItems"
    />
  </AppShell>
</template>
