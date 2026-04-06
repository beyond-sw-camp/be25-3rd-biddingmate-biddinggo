<script setup>
import { computed, ref } from 'vue'
import { createAuctionInquiry } from '../api/auctionInquiries'
import { createBid } from '../api/bids'
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
import { runtimeIdentity } from '../lib/runtimeIdentity'
import { formatNumber } from '../utils/marketplace'

const props = defineProps({
  assets: {
    type: Object,
    required: true,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  item: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['back', 'refresh'])

const bidAmount = ref('')
const feedbackMessage = ref('')
const isBidHistoryDrawerOpen = ref(false)
const isBidModalOpen = ref(false)
const isInquiryModalOpen = ref(false)
const isReportModalOpen = ref(false)
const isSellerModalOpen = ref(false)

const reportTypes = [
  '위조품 / 가짜 상품',
  '허위 / 과장 정보',
  '부적절한 콘텐츠',
  '중복 등록',
  '도난물 의심',
  '기타',
]

const reportForm = ref({
  type: '기타',
  detail: '',
})

const inquiryForm = ref({
  isPrivate: true,
  title: '',
  content: '',
})

const sellerProfile = {
  avatar: 'https://www.figma.com/api/mcp/asset/1a84177d-d7c8-4353-8a50-20c14d87fbe5',
  badge: 'https://www.figma.com/api/mcp/asset/81111f1e-47ca-4819-bcc5-08161ec6a90c',
  rating: '4.8',
  reviewCount: 100,
  joinedAt: '2022. 03. 15',
  stats: [
    { label: '총 판매 건수', value: '1,000' },
    { label: '판매 취소', value: '3' },
    { label: '반품', value: '0' },
    { label: '응답률', value: '98%' },
  ],
  reviews: [
    {
      author: 'Kim_D***',
      date: '2023. 11. 24',
      rating: 5,
      content: '응답과 발송이 빨랐습니다.',
    },
  ],
}

const minimumBidAmount = computed(() => {
  const currentPrice = Number(String(props.item?.price || '0').replace(/[^\d]/g, '')) || 0
  const bidUnit = Number(String(props.item?.bidUnit || '0').replace(/[^\d]/g, '')) || 0
  return currentPrice + bidUnit
})

const buyNowAmount = computed(() =>
  Number(String(props.item?.buyNowPrice || '0').replace(/[^\d]/g, '')) || 0,
)

const bidHistoryRows = computed(() => props.item?.history || [])

function openSellerModal() {
  isSellerModalOpen.value = true
}

function closeSellerModal() {
  isSellerModalOpen.value = false
}

function syncBidAmount(value = minimumBidAmount.value) {
  bidAmount.value = formatNumber(value)
}

function openBidModal() {
  isBidHistoryDrawerOpen.value = false
  syncBidAmount()
  isBidModalOpen.value = true
}

function closeBidModal() {
  isBidModalOpen.value = false
}

function openBidHistoryDrawer() {
  isBidHistoryDrawerOpen.value = true
}

function closeBidHistoryDrawer() {
  isBidHistoryDrawerOpen.value = false
}

function openReportModal() {
  isReportModalOpen.value = true
}

function closeReportModal() {
  isReportModalOpen.value = false
}

function openInquiryModal() {
  isInquiryModalOpen.value = true
}

function closeInquiryModal() {
  isInquiryModalOpen.value = false
}

function stepBid(direction) {
  const current = Number(String(bidAmount.value || minimumBidAmount.value).replace(/[^\d]/g, '')) || 0
  const unit = Number(String(props.item?.bidUnit || '0').replace(/[^\d]/g, '')) || 0
  syncBidAmount(Math.max(minimumBidAmount.value, current + unit * direction))
}

async function submitBid() {
  if (!props.item?.auctionId) {
    return
  }

  try {
    const payload = {
      auctionId: props.item.auctionId,
      amount: Number(String(bidAmount.value).replace(/[^\d]/g, '')),
    }

    if (!payload.amount) {
      feedbackMessage.value = '입찰 금액을 확인해주세요.'
      return
    }

    await createBid(runtimeIdentity.memberId, payload)

    feedbackMessage.value = '입찰이 완료되었습니다.'
    closeBidModal()
    emit('refresh')
  } catch (error) {
    feedbackMessage.value = error?.message || '입찰 처리 중 오류가 발생했습니다.'
  }
}

async function submitInquiry() {
  if (!props.item?.auctionId) {
    return
  }

  try {
    await createAuctionInquiry({
      auctionId: props.item.auctionId,
      title: inquiryForm.value.title,
      content: inquiryForm.value.content,
      secretYn: inquiryForm.value.isPrivate,
    })
    feedbackMessage.value = '문의가 등록되었습니다.'
    inquiryForm.value = {
      isPrivate: true,
      title: '',
      content: '',
    }
    closeInquiryModal()
    emit('refresh')
  } catch (error) {
    feedbackMessage.value = error?.message || '문의 등록에 실패했습니다.'
  }
}

function submitReport() {
  feedbackMessage.value = '신고 기능은 아직 준비 중입니다.'
  closeReportModal()
}

function buyNow() {
  feedbackMessage.value = '즉시 구매 기능은 아직 준비 중입니다.'
  closeBidModal()
}
</script>

<template>
  <section class="detail-screen">
    <div class="detail-title-row">
      <button type="button" class="detail-chip" @click="emit('back')">목록으로</button>
      <div v-if="feedbackMessage" class="feedback-inline">{{ feedbackMessage }}</div>
      <button type="button" class="detail-chip detail-report-trigger" @click="openReportModal">신고하기</button>
    </div>

    <div v-if="errorMessage" class="feedback-strip is-error">{{ errorMessage }}</div>
    <div v-else-if="loading" class="feedback-strip">경매 상세 정보를 불러오는 중입니다.</div>

    <template v-else-if="item">
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
        :format-amount="formatNumber"
        :item="item"
        :minimum-bid-amount="minimumBidAmount"
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
    </template>
  </section>
</template>

<style scoped>
.feedback-strip {
  margin-bottom: 24px;
  border-radius: 18px;
  background: #fff;
  padding: 18px 20px;
  color: #64748b;
  font-size: 14px;
  text-align: center;
}

.feedback-strip.is-error {
  background: #fef2f2;
  color: #b91c1c;
}

.feedback-inline {
  flex: 1;
  color: #23008d;
  font-size: 14px;
  text-align: center;
}
</style>
