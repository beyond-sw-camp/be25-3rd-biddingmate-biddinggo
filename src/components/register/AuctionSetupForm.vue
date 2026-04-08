<script setup>
defineProps({
  auctionForm: {
    type: Object,
    required: true,
  },
  bidUnitOptions: {
    type: Array,
    required: true,
  },
  durationOptions: {
    type: Array,
    required: true,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  processing: {
    type: Boolean,
    default: false,
  },
  selectedBidUnit: {
    type: String,
    required: true,
  },
  selectedDuration: {
    type: String,
    required: true,
  },
  submitted: {
    type: Boolean,
    required: true,
  },
  successMessage: {
    type: String,
    required: true,
  },
  cancelLabel: {
    type: String,
    default: '취소',
  },
  showTypeToggles: {
    type: Boolean,
    default: true,
  },
  submitLabel: {
    type: String,
    default: '확인',
  },
})

defineEmits(['cancel', 'select-bid-unit', 'select-duration', 'submit', 'toggle-field'])
</script>

<template>
  <section class="register-form-card register-auction-card">
    <div class="auction-settings">
      <div v-if="showTypeToggles" class="auction-toggle-grid">
        <article class="auction-toggle-card">
          <div class="auction-toggle-copy">
            <div class="auction-toggle-icon is-extend">↻</div>
            <div>
              <strong>연장 경매</strong>
              <p>종료 직전 입찰 시 시간 연장</p>
            </div>
          </div>
          <button
            type="button"
            class="auction-switch"
            :class="{ 'is-on': auctionForm.extendAuction }"
            @click="$emit('toggle-field', 'extendAuction')"
          >
            <span />
          </button>
        </article>

        <article class="auction-toggle-card">
          <div class="auction-toggle-copy">
            <div class="auction-toggle-icon is-timedeal">⚡</div>
            <div>
              <strong>타임딜</strong>
              <p>단시간 내 고가가 낙찰 유도</p>
            </div>
          </div>
          <button
            type="button"
            class="auction-switch"
            :class="[{ 'is-on': auctionForm.timeDeal }, 'is-danger']"
            @click="$emit('toggle-field', 'timeDeal')"
          >
            <span />
          </button>
        </article>
      </div>

      <div class="auction-field-grid">
        <label class="register-field">
          <span class="register-label">경매 시작가 <span>*</span></span>
          <div class="auction-money-field">
            <input v-model="auctionForm.startPrice" type="number" placeholder="0" />
            <span>원</span>
          </div>
        </label>

        <label class="register-field">
          <span class="register-label">즉시 구매가</span>
          <div class="auction-money-field">
            <input v-model="auctionForm.buyNowPrice" type="number" placeholder="0" />
            <span>원</span>
          </div>
        </label>
      </div>

      <div class="auction-option-section">
        <span class="register-label">입찰 단위 <span>*</span></span>
        <div class="auction-chip-row">
          <button
            v-for="option in bidUnitOptions"
            :key="option"
            type="button"
            class="auction-chip"
            :class="{ 'is-selected': selectedBidUnit === option }"
            @click="$emit('select-bid-unit', option)"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <div class="auction-option-section">
        <span class="register-label">경매 기간 <span>*</span></span>

        <div class="auction-date-grid">
          <div class="auction-date-card">
            <span class="auction-date-label">시작 일시</span>
            <div class="auction-date-value-row">
              <div class="auction-date-value">🗓 {{ auctionForm.startDate }}</div>
              <div class="auction-date-value">🕒 {{ auctionForm.startTime }}</div>
            </div>
          </div>

          <div class="auction-date-card">
            <span class="auction-date-label">종료 일시</span>
            <div class="auction-date-value-row">
              <div class="auction-date-value">🗓 {{ auctionForm.endDate }}</div>
              <div class="auction-date-value">🕒 {{ auctionForm.endTime }}</div>
            </div>
          </div>
        </div>

        <div class="auction-chip-row is-duration">
          <button
            v-for="option in durationOptions"
            :key="option"
            type="button"
            class="auction-chip"
            :class="{ 'is-selected': selectedDuration === option }"
            @click="$emit('select-duration', option)"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <div v-if="errorMessage" class="register-success-banner is-error">
        {{ errorMessage }}
      </div>

      <div v-else-if="submitted" class="register-success-banner">
        {{ successMessage }}
      </div>

      <div class="register-actions">
        <button type="button" class="register-secondary-button" :disabled="processing" @click="$emit('cancel')">
          {{ cancelLabel }}
        </button>
        <button type="button" class="register-primary-button" :disabled="processing" @click="$emit('submit')">
          {{ processing ? '처리 중...' : submitLabel }}
        </button>
      </div>
    </div>
  </section>
</template>
