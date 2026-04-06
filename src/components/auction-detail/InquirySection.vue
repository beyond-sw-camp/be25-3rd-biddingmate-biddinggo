<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="inquiry-section">
    <div class="inquiry-heading">상품 문의 ({{ item.inquiries.length }})</div>
    <div v-if="item.inquiries.length" class="inquiry-list">
      <article
        v-for="(inquiry, index) in item.inquiries"
        :key="`${inquiry.title}-${index}`"
        class="inquiry-item"
        :class="{ 'is-expanded': index === 0 }"
      >
        <div class="inquiry-summary">
          <div class="inquiry-summary-left">
            <span class="status-badge" :class="{ 'is-pending': inquiry.status === '답변 대기' }">
              {{ inquiry.status }}
            </span>
            <div class="inquiry-text">
              <strong>{{ inquiry.title }}</strong>
              <span>{{ inquiry.meta }}</span>
            </div>
          </div>
          <span class="inquiry-toggle">{{ index === 0 ? '⌃' : '⌄' }}</span>
        </div>

        <div v-if="index === 0" class="inquiry-detail">
          <div class="question-box">
            {{ inquiry.question }}
          </div>
          <div class="answer-box">
            <div class="answer-label">판매자 답변</div>
            <p>{{ inquiry.answer }}</p>
          </div>
        </div>
      </article>
    </div>
    <div v-else class="question-box">아직 등록된 문의가 없습니다.</div>
  </div>
</template>
