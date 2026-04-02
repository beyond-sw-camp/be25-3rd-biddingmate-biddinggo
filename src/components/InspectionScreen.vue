<script setup>
import { toRef } from 'vue'
import { useInspectionState } from '../composables/useInspectionState'
import InspectionDetailModal from './inspection/InspectionDetailModal.vue'
import InspectionProductGrid from './inspection/InspectionProductGrid.vue'
import InspectionShippingModal from './inspection/InspectionShippingModal.vue'
import InspectionSummaryGrid from './inspection/InspectionSummaryGrid.vue'
import InspectionToolbar from './inspection/InspectionToolbar.vue'

defineEmits(['open-register'])

const props = defineProps({
  assets: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  summary: {
    type: Array,
    required: true,
  },
})

const {
  activeFilter,
  badgeClass,
  closeDetail,
  closeShippingModal,
  detailActionLabel,
  filterOptions,
  filteredItems,
  handleDetailAction,
  isShippingModalOpen,
  openDetail,
  selectedItem,
  shippingForm,
  submitShippingInfo,
  summaryIcon,
} = useInspectionState(toRef(props, 'items'))
</script>

<template>
  <section class="inspection-screen">
    <div class="inspection-header">
      <div>
        <h2>사전 검수 상품</h2>
        <p>검수가 완료된 상품을 확인하고 경매에 등록하세요.</p>
      </div>
      <button type="button" class="inspection-action" @click="$emit('open-register', 'inspection')">
        <span class="inspection-action-plus">+</span>
        검수 신청하기
      </button>
    </div>

    <InspectionSummaryGrid :summary="summary" :summary-icon="summaryIcon" />

    <InspectionToolbar
      :active-filter="activeFilter"
      :assets="assets"
      :filter-options="filterOptions"
      @update:active-filter="activeFilter = $event"
    />

    <InspectionProductGrid
      :assets="assets"
      :badge-class="badgeClass"
      :items="filteredItems"
      @open-detail="openDetail"
    />

    <InspectionDetailModal
      v-if="selectedItem"
      :assets="assets"
      :badge-class="badgeClass"
      :detail-action-label="detailActionLabel"
      :item="selectedItem"
      @close="closeDetail"
      @handle-action="handleDetailAction"
    />

    <InspectionShippingModal
      v-if="isShippingModalOpen"
      :form="shippingForm"
      @close="closeShippingModal"
      @submit="submitShippingInfo"
    />
  </section>
</template>
