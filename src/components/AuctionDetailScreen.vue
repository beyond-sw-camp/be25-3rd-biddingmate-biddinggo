<script setup>
import { computed, ref } from 'vue'
import { answerAuctionInquiry, createAuctionInquiry } from '../api/auctionInquiries'
import { createBid } from '../api/bids'
import BidHistoryDrawer from './auction-detail/BidHistoryDrawer.vue'
import BidModal from './auction-detail/BidModal.vue'
import DetailMediaSection from './auction-detail/DetailMediaSection.vue'
import HistoryPanel from './auction-detail/HistoryPanel.vue'
import InquiryAnswerModal from './auction-detail/InquiryAnswerModal.vue'
import InquiryModal from './auction-detail/InquiryModal.vue'
import InquirySection from './auction-detail/InquirySection.vue'
import PricePanel from './auction-detail/PricePanel.vue'
import ReportModal from './auction-detail/ReportModal.vue'
import SellerCardSection from './auction-detail/SellerCardSection.vue'
import SellerProfileModal from './auction-detail/SellerProfileModal.vue'
import { authState } from '../lib/authSession'
import { runtimeIdentity } from '../lib/runtimeIdentity'
import { getGradeBadge } from '../utils/gradeBadge'
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
  wishlistProcessing: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['back', 'edit-auction', 'refresh', 'toggle-wishlist'])

const bidAmount = ref('')
const feedbackMessage = ref('')
const isBidHistoryDrawerOpen = ref(false)
const isAnswerModalOpen = ref(false)
const isAnswerSubmitting = ref(false)
const isBidModalOpen = ref(false)
const isInquiryModalOpen = ref(false)
const isInquirySubmitting = ref(false)
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

const answerForm = ref({
  answer: '',
})

const selectedInquiry = ref(null)

const defaultSellerAvatar = 'https://www.figma.com/api/mcp/asset/1a84177d-d7c8-4353-8a50-20c14d87fbe5'

const sellerProfile = computed(() => ({
  avatar: props.item?.sellerAvatar || defaultSellerAvatar,
  badge: getGradeBadge(props.item?.sellerGrade),
  rating: props.item?.sellerRating || '0.0',
  reviewCount: props.item?.sellerReviewCount || 0,
  joinedAt: props.item?.sellerJoinedAt || '-',
  stats: [
    { label: '판매자 등급', value: props.item?.sellerGrade || '-' },
    { label: '구매자 리뷰', value: `${props.item?.sellerReviewCount || 0}` },
    { label: '평균 평점', value: props.item?.sellerRating || '0.0' },
    { label: '판매자 ID', value: props.item?.sellerId ? `${props.item.sellerId}` : '-' },
  ],
  reviews: props.item?.sellerReviews || [],
}))

const categoryTrailLabel = computed(() => props.item?.categoryPathLabel || '전체 경매')

const minimumBidAmount = computed(() => {
  const currentPrice = Number(String(props.item?.price || '0').replace(/[^\d]/g, '')) || 0
  const bidUnit = Number(String(props.item?.bidUnit || '0').replace(/[^\d]/g, '')) || 0
  return currentPrice + bidUnit
})

const buyNowAmount = computed(() =>
  Number(String(props.item?.buyNowPrice || '0').replace(/[^\d]/g, '')) || 0,
)

const bidHistoryRows = computed(() => props.item?.history || [])
const bidHistoryPreviewRows = computed(() => props.item?.historyPreview || [])

const isOwnAuction = computed(() => {
  const memberId = Number(authState.memberId)
  const sellerId = Number(props.item?.sellerId)

  return Number.isFinite(memberId) && Number.isFinite(sellerId) && memberId === sellerId
})

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
  if (isOwnAuction.value) {
    feedbackMessage.value = '본인이 등록한 경매에는 입찰할 수 없습니다.'
    return
  }

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
  if (isOwnAuction.value) {
    feedbackMessage.value = '본인이 등록한 경매에는 문의할 수 없습니다.'
    return
  }

  isInquiryModalOpen.value = true
}

function closeInquiryModal() {
  isInquiryModalOpen.value = false
}

function openAnswerModal(inquiry) {
  if (!isOwnAuction.value || inquiry.status === '답변 완료') {
    return
  }

  selectedInquiry.value = inquiry
  answerForm.value = {
    answer: '',
  }
  isAnswerModalOpen.value = true
}

