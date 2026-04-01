<script setup>
defineProps({
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
</script>

<template>
  <section class="detail-screen">
    <div class="detail-title-row">
      <div class="detail-breadcrumb">{{ item.brand }} |</div>
      <div class="detail-chip">
        <span>span</span>
      </div>
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
          <button type="button" class="seller-button">문의 하기</button>
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
            <button type="button" class="detail-bid-button">지금 입찰하기</button>
          </div>

          <div class="detail-stats">
            <div><span>입찰 단위</span><strong>{{ item.bidUnit }}</strong></div>
            <div><span>즉시 구매가</span><strong>{{ item.buyNowPrice }}</strong></div>
            <div><span>시작일</span><strong>{{ item.startDate }}</strong></div>
            <div><span>종료일</span><strong>{{ item.endDate }}</strong></div>
          </div>
        </div>

        <div class="history-panel">
          <div class="history-heading">입찰 기록</div>
          <div class="history-list">
            <div v-for="(row, index) in item.history" :key="`${row.bidder}-${index}`" class="history-row">
              <span>{{ row.bidder }}</span>
              <strong>{{ row.amount }}</strong>
              <span>{{ row.date }}</span>
            </div>
          </div>
        </div>

        <button type="button" class="back-to-list" @click="$emit('back')">목록으로</button>
      </div>
    </div>
  </section>
</template>
