<template>
  <div class="modal-backdrop admin-modal-backdrop" @click.self="$emit('close')">
    <section class="admin-settlement-modal">
      <header class="admin-settlement-modal__head">
        <h2>정산 영수증</h2>
        <button class="admin-settlement-modal__close" type="button" @click="$emit('close')">
          <v-icon icon="mdi-close" />
        </button>
      </header>

      <dl class="admin-settlement-modal__list">
        <div>
          <dt>정산 상태</dt>
          <dd><AdminStatusBadge :status="item.status" /></dd>
        </div>
        <div>
          <dt>정산 금액</dt>
          <dd>₩{{ item.amount }}</dd>
        </div>
        <div>
          <dt>총 판매액</dt>
          <dd>₩{{ item.grossSales }}</dd>
        </div>
        <div>
          <dt>수수료</dt>
          <dd>-₩{{ item.fee }}</dd>
        </div>
        <div>
          <dt>정산 기간</dt>
          <dd>{{ item.period }}</dd>
        </div>
        <div>
          <dt>처리일</dt>
          <dd>{{ item.processedAt }}</dd>
        </div>
        <div>
          <dt>판매자 닉네임</dt>
          <dd>{{ item.seller }}</dd>
        </div>
        <div>
          <dt>판매자 이메일</dt>
          <dd>{{ item.sellerEmail }}</dd>
        </div>
        <div>
          <dt>판매자 계좌 정보</dt>
          <dd>{{ item.sellerAccount }}</dd>
        </div>
      </dl>

      <button class="primary-button admin-settlement-modal__confirm" type="button" @click="$emit('close')">확인</button>
    </section>
  </div>
</template>

<script setup>
import AdminStatusBadge from '../shared/AdminStatusBadge.vue'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})

defineEmits(['close'])
</script>
