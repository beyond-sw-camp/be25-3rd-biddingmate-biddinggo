<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>판매 내역</h1>
    </section>

    <div class="winner-deal-list">
      <StatusRowCard
        v-for="item in salesHistoryItems"
        :key="item.date + item.status"
        :item="item"
        clickable
        @select="openModal"
      />
    </div>

    <WinnerDealDetailModal
      v-if="selectedItem"
      variant="sale"
      :item="selectedItem"
      :mode="modalMode"
      :form="shippingForm"
      @close="closeModal"
      @next="modalMode = $event"
      @update-form="updateForm"
      @save-shipping="saveShipping"
    />
  </MyPageLayout>
</template>

<script setup>
import MyPageLayout from '../../layout/MyPageLayout.vue'
import StatusRowCard from '../cards/StatusRowCard.vue'
import WinnerDealDetailModal from '../winner-deals/WinnerDealDetailModal.vue'
import { useSalesModal } from '../../../composables/useSalesModal'
import { salesHistoryItems } from '../../../data/salesHistory'

const { selectedItem, modalMode, shippingForm, openModal, closeModal, updateForm, saveShipping } = useSalesModal()
</script>