function closeAnswerModal() {
  isAnswerModalOpen.value = false
  selectedInquiry.value = null
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

  const title = inquiryForm.value.title.trim()
  const content = inquiryForm.value.content.trim()

  if (!title || !content) {
    feedbackMessage.value = '문의 제목과 내용을 입력해주세요.'
    return
  }

  if (title.length > 50) {
    feedbackMessage.value = '문의 제목은 50자 이내로 입력해주세요.'
    return
  }

  if (isInquirySubmitting.value) {
    return
  }

  isInquirySubmitting.value = true

  try {
    await createAuctionInquiry({
      auctionId: props.item.auctionId,
      title,
      content,
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
  } finally {
    isInquirySubmitting.value = false
  }
}

async function submitAnswer() {
  const inquiryId = selectedInquiry.value?.id
  const answer = answerForm.value.answer.trim()

  if (!inquiryId) {
    feedbackMessage.value = '답변할 문의를 찾을 수 없습니다.'
    return
  }

  if (!answer) {
    feedbackMessage.value = '답변 내용을 입력해주세요.'
    return
  }

  if (isAnswerSubmitting.value) {
    return
  }

  isAnswerSubmitting.value = true

  try {
    await answerAuctionInquiry(inquiryId, { answer })
    feedbackMessage.value = '답변이 등록되었습니다.'
    closeAnswerModal()
    emit('refresh')
  } catch (error) {
    feedbackMessage.value = error?.message || '답변 등록에 실패했습니다.'
  } finally {
    isAnswerSubmitting.value = false
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
      <button type="button" class="detail-category-trail" @click="emit('back')">
        <span>홈</span>
        <em>|</em>
        <strong>{{ categoryTrailLabel }}</strong>
      </button>
      <div v-if="feedbackMessage" class="feedback-inline">{{ feedbackMessage }}</div>
      <button
        v-if="item && isOwnAuction"
        type="button"
        class="detail-action-chip is-edit"
        @click="emit('edit-auction')"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.5 19.5h4.1L18.9 9.2a2.9 2.9 0 0 0 0-4.1 2.9 2.9 0 0 0-4.1 0L4.5 15.4v4.1Z" />
          <path d="m13.8 6.1 4.1 4.1" />
        </svg>
        <span>수정하기</span>
      </button>
      <button
        v-else
        type="button"
        class="detail-action-chip is-report"
        @click="openReportModal"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 21V4.5" />
          <path d="M6 5h10.2c.8 0 1.2.9.7 1.5L15.6 8l1.3 1.5c.5.6.1 1.5-.7 1.5H6" />
        </svg>
        <span>신고</span>
      </button>
    </div>

    <div v-if="errorMessage" class="feedback-strip is-error">{{ errorMessage }}</div>
    <div v-else-if="loading" class="feedback-strip">경매 상세 정보를 불러오는 중입니다.</div>

    <template v-else-if="item">
      <div class="detail-grid">
        <div class="detail-left">
          <DetailMediaSection :assets="assets" :item="item" />
          <SellerCardSection
            :is-own-auction="isOwnAuction"
            :item="item"
            @open-inquiry="openInquiryModal"
            @open-seller="openSellerModal"
          />
          <div class="detail-description-card">
            <p>{{ item.description }}</p>
          </div>
          <InquirySection :can-answer="isOwnAuction" :item="item" @open-answer="openAnswerModal" />
        </div>

        <div class="detail-right">
          <PricePanel
            :assets="assets"
            :is-own-auction="isOwnAuction"
            :item="item"
            :wishlist-processing="wishlistProcessing"
            @open-bid="openBidModal"
            @toggle-wishlist="emit('toggle-wishlist')"
          />
          <HistoryPanel :item="item" :rows="bidHistoryPreviewRows" @view-all="openBidHistoryDrawer" />
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
        :submitting="isInquirySubmitting"
        @close="closeInquiryModal"
        @submit="submitInquiry"
      />

      <InquiryAnswerModal
        v-if="isAnswerModalOpen && selectedInquiry"
        :form="answerForm"
        :inquiry="selectedInquiry"
        :submitting="isAnswerSubmitting"
        @close="closeAnswerModal"
        @submit="submitAnswer"
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
