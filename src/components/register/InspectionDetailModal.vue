<script setup>
defineProps({
  inspectionProductImage: {
    type: String,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
})

defineEmits(['close', 'start-auction'])
</script>

<template>
  <div class="inspection-detail-overlay" @click.self="$emit('close')">
    <section class="inspection-detail-modal">
      <button type="button" class="inspection-detail-close" @click="$emit('close')">
        ×
      </button>

      <div class="inspection-detail-grid">
        <div class="inspection-detail-image-card">
          <img :src="item.image || inspectionProductImage" :alt="item.title" class="inspection-detail-image" />
        </div>

        <div class="inspection-detail-summary">
          <p class="inspection-detail-kicker">사전 검수 상품</p>
          <div class="inspection-detail-heading">
            <span class="inspection-detail-status">검수 통과</span>
            <p class="inspection-detail-category">{{ item.categoryLabel || '카테고리 정보 없음' }}</p>
          </div>
          <h3>{{ item.title }}</h3>

          <div class="inspection-detail-meta">
            <article class="inspection-detail-meta-card">
              <span>브랜드</span>
              <strong>{{ item.brand }}</strong>
            </article>
            <article class="inspection-detail-meta-card">
              <span>검수일</span>
              <strong>{{ item.inspectionDate }}</strong>
            </article>
            <article class="inspection-detail-meta-card">
              <span>검수 등급</span>
              <strong class="is-grade">{{ item.inspectionGrade }}</strong>
            </article>
          </div>
        </div>
      </div>

      <div class="inspection-detail-info-grid">
        <article class="inspection-detail-section inspection-detail-section--copy">
          <h4>상품 설명</h4>
          <p>{{ item.description }}</p>
        </article>

        <article class="inspection-detail-section inspection-detail-section--shipping">
          <h4>배송 정보</h4>
          <div class="inspection-detail-shipping-list">
            <div>
              <span>택배사</span>
              <strong>{{ item.carrier || '배송 정보 미등록' }}</strong>
            </div>
            <div>
              <span>송장 번호</span>
              <strong>{{ item.trackingNumber || '-' }}</strong>
            </div>
          </div>
        </article>
      </div>

      <div class="inspection-detail-actions">
        <button type="button" class="register-secondary-button" @click="$emit('close')">
          반환 신청
        </button>
        <button type="button" class="register-primary-button" @click="$emit('start-auction')">
          경매 등록
        </button>
      </div>
    </section>
  </div>
</template>
