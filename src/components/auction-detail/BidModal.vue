<script setup>
defineProps({
  assets: {
    type: Object,
    required: true,
  },
  bidAmount: {
    type: String,
    required: true,
  },
  buyNowAmount: {
    type: Number,
    required: true,
  },
  formatAmount: {
    type: Function,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
  minimumBidAmount: {
    type: Number,
    required: true,
  },
})

defineEmits(['buy-now', 'close', 'step-bid', 'submit-bid', 'update:bidAmount'])
</script>

<template>
  <div class="detail-inquiry-overlay" @click.self="$emit('close')">
    <section class="detail-bid-modal">
      <div class="detail-inquiry-header">
        <h3>입찰하기</h3>
        <button type="button" class="detail-inquiry-close" @click="$emit('close')">×</button>
      </div>

      <div class="detail-inquiry-summary">
        <img :src="assets.listWatchImage" :alt="item.title" class="detail-inquiry-thumb" />
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
            :value="bidAmount"
            type="text"
            :placeholder="`최소 ${formatAmount(minimumBidAmount)}`"
            @input="$emit('update:bidAmount', $event.target.value)"
          />
          <span>원</span>
        </label>

        <div class="detail-bid-quick-actions">
          <button type="button" class="detail-bid-quick-chip" @click="$emit('step-bid', -1)">- {{ item.bidUnit }}</button>
          <button type="button" class="detail-bid-quick-chip" @click="$emit('step-bid', 1)">+ {{ item.bidUnit }}</button>
        </div>
      </div>

      <div class="detail-bid-modal-actions">
        <button type="button" class="detail-buy-now-button" @click="$emit('buy-now')">
          <span>{{ formatAmount(buyNowAmount) }}원 으로</span>
          <strong>즉시 구매</strong>
        </button>
        <button type="button" class="detail-bid-submit-button" @click="$emit('submit-bid')">
          입찰하기
        </button>
      </div>
    </section>
  </div>
</template>
