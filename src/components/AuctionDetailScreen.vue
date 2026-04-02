<script setup>
import { computed, ref } from 'vue'

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

const reportTypes = [
  '위조품 / 가짜 상품',
  '허위 / 과장 정보',
  '부적절한 콘텐츠',
  '중복 등록',
  '도난물 의심',
  '기타',
]
const bidHistoryRows = [
  '1번 입찰자',
  '2번 입찰자',
  '3번 입찰자',
  '4번 입찰자',
  '5번 입찰자',
  '6번 입찰자',
  '1번 입찰자',
  '2번 입찰자',
  '2번 입찰자',
  '2번 입찰자',
  '7번 입찰자',
  '8번 입찰자',
  '1번 입찰자',
  '10번 입찰자',
].map((bidder) => ({
  bidder,
  amount: '***원',
  date: '20xx/xx/xx xx:xx:xx.xx',
}))

function parseAmount(value) {
  return Number(String(value).replace(/[^\d]/g, '')) || 0
}

function formatAmount(value) {
  return new Intl.NumberFormat('ko-KR').format(value)
}

const minimumBidAmount = computed(() => parseAmount(props.item.price) + parseAmount(props.item.bidUnit))
const buyNowAmount = computed(() => parseAmount(props.item.buyNowPrice))

const isBidModalOpen = ref(false)
const isBidHistoryDrawerOpen = ref(false)
const isReportModalOpen = ref(false)
const reportForm = ref({
  type: '기타',
  detail: '',
})
const bidAmount = ref('')
const isInquiryModalOpen = ref(false)
const inquiryForm = ref({
  isPrivate: true,
  title: '',
  content: '',
})

function syncBidAmount(value = minimumBidAmount.value) {
  bidAmount.value = formatAmount(value)
}

function openBidModal() {
  isBidHistoryDrawerOpen.value = false
  syncBidAmount()
  isBidModalOpen.value = true
}

function closeBidModal() {
  isBidModalOpen.value = false
}

function stepBid(direction) {
  const nextAmount = parseAmount(bidAmount.value || minimumBidAmount.value) + parseAmount(props.item.bidUnit) * direction
  syncBidAmount(Math.max(minimumBidAmount.value, nextAmount))
}

function submitBid() {
  isBidModalOpen.value = false
}

