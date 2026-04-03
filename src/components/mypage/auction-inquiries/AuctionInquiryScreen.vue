<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>구매 / 판매 문의 내역</h1>
    </section>

    <section class="filter-bar">
      <div class="filter-chips">
        <button
          v-for="tag in filterTags"
          :key="tag"
          class="chip"
          :class="{ active: selectedTag === tag }"
          type="button"
          @click="selectedTag = tag"
        >
          {{ tag }}
        </button>
      </div>
    </section>

    <div class="stack-list">
      <InquiryCard
        v-for="inquiry in filteredInquiries"
        :key="inquiry.title + inquiry.date"
        :inquiry="inquiry"
        allow-reply
        @submit-reply="submitReply(inquiry, $event)"
      />
    </div>
  </MyPageLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import MyPageLayout from '../../layout/MyPageLayout.vue'
import InquiryCard from '../cards/InquiryCard.vue'
import { auctionInquiries } from '../../../data/mypage'

const selectedTag = ref('전체')
const filterTags = ['전체', '구매', '판매']

const inquiries = ref(
  auctionInquiries.map((inquiry, index) => ({
    ...inquiry,
    inquiryType: index % 2 === 0 ? '구매' : '판매',
    pendingAction: inquiry.pendingAction ? '답변하기' : inquiry.pendingAction,
  }))
)

const filteredInquiries = computed(() => {
  if (selectedTag.value === '전체') {
    return inquiries.value
  }

  return inquiries.value.filter((inquiry) => inquiry.inquiryType === selectedTag.value)
})

function submitReply(targetInquiry, content) {
  Object.assign(targetInquiry, {
    status: '답변 완료',
    answerAuthor: '판매자 답변',
    answerDate: '2026.04.03 16:30',
    answer: content,
    pendingAction: null,
  })
}
</script>
