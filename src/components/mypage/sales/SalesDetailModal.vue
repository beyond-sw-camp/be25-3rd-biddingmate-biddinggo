<template>
  <BaseModal
    v-if="mode === 'detail'"
    panel-class="purchase-modal purchase-modal--detail"
    @close="$emit('close')"
  >
    <div class="purchase-modal__grid">
      <img :src="item.image || watchImage" :alt="item.name" class="purchase-modal__image" />

      <div class="purchase-modal__summary">
        <p class="purchase-modal__category">{{ item.category || '럭셔리 > 시계 > 남성용 시계' }}</p>
        <span
          class="status-pill"
          :class="{
            dark: item.status === '배송중',
            muted: item.status === '발송 대기' || item.status === '구매 확정' || item.status === '정산 완료',
          }"
        >
          {{ item.status }}
        </span>
        <h2>{{ item.name }}</h2>
        <div class="purchase-price-box">
          <p>낙찰가</p>
          <strong>{{ item.price }}</strong>
        </div>
      </div>

      <div class="purchase-info-block">
        <h3>배송지 정보</h3>
        <div v-if="item.shippingAddress" class="purchase-info-card">
          <p class="purchase-info-card__label">연락처</p>
          <strong>{{ item.shippingAddress.name }}</strong>
          <strong>{{ item.shippingAddress.phone }}</strong>
          <p class="purchase-info-card__label purchase-info-card__label--spacing">주소</p>
          <strong>{{ item.shippingAddress.zip }}</strong>
          <strong>{{ item.shippingAddress.address1 }}</strong>
          <strong>{{ item.shippingAddress.address2 }}</strong>
        </div>
        <div v-else class="purchase-info-card purchase-info-card--alert">
          <p>배송지 정보를 등록해주세요</p>
        </div>
      </div>

      <div class="purchase-info-block">
        <h3>배송 정보</h3>
        <div v-if="item.shippingInfo" class="purchase-info-card">
          <strong>{{ item.shippingInfo.courier }}</strong>
          <strong>{{ item.shippingInfo.trackingNumber }}</strong>
        </div>
        <div
          v-else-if="item.modalType === 'seller-needs-shipping-info'"
          class="purchase-info-card purchase-info-card--alert"
        >
          <p>배송 정보를 등록해주세요</p>
        </div>
        <div v-else class="purchase-info-card purchase-info-card--empty"></div>
      </div>
    </div>

    <div v-if="item.modalType === 'seller-needs-shipping-info'" class="purchase-modal__actions">
      <button class="secondary-button purchase-modal__action" type="button" @click="$emit('close')">취소</button>
      <button class="primary-button purchase-modal__action" type="button" @click="$emit('next', 'shipping-form')">
        배송 정보 등록
      </button>
    </div>
  </BaseModal>

  <BaseModal v-else panel-class="purchase-modal purchase-modal--form" @close="$emit('close')">
    <div class="purchase-modal__head">
      <h2>배송 정보 등록</h2>
    </div>

    <div class="purchase-form sales-form">
      <label>
        <span>택배사 <em>*</em></span>
        <select :value="form.courier" @change="emitForm('courier', $event.target.value)">
          <option disabled value="">선택</option>
          <option v-for="option in courierOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </label>

      <label>
        <span>송장 번호 <em>*</em></span>
        <input
          :value="form.trackingNumber"
          type="text"
          placeholder="송장 번호를 입력해 주세요."
          @input="emitForm('trackingNumber', $event.target.value)"
        />
      </label>
    </div>

    <button class="primary-button purchase-form__submit" type="button" @click="$emit('save-shipping')">
      등록하기
    </button>
  </BaseModal>
</template>

<script setup>
import BaseModal from '../../BaseModal.vue'
import { courierOptions } from '../../../data/salesHistory'
import { watchImage } from '../../../data/mypage'

defineProps({
  item: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close', 'next', 'update-form', 'save-shipping'])

function emitForm(field, value) {
  emit('update-form', field, value)
}
</script>
