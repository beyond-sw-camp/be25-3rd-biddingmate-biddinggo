<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>포인트 관리</h1>
    </section>

    <section class="hero-card hero-card--left">
      <p>보유 포인트</p>
      <strong>{{ formatAmount(currentPoints) }}</strong>
      <div class="button-row">
        <button class="primary-button" type="button" @click="openChargeModal">충전하기</button>
        <button class="secondary-button" type="button" @click="openWithdrawModal">인출하기</button>
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <h2>포인트 내역</h2>
      </div>
      <div class="stack-list">
        <article v-for="entry in history" :key="entry.title + entry.date" class="point-row">
          <div class="point-row__left">
            <span class="point-icon" :class="entry.tone">{{ entry.tone === 'minus' ? '-' : '+' }}</span>
            <div>
              <h3>{{ entry.title }}</h3>
              <p>{{ entry.date }}</p>
            </div>
          </div>
          <strong :class="entry.tone">{{ entry.amount }}</strong>
        </article>
      </div>
    </section>

    <PointActionModal
      :open="Boolean(modalMode)"
      :mode="modalMode"
      :title="modalTitle"
      :current-points="currentPoints"
      :amount="amount"
      :presets="presets"
      :selected-preset="selectedPreset"
      :expected-points="expectedPoints"
      :expected-label="expectedLabel"
      :amount-label="amountLabel"
      :action-label="actionLabel"
      :virtual-account="virtualAccount"
      @close="closeModal"
      @preset="setPreset"
      @submit="submitModal"
      @confirm="confirmVirtualAccount"
    />
  </MyPageLayout>
</template>

<script setup>
import MyPageLayout from '../../MyPageLayout.vue'
import PointActionModal from './PointActionModal.vue'
import { usePointModal } from '../../../composables/usePointModal'

const {
  actionLabel,
  amount,
  amountLabel,
  closeModal,
  confirmVirtualAccount,
  currentPoints,
  expectedLabel,
  expectedPoints,
  formatAmount,
  history,
  modalMode,
  modalTitle,
  openChargeModal,
  openWithdrawModal,
  presets,
  selectedPreset,
  setPreset,
  submitModal,
  virtualAccount,
} = usePointModal()
</script>
