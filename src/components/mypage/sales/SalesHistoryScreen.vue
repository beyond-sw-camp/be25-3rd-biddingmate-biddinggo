<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>판매 내역</h1>
    </section>

    <div class="stack-list">
      <StatusRowCard
        v-for="item in salesHistoryItems"
        :key="item.date + item.status"
        :item="item"
        :muted="item.status === '발송 대기'"
        clickable
        @select="openModal"
      />
    </div>

    <SalesDetailModal
      v-if="selectedItem"
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
import MyPageLayout from '../../MyPageLayout.vue'
import StatusRowCard from '../cards/StatusRowCard.vue'
import SalesDetailModal from './SalesDetailModal.vue'
import { useSalesModal } from '../../../composables/useSalesModal'
import { salesHistoryItems } from '../../../data/salesHistory'

const { selectedItem, modalMode, shippingForm, openModal, closeModal, updateForm, saveShipping } = useSalesModal()
</script>
