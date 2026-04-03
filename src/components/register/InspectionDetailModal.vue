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
          <img :src="inspectionProductImage" :alt="item.title" class="inspection-detail-image" />
        </div>

        <div class="inspection-detail-summary">
          <p class="inspection-detail-category">럭셔리 &gt; 시계 &gt; 남성용 시계</p>
          <span class="inspection-badge is-passed">검수 통과</span>
          <h3>{{ item.title }}</h3>

          <div class="inspection-detail-meta">
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

        <div class="inspection-detail-section">
          <h4>상품 설명</h4>
          <p>{{ item.description }}</p>
        </div>

        <div class="inspection-detail-section">
          <h4>배송 정보</h4>
          <p>우체국 택배</p>
          <p>1928391823798</p>
        </div>
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
