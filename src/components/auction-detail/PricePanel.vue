<script setup>
defineProps({
  assets: {
    type: Object,
    required: true,
  },
  bidButtonDisabled: {
    type: Boolean,
    default: false,
  },
  bidButtonLabel: {
    type: String,
    default: '지금 입찰하기',
  },
  item: {
    type: Object,
    required: true,
  },
  isOwnAuction: {
    type: Boolean,
    default: false,
  },
  wishlistProcessing: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['open-bid', 'toggle-wishlist'])
</script>

<template>
  <div class="price-panel">
    <div class="price-top-line">
      <div v-if="item.isTimeDeal || item.isInspected" class="price-tags">
        <span v-if="item.isTimeDeal" class="price-tag is-danger">TIME DEAL</span>
        <span v-if="item.isInspected" class="price-tag is-light">검수 완료</span>
      </div>
      <div v-else class="price-tags" aria-hidden="true"></div>
      <button
        type="button"
        class="detail-heart-button"
        :class="{ 'is-wished': item.isWished }"
        :disabled="wishlistProcessing"
        :aria-pressed="item.isWished"
        :aria-label="item.isWished ? '찜 취소' : '찜하기'"
        @click="$emit('toggle-wishlist')"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 20.25S4.5 15.98 4.5 9.8A4.25 4.25 0 0 1 12 7.05 4.25 4.25 0 0 1 19.5 9.8c0 6.18-7.5 10.45-7.5 10.45Z"
          />
        </svg>
      </button>
    </div>

    <h4 class="detail-product-brand">{{ item.brand ? '' : '브랜드: ' + item.brand }}</h4>
    <h2 class="detail-product-title">{{ item.title }}</h2>

    <div class="detail-price-block">
      <span>현재 입찰가</span>
      <strong>{{ item.price }}</strong>
    </div>

    <p class="detail-price-meta">{{ item.bids }} | 시작가 {{ item.startPrice || item.price }}</p>
    <p v-if="item.pricePredictionLabel" class="detail-price-prediction">{{ item.pricePredictionLabel }}</p>
    <p class="detail-time-left">{{ item.time }}</p>

    <div class="detail-bid-box">
      <label class="detail-bid-field">
        <span>입찰 금액</span>
        <input type="text" :value="item.price" />
      </label>
      <button
        type="button"
        class="detail-bid-button"
        :disabled="bidButtonDisabled"
        @click="$emit('open-bid')"
      >
        {{ bidButtonLabel }}
      </button>
    </div>

    <div class="detail-stats">
      <div><span>입찰 단위</span><strong>{{ item.bidUnit }}</strong></div>
      <div><span>즉시 구매가</span><strong>{{ item.buyNowPrice }}</strong></div>
      <div><span>시작일</span><strong>{{ item.startDate }}</strong></div>
      <div><span>종료일</span><strong>{{ item.endDate }}</strong></div>
    </div>
  </div>
</template>
