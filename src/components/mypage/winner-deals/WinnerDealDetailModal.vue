<template>
  <BaseModal
    v-if="mode === 'detail'"
    panel-class="purchase-modal purchase-modal--detail"
    @close="$emit('close')"
  >
    <div class="purchase-modal__grid">
      <img :src="item.image || watchImage" :alt="item.name" class="purchase-modal__image" />

      <div class="purchase-modal__summary">
        <p class="purchase-modal__category">{{ item.category || '낙찰 거래' }}</p>
        <StatusBadge :status="item.status" />
        <h2>{{ item.name }}</h2>
        <div class="purchase-price-box">
          <p>낙찰가</p>
          <strong>{{ item.price }}</strong>
        </div>
      </div>

      <div class="purchase-info-block">
        <h3>배송지 정보</h3>
        <div
          v-if="item.shippingAddress"
          class="purchase-info-card"
          :class="{ 'purchase-info-card--alert': !item.shippingAddress.name }"
        >
          <template v-if="item.shippingAddress.name">
            <p class="purchase-info-card__label">연락처</p>
            <strong>{{ item.shippingAddress.name }}</strong>
            <strong>{{ item.shippingAddress.phone }}</strong>
            <p class="purchase-info-card__label purchase-info-card__label--spacing">주소</p>
            <strong>{{ item.shippingAddress.zip }}</strong>
            <strong>{{ item.shippingAddress.address1 }}</strong>
            <strong>{{ item.shippingAddress.address2 }}</strong>
          </template>
          <p v-else>배송지 정보를 등록해 주세요.</p>
        </div>

        <div v-else class="purchase-info-card purchase-info-card--alert winnerdeal-info-card--alert">
          <p>배송지 정보를 등록해 주세요.</p>
        </div>
      </div>

      <div class="purchase-info-block">
        <h3>배송 정보</h3>
        <div v-if="item.shippingInfo" class="purchase-info-card">
          <strong>{{ item.shippingInfo.courier || '-' }}</strong>
          <strong>{{ item.shippingInfo.trackingNumber || '-' }}</strong>
        </div>

        <div
          v-else-if="variant === 'sale' && item.modalType === 'seller-needs-shipping-info'"
          class="purchase-info-card purchase-info-card--alert winnerdeal-info-card--alert"
        >
          <p>배송 정보를 등록해 주세요.</p>
        </div>
      </div>
    </div>

    <div v-if="showActions" class="purchase-modal__actions">
      <button class="secondary-button purchase-modal__action" type="button" @click="$emit('close')">취소</button>
      <p v-if="errorMessage" class="purchase-modal__error">{{ errorMessage }}</p>

      <button
        v-if="variant === 'purchase' && item.modalType === 'pending-no-address'"
        class="primary-button purchase-modal__action"
        type="button"
        :disabled="saving"
        @click="$emit('next', 'shipping-form')"
      >
        배송지 정보 등록
      </button>

      <button
        v-else-if="variant === 'purchase' && item.modalType === 'delivery-complete-awaiting-confirm'"
        class="primary-button purchase-modal__action"
        type="button"
        :disabled="saving"
        @click="$emit('confirm-purchase')"
      >
        구매 확정
      </button>

      <button
        v-else-if="variant === 'sale' && item.modalType === 'seller-needs-shipping-info'"
        class="primary-button purchase-modal__action"
        type="button"
        :disabled="saving"
        @click="$emit('next', 'shipping-form')"
      >
        배송 정보 등록
      </button>
    </div>
  </BaseModal>

  <BaseModal
    v-else-if="variant === 'purchase' && mode === 'shipping-form'"
    panel-class="purchase-modal purchase-modal--form"
    @close="$emit('close')"
  >
    <div class="purchase-modal__head">
      <h2>배송지 정보 등록</h2>
    </div>

    <div class="purchase-form">
      <label>
        <span>이름 <em>*</em></span>
        <input
          :value="form.name"
          type="text"
          placeholder="수령인을 입력해 주세요"
          @input="emitForm('name', $event.target.value)"
        />
      </label>
      <label>
        <span>전화번호 <em>*</em></span>
        <input
          :value="form.phone"
          type="text"
          placeholder="연락처를 입력해 주세요"
          @input="emitForm('phone', $event.target.value)"
        />
      </label>
      <label>
        <span>주소 <em>*</em></span>
        <div class="purchase-address-preview">
          <div>
            <strong>{{ form.zip || '배송지를 선택해 주세요' }}</strong>
            <p>{{ form.address1 }}</p>
            <p>{{ form.address2 }}</p>
          </div>
          <button class="ghost-button" type="button" @click="$emit('next', 'address-book')">변경</button>
        </div>
      </label>
    </div>

    <p v-if="errorMessage" class="purchase-modal__error">{{ errorMessage }}</p>
    <button class="primary-button purchase-form__submit" type="button" :disabled="saving" @click="$emit('save-address')">
      {{ saving ? '등록 중...' : '배송지 정보 등록' }}
    </button>
  </BaseModal>

  <BaseModal
    v-else-if="variant === 'purchase' && mode === 'address-book'"
    panel-class="purchase-modal purchase-modal--address-book"
    @close="$emit('close')"
  >
    <template #action>
      <button class="base-modal__close" type="button" @click="$emit('back', 'shipping-form')">
        <v-icon icon="mdi-close" />
      </button>
    </template>

    <div class="purchase-address-list">
      <article
        v-for="address in addresses"
        :key="address.zip + address.address1"
        class="purchase-address-card"
        :class="{ primary: address.primary }"
        @click="$emit('select-address', address)"
      >
        <div class="purchase-address-card__header">
          <strong>{{ address.zip }}</strong>
          <span v-if="address.primary" class="primary-tag">기본 배송지</span>
        </div>
        <p>{{ address.address1 }}</p>
        <p>{{ address.address2 }}</p>
      </article>
    </div>

    <div class="purchase-address-book__actions">
      <button class="primary-button" type="button" @click="$emit('close')">+ 배송지 추가</button>
    </div>
  </BaseModal>

  <BaseModal
    v-else-if="variant === 'sale' && mode === 'shipping-form'"
    panel-class="purchase-modal purchase-modal--form"
    @close="$emit('close')"
  >
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
        <span>운장 번호 <em>*</em></span>
        <input
          :value="form.trackingNumber"
          type="text"
          placeholder="운송장 번호를 입력해 주세요"
          @input="emitForm('trackingNumber', $event.target.value)"
        />
      </label>
    </div>

    <p v-if="errorMessage" class="purchase-modal__error">{{ errorMessage }}</p>
    <button class="primary-button purchase-form__submit" type="button" :disabled="saving" @click="$emit('save-shipping')">
      {{ saving ? '등록 중...' : '등록하기' }}
    </button>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../../BaseModal.vue'
import StatusBadge from '../cards/StatusBadge.vue'
import { modalAddressBook, watchImage } from '../../../data/mypage'
import { courierOptions } from '../../../data/salesHistory'

const props = defineProps({
  errorMessage: {
    type: String,
    default: '',
  },
  form: {
    type: Object,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  saving: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    required: true,
    validator: (value) => ['purchase', 'sale'].includes(value),
  },
})

const emit = defineEmits([
  'close',
  'next',
  'back',
  'save-address',
  'select-address',
  'confirm-purchase',
  'update-form',
  'save-shipping',
])

const addresses = modalAddressBook

const showActions = computed(() => {
  if (props.variant === 'purchase') {
    return (
      props.item.modalType === 'pending-no-address' ||
      props.item.modalType === 'delivery-complete-awaiting-confirm'
    )
  }

  return props.item.modalType === 'seller-needs-shipping-info'
})

function emitForm(field, value) {
  emit('update-form', field, value)
}
</script>