function buyNow() {
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

function submitReport() {
  isReportModalOpen.value = false
}

function openInquiryModal() {
  isInquiryModalOpen.value = true
}

function closeInquiryModal() {
  isInquiryModalOpen.value = false
}

function submitInquiry() {
  isInquiryModalOpen.value = false
}
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
        <div class="detail-image-card">
          <img :src="assets.listWatchImage" :alt="item.title" class="detail-image" />
          <button type="button" class="gallery-arrow gallery-arrow-left">‹</button>
          <button type="button" class="gallery-arrow gallery-arrow-right">›</button>
        </div>

        <div class="inspection-banner">
          <div class="inspection-icon">✓</div>
          <div>
            <strong>{{ item.inspectionLabel }}</strong>
            <p>{{ item.inspectionDescription }}</p>
          </div>
        </div>

        <div class="seller-card">
          <div class="seller-meta">
            <div class="seller-avatar"></div>
            <div class="seller-info">
              <span class="seller-name">{{ item.seller }}</span>
              <span class="seller-grade">{{ item.sellerGrade }}</span>
            </div>
          </div>
          <button type="button" class="seller-button" @click="openInquiryModal">문의 하기</button>
        </div>

        <div class="detail-description-card">
          <p>{{ item.description }}</p>
        </div>

        <div class="inquiry-section">
          <div class="inquiry-heading">상품 문의 (2)</div>
          <div class="inquiry-list">
            <article
              v-for="(inquiry, index) in item.inquiries"
              :key="`${inquiry.title}-${index}`"
              class="inquiry-item"
              :class="{ 'is-expanded': index === 0 }"
            >
              <div class="inquiry-summary">
                <div class="inquiry-summary-left">
                  <span class="status-badge" :class="{ 'is-pending': inquiry.status === '답변 대기' }">
                    {{ inquiry.status }}
                  </span>
                  <div class="inquiry-text">
                    <strong>{{ inquiry.title }}</strong>
                    <span>{{ inquiry.meta }}</span>
                  </div>
                </div>
                <span class="inquiry-toggle">{{ index === 0 ? '⌃' : '⌄' }}</span>
              </div>

              <div v-if="index === 0" class="inquiry-detail">
                <div class="question-box">
                  {{ inquiry.question }}
                </div>
                <div class="answer-box">
                  <div class="answer-label">판매자 답변</div>
                  <p>{{ inquiry.answer }}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div class="detail-right">
        <div class="price-panel">
          <div class="price-top-line">
            <div class="price-tags">
              <span class="price-tag is-danger">TIME DEAL</span>
              <span class="price-tag is-light">검수 완료</span>
            </div>
            <button type="button" class="detail-heart-button">
              <img :src="assets.heartIcon" alt="" />
            </button>
          </div>

          <p class="detail-brand-line">{{ item.brand }} |</p>
          <h2 class="detail-product-title">{{ item.title }}</h2>

          <div class="detail-price-block">
            <span>현재 입찰가</span>
            <strong>{{ item.price }}</strong>
          </div>

          <p class="detail-price-meta">{{ item.bids }} | 시작가 {{ item.price }}</p>
          <p class="detail-time-left">{{ item.time }}</p>

          <div class="detail-bid-box">
            <label class="detail-bid-field">
              <span>입찰 금액</span>
              <input type="text" :value="item.price" />
            </label>
            <button type="button" class="detail-bid-button" @click="openBidModal">지금 입찰하기</button>
          </div>

          <div class="detail-stats">
            <div><span>입찰 단위</span><strong>{{ item.bidUnit }}</strong></div>
            <div><span>즉시 구매가</span><strong>{{ item.buyNowPrice }}</strong></div>
            <div><span>시작일</span><strong>{{ item.startDate }}</strong></div>
            <div><span>종료일</span><strong>{{ item.endDate }}</strong></div>
          </div>
        </div>

        <div class="history-panel">
          <div class="history-header">
            <div class="history-heading">입찰 기록</div>
            <button type="button" class="history-view-all" @click="openBidHistoryDrawer">View All</button>
          </div>
          <div class="history-list">
            <div v-for="(row, index) in item.history" :key="`${row.bidder}-${index}`" class="history-row">
              <span>{{ row.bidder }}</span>
              <strong>{{ row.amount }}</strong>
              <span>{{ row.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isBidHistoryDrawerOpen"
      class="detail-history-drawer-overlay"
      @click.self="closeBidHistoryDrawer"
    >
      <aside class="detail-history-drawer">
        <div class="detail-history-drawer-top">
          <button type="button" class="detail-history-drawer-close" @click="closeBidHistoryDrawer">
            ×
          </button>
        </div>

        <div class="detail-history-drawer-summary">
          <img :src="props.assets.listWatchImage" :alt="item.title" class="detail-inquiry-thumb" />
          <div class="detail-inquiry-summary-copy">
            <strong>{{ item.title }}</strong>
            <span>현재 입찰가</span>
            <em>{{ item.price }}원</em>
          </div>
        </div>

        <div class="detail-history-table">
          <div class="detail-history-table-head">
            <span>입찰자</span>
            <span>입찰액</span>
            <span>입찰 일시</span>
          </div>

          <div class="detail-history-table-body">
            <div
              v-for="(row, index) in bidHistoryRows"
              :key="`${row.bidder}-${index}`"
              class="detail-history-table-row"
            >
              <span>{{ row.bidder }}</span>
              <strong>{{ row.amount }}</strong>
              <span>{{ row.date }}</span>
            </div>
          </div>
        </div>

        <button type="button" class="detail-history-action" @click="openBidModal">
          입찰하기
        </button>
      </aside>
    </div>

    <div v-if="isBidModalOpen" class="detail-inquiry-overlay" @click.self="closeBidModal">
      <section class="detail-bid-modal">
        <div class="detail-inquiry-header">
          <h3>입찰하기</h3>
          <button type="button" class="detail-inquiry-close" @click="closeBidModal">×</button>
        </div>

        <div class="detail-inquiry-summary">
          <img :src="props.assets.listWatchImage" :alt="item.title" class="detail-inquiry-thumb" />
          <div class="detail-inquiry-summary-copy">
            <strong>{{ item.title }}</strong>
            <span>현재 입찰가</span>
            <em>{{ item.price }}원</em>
          </div>
        </div>

        <div class="detail-bid-modal-body">
          <div class="detail-bid-meta-row">
            <span>입찰 단위</span>
            <strong>{{ item.bidUnit }}원</strong>
          </div>

          <label class="detail-bid-modal-label">입찰 금액</label>

          <label class="detail-bid-input-row">
            <input
              v-model="bidAmount"
              type="text"
              :placeholder="`최소 ${formatAmount(minimumBidAmount)}`"
            />
            <span>원</span>
          </label>

          <div class="detail-bid-quick-actions">
            <button type="button" class="detail-bid-quick-chip" @click="stepBid(-1)">- {{ item.bidUnit }}</button>
            <button type="button" class="detail-bid-quick-chip" @click="stepBid(1)">+ {{ item.bidUnit }}</button>
          </div>
        </div>

        <div class="detail-bid-modal-actions">
          <button type="button" class="detail-buy-now-button" @click="buyNow">
            <span>{{ formatAmount(buyNowAmount) }}원 으로</span>
            <strong>즉시 구매</strong>
          </button>
          <button type="button" class="detail-bid-submit-button" @click="submitBid">
            입찰하기
          </button>
        </div>
      </section>
    </div>

    <div v-if="isReportModalOpen" class="detail-inquiry-overlay" @click.self="closeReportModal">
      <section class="detail-report-modal">
        <div class="detail-inquiry-header">
          <h3>신고하기</h3>
          <button type="button" class="detail-inquiry-close" @click="closeReportModal">×</button>
        </div>

        <div class="detail-inquiry-summary">
          <img :src="props.assets.listWatchImage" :alt="item.title" class="detail-inquiry-thumb" />
          <div class="detail-inquiry-summary-copy">
            <strong>{{ item.title }}</strong>
            <span>현재 입찰가</span>
            <em>{{ item.price }}원</em>
          </div>
        </div>

        <div class="detail-report-fields">
          <div class="detail-report-field">
            <span>신고 유형 <em>*</em></span>
            <div class="detail-report-options">
              <button
                v-for="type in reportTypes"
                :key="type"
                type="button"
                class="detail-report-option"
                :class="{ 'is-selected': reportForm.type === type }"
                @click="reportForm.type = type"
              >
                <span class="detail-report-radio" />
                <span>{{ type }}</span>
              </button>
            </div>
          </div>

          <label class="detail-report-field">
            <span>신고 내용 <em>*</em></span>
            <textarea
              v-model="reportForm.detail"
              class="detail-report-textarea"
              placeholder="신고 사유에 대한 구체적인 내용을 작성해주세요."
            />
          </label>
        </div>

        <button type="button" class="detail-report-submit" @click="submitReport">
          신고하기
        </button>
      </section>
    </div>

    <div v-if="isInquiryModalOpen" class="detail-inquiry-overlay" @click.self="closeInquiryModal">
      <section class="detail-inquiry-modal">
        <div class="detail-inquiry-header">
          <h3>문의하기</h3>
          <button type="button" class="detail-inquiry-close" @click="closeInquiryModal">×</button>
        </div>

        <div class="detail-inquiry-summary">
          <img :src="props.assets.listWatchImage" :alt="item.title" class="detail-inquiry-thumb" />
          <div class="detail-inquiry-summary-copy">
            <strong>{{ item.title }}</strong>
            <span>현재 입찰가</span>
            <em>{{ item.price }}원</em>
          </div>
        </div>

        <label class="detail-inquiry-secret">
          <input v-model="inquiryForm.isPrivate" type="checkbox" />
          <span>비밀글</span>
        </label>

        <div class="detail-inquiry-fields">
          <label class="detail-inquiry-field">
            <span>문의 제목 <em>*</em></span>
            <input
              v-model="inquiryForm.title"
              type="text"
              placeholder="제목을 입력해 주세요."
            />
          </label>

          <label class="detail-inquiry-field">
            <span>문의 내용 <em>*</em></span>
            <textarea
              v-model="inquiryForm.content"
              placeholder="문의 내용을 상세히 작성해주세요."
            />
          </label>
        </div>

        <button type="button" class="detail-inquiry-submit" @click="submitInquiry">
          문의하기
        </button>
      </section>
    </div>
  </section>
</template>
