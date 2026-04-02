<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>구매 내역</h1>
    </section>

    <div class="stack-list">
      <StatusRowCard
        v-for="item in purchaseStatusItems"
        :key="item.date + item.status"
        :item="item"
        :muted="item.status === '발송 대기'"
        clickable
        @select="openModal"
      />
    </div>

    <PurchaseDetailModal
      v-if="selectedItem"
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
import MyPageLayout from '../../MyPageLayout.vue'
import StatusRowCard from '../cards/StatusRowCard.vue'
import PurchaseDetailModal from './PurchaseDetailModal.vue'
import { usePurchaseModal } from '../../../composables/usePurchaseModal'
import { purchaseStatusItems } from '../../../data/mypage'

const { selectedItem, modalMode, shippingForm, openModal, closeModal, selectAddress, saveAddress, confirmPurchase } =
  usePurchaseModal()
</script>
