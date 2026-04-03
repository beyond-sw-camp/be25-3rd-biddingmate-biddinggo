<script setup>
import { computed } from 'vue'
import BidHistoryDrawer from './auction-detail/BidHistoryDrawer.vue'
import BidModal from './auction-detail/BidModal.vue'
import DetailMediaSection from './auction-detail/DetailMediaSection.vue'
import HistoryPanel from './auction-detail/HistoryPanel.vue'
import InquiryModal from './auction-detail/InquiryModal.vue'
import InquirySection from './auction-detail/InquirySection.vue'
import PricePanel from './auction-detail/PricePanel.vue'
import ReportModal from './auction-detail/ReportModal.vue'
import SellerCardSection from './auction-detail/SellerCardSection.vue'
import SellerProfileModal from './auction-detail/SellerProfileModal.vue'
import { useAuctionDetailState } from '../composables/useAuctionDetailState'

const props = defineProps({
  assets: {
    type: Object,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
})

defineEmits(['back'])

const itemRef = computed(() => props.item)
const {
  bidAmount,
  bidHistoryRows,
  buyNow,
  buyNowAmount,
  closeBidHistoryDrawer,
  closeBidModal,
  closeInquiryModal,
  closeReportModal,
  closeSellerModal,
  formatAmount,
  inquiryForm,
  isBidHistoryDrawerOpen,
  isBidModalOpen,
  isInquiryModalOpen,
  isReportModalOpen,
  isSellerModalOpen,
  minimumBidAmount: minimumBidAmountFromState,
  openBidHistoryDrawer,
  openBidModal,
  openInquiryModal,
  openReportModal,
  openSellerModal,
  reportForm,
  reportTypes,
  sellerProfile,
  stepBid,
  submitBid,
  submitInquiry,
  submitReport,
} = useAuctionDetailState(itemRef)
</script>

<template>
  <section class="detail-screen">
    <div class="detail-title-row">
      <div class="detail-breadcrumb">{{ item.brand }} |</div>
      <button type="button" class="detail-chip detail-report-trigger" @click="openReportModal">
        신고하기
      </button>
    </div>

    <div class="detail-grid">
      <div class="detail-left">
        <DetailMediaSection :assets="assets" :item="item" />
        <SellerCardSection :item="item" @open-inquiry="openInquiryModal" @open-seller="openSellerModal" />
        <div class="detail-description-card">
          <p>{{ item.description }}</p>
        </div>
        <InquirySection :item="item" />
      </div>

      <div class="detail-right">
        <PricePanel :assets="assets" :item="item" @open-bid="openBidModal" />
        <HistoryPanel :item="item" @view-all="openBidHistoryDrawer" />
      </div>
    </div>

    <SellerProfileModal
      v-if="isSellerModalOpen"
      :assets="assets"
      :item="item"
      :seller-profile="sellerProfile"
      @close="closeSellerModal"
    />

    <BidHistoryDrawer
      v-if="isBidHistoryDrawerOpen"
      :assets="assets"
      :item="item"
      :rows="bidHistoryRows"
      @close="closeBidHistoryDrawer"
      @open-bid="openBidModal"
    />

    <BidModal
      v-if="isBidModalOpen"
      :assets="assets"
      :bid-amount="bidAmount"
      :buy-now-amount="buyNowAmount"
      :format-amount="formatAmount"
      :item="item"
      :minimum-bid-amount="minimumBidAmountFromState"
      @buy-now="buyNow"
      @close="closeBidModal"
      @step-bid="stepBid"
      @submit-bid="submitBid"
      @update:bid-amount="bidAmount = $event"
    />

    <ReportModal
      v-if="isReportModalOpen"
      :assets="assets"
      :form="reportForm"
      :item="item"
      :report-types="reportTypes"
      @close="closeReportModal"
      @submit="submitReport"
    />

    <InquiryModal
      v-if="isInquiryModalOpen"
      :assets="assets"
      :form="inquiryForm"
      :item="item"
      @close="closeInquiryModal"
      @submit="submitInquiry"
    />
  </section>
</template>
