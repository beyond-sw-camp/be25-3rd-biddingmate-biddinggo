<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>마이페이지</h1>
    </section>

    <SurfaceCard as="section" class="user-summary-card">
      <div class="user-summary__identity">
        <img :src="overviewUser.avatar" :alt="overviewUser.name" class="avatar avatar--small" />
        <strong>{{ overviewUser.name }}</strong>
      </div>
      <div class="user-summary__points">
        <p>보유 포인트</p>
        <strong>{{ overviewUser.points }}</strong>
      </div>
    </SurfaceCard>

    <section class="section-block">
      <div class="section-heading">
        <h2>입찰 내역</h2>
        <RouterLink to="/mypage/bids">View All</RouterLink>
      </div>
      <div class="bid-history-list">
        <ProductBidCard v-for="item in bidItems.slice(0, 2)" :key="item.date + item.status" :item="item" />
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <h2>진행 중 구매 현황</h2>
        <RouterLink to="/mypage/purchases">View All</RouterLink>
      </div>
      <div class="winner-deal-list">
        <StatusRowCard
          v-for="item in purchaseStatusItems.slice(0, 2)"
          :key="item.date + item.status"
          :item="item"
          clickable
          @select="openPurchaseModal"
        />
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <h2>진행 중 판매 현황</h2>
        <RouterLink to="/mypage/sales">View All</RouterLink>
      </div>
      <div class="winner-deal-list">
        <StatusRowCard
          v-for="item in salesHistoryItems.slice(0, 2)"
          :key="item.date + item.status"
          :item="item"
          clickable
          @select="openSalesModal"
        />
      </div>
    </section>

    <WinnerDealDetailModal
      v-if="selectedPurchaseItem"
      variant="purchase"
      :item="selectedPurchaseItem"
      :mode="purchaseModalMode"
      :form="purchaseShippingForm"
      @close="closePurchaseModal"
      @next="purchaseModalMode = $event"
      @back="purchaseModalMode = $event"
      @save-address="savePurchaseAddress"
      @select-address="selectPurchaseAddress"
      @confirm-purchase="confirmPurchase"
    />

    <WinnerDealDetailModal
      v-if="selectedSalesItem"
      variant="sale"
      :item="selectedSalesItem"
      :mode="salesModalMode"
      :form="salesShippingForm"
      @close="closeSalesModal"
      @next="salesModalMode = $event"
      @update-form="updateSalesForm"
      @save-shipping="saveSalesShipping"
    />
  </MyPageLayout>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import SurfaceCard from '../../SurfaceCard.vue'
import MyPageLayout from '../../layout/MyPageLayout.vue'
import ProductBidCard from '../cards/ProductBidCard.vue'
import StatusRowCard from '../cards/StatusRowCard.vue'
import WinnerDealDetailModal from '../winner-deals/WinnerDealDetailModal.vue'
import { usePurchaseModal } from '../../../composables/usePurchaseModal'
import { useSalesModal } from '../../../composables/useSalesModal'
import { bidItems, overviewUser, purchaseStatusItems } from '../../../data/mypage'
import { salesHistoryItems } from '../../../data/salesHistory'

const {
  selectedItem: selectedPurchaseItem,
  modalMode: purchaseModalMode,
  shippingForm: purchaseShippingForm,
  openModal: openPurchaseModal,
  closeModal: closePurchaseModal,
  selectAddress: selectPurchaseAddress,
  saveAddress: savePurchaseAddress,
  confirmPurchase,
} = usePurchaseModal()

const {
  selectedItem: selectedSalesItem,
  modalMode: salesModalMode,
  shippingForm: salesShippingForm,
  openModal: openSalesModal,
  closeModal: closeSalesModal,
  updateForm: updateSalesForm,
  saveShipping: saveSalesShipping,
} = useSalesModal()
</script>
