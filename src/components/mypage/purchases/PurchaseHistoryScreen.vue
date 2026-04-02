<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>구매 내역</h1>
    </section>

    <div class="winner-deal-list">
      <StatusRowCard
        v-for="item in purchaseStatusItems"
        :key="item.date + item.status"
        :item="item"
        clickable
        @select="openModal"
      />
    </div>

    <WinnerDealDetailModal
      v-if="selectedItem"
      variant="purchase"
      :item="selectedItem"
      :mode="modalMode"
      :form="shippingForm"
      @close="closeModal"
      @next="modalMode = $event"
      @back="modalMode = $event"
      @save-address="saveAddress"
      @select-address="selectAddress"
      @confirm-purchase="confirmPurchase"
    />
  </MyPageLayout>
</template>

<script setup>
import MyPageLayout from '../../layout/MyPageLayout.vue'
import StatusRowCard from '../cards/StatusRowCard.vue'
import WinnerDealDetailModal from '../winner-deals/WinnerDealDetailModal.vue'
import { usePurchaseModal } from '../../../composables/usePurchaseModal'
import { purchaseStatusItems } from '../../../data/mypage'

const { selectedItem, modalMode, shippingForm, openModal, closeModal, selectAddress, saveAddress, confirmPurchase } =
  usePurchaseModal()
</script>
