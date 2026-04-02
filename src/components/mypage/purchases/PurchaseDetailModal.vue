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
            dark: item.status === '배송 완료',
            muted: item.status !== '배송 완료' && item.status !== '발송 대기',
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
          <template v-if="item.shippingAddress.name">
            <p class="purchase-info-card__label">연락처</p>
            <strong>{{ item.shippingAddress.name }}</strong>
            <strong>{{ item.shippingAddress.phone }}</strong>
          </template>
          <template v-else>
            <div class="purchase-info-card purchase-info-card--alert">
              <p>배송지 정보를 등록해주세요</p>
            </div>
          </template>

          <template v-if="item.shippingAddress.zip">
            <p class="purchase-info-card__label purchase-info-card__label--spacing">주소</p>
            <strong>{{ item.shippingAddress.zip }}</strong>
            <strong>{{ item.shippingAddress.address1 }}</strong>
            <strong>{{ item.shippingAddress.address2 }}</strong>
          </template>
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
        <div v-else class="purchase-info-card purchase-info-card--empty"></div>
      </div>
    </div>

    <div v-if="showActions" class="purchase-modal__actions">
      <button class="secondary-button purchase-modal__action" type="button" @click="$emit('close')">취소</button>
      <button
        v-if="item.modalType === 'pending-no-address'"
        class="primary-button purchase-modal__action"
        type="button"
        @click="$emit('next', 'shipping-form')"
      >
        배송지 정보 등록
      </button>
      <button
        v-else-if="item.modalType === 'delivery-complete-awaiting-confirm'"
        class="primary-button purchase-modal__action"
        type="button"
        @click="$emit('confirm-purchase')"
      >
        구매 확정
      </button>
    </div>
  </BaseModal>

  <BaseModal
    v-else-if="mode === 'shipping-form'"
    panel-class="purchase-modal purchase-modal--form"
    @close="$emit('close')"
  >
    <div class="purchase-modal__head">
      <h2>배송지 정보 등록</h2>
    </div>

    <div class="purchase-form">
      <label>
        <span>이름 <em>*</em></span>
        <input :value="form.name" readonly type="text" />
      </label>
      <label>
        <span>전화번호 <em>*</em></span>
        <input :value="form.phone" readonly type="text" />
      </label>
      <label>
        <span>주소 <em>*</em></span>
        <div class="purchase-address-preview">
          <div>
            <strong>{{ form.zip }}</strong>
            <p>{{ form.address1 }}</p>
            <p>{{ form.address2 }}</p>
          </div>
          <button class="ghost-button" type="button" @click="$emit('next', 'address-book')">변경</button>
        </div>
      </label>
    </div>

    <button class="primary-button purchase-form__submit" type="button" @click="$emit('save-address')">
      배송지 정보 등록
    </button>
  </BaseModal>

  <BaseModal
    v-else-if="mode === 'address-book'"
    panel-class="purchase-modal purchase-modal--address-book"
    @close="$emit('close')"
  >
    <template #action>
      <button class="base-modal__close" type="button" @click="$emit('back', 'shipping-form')">&times;</button>
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
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../../BaseModal.vue'
import { modalAddressBook, watchImage } from '../../../data/mypage'

const props = defineProps({
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

defineEmits(['close', 'next', 'back', 'save-address', 'select-address', 'confirm-purchase'])

const addresses = modalAddressBook

const showActions = computed(() =>
  props.item.modalType === 'pending-no-address' || props.item.modalType === 'delivery-complete-awaiting-confirm',
)
</script>
