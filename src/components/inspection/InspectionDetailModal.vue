<script setup>
import BaseModal from '../shared/BaseModal.vue'

defineProps({
  assets: {
    type: Object,
    required: true,
  },
  badgeClass: {
    type: Function,
    required: true,
  },
  detailActionLabel: {
    type: Function,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
})

defineEmits(['close', 'handle-action'])
</script>

<template>
  <BaseModal overlay-class="inspection-status-overlay" panel-class="inspection-status-modal" @close="$emit('close')">
    <template #header>
      <button type="button" class="inspection-status-close" @click="$emit('close')">
        ×
      </button>
    </template>

    <div class="inspection-status-grid">
        <div class="inspection-status-image-card">
          <img :src="item.image || assets.listWatchImage" :alt="item.title" class="inspection-status-image" />
        </div>

        <div class="inspection-status-summary">
          <p class="inspection-status-category">{{ item.categoryLabel || '카테고리 정보 없음' }}</p>
          <span class="inspection-badge" :class="badgeClass(item.status)">
            {{ item.statusLabel || item.status }}
          </span>
          <h3>{{ item.title }}</h3>

          <div class="inspection-status-meta">
            <div>
              <span>브랜드</span>
              <strong>{{ item.brand }}</strong>
            </div>
            <div>
              <span>검수일</span>
              <strong>{{ item.inspectionDate }}</strong>
            </div>
            <div>
              <span>검수 등급</span>
              <strong class="is-grade">{{ item.inspectionGrade }}</strong>
            </div>
          </div>
        </div>

        <div class="inspection-status-section">
          <h4>상품 설명</h4>
          <p>{{ item.description }}</p>
        </div>

        <div class="inspection-status-section">
          <h4>배송 정보</h4>

          <div v-if="item.status === 'PENDING' && !item.carrier && !item.trackingNumber" class="inspection-status-alert">
            <span class="inspection-status-alert-icon">!</span>
            <p>배송 정보를 등록해주세요</p>
          </div>

          <template v-else>
            <p>{{ item.carrier || '등록된 택배사 없음' }}</p>
            <p>{{ item.trackingNumber || '등록된 송장 번호 없음' }}</p>
          </template>
        </div>
      </div>

      <div class="inspection-status-actions">
        <button type="button" class="register-secondary-button" @click="$emit('close')">
          {{ item.status === 'PENDING' ? '신청 취소' : '닫기' }}
        </button>
        <button type="button" class="register-primary-button" @click="$emit('handle-action')">
          {{ detailActionLabel(item.status) }}
        </button>
      </div>
  </BaseModal>
</template>
