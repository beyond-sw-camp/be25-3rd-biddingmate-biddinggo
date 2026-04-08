<template>
  <section class="page-header-inline">
      <h1>1:1 문의 내역</h1>
      <button class="primary-button" type="button" @click="openModal">+ 문의하기</button>
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
      <InquiryCard v-for="inquiry in filteredInquiries" :key="inquiry.title + inquiry.date" :inquiry="inquiry" />
  </div>

  <DirectInquiryModal
      v-model="draftInquiry"
      :open="isModalOpen"
      @close="closeModal"
      @submit="submitInquiry"
  />
</template>

<script setup>
import { computed, ref } from 'vue'
import InquiryCard from '../cards/InquiryCard.vue'
import DirectInquiryModal from './DirectInquiryModal.vue'
import { directInquiries } from '../../../data/mypage'

const inquiries = ref([...directInquiries])
const isModalOpen = ref(false)
const selectedTag = ref('전체')
const draftInquiry = ref({
  type: '기타',
  content: '',
})

const filterTags = computed(() => ['전체', ...new Set(inquiries.value.map((inquiry) => inquiry.status))])

const filteredInquiries = computed(() => {
  if (selectedTag.value === '전체') {
    return inquiries.value
  }

  return inquiries.value.filter((inquiry) => inquiry.status === selectedTag.value)
})

function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function resetDraft() {
  draftInquiry.value = {
    type: '기타',
    content: '',
  }
}

function submitInquiry() {
  if (!draftInquiry.value.content.trim()) return

  inquiries.value.unshift({
    status: '답변 대기',
    title: draftInquiry.value.type,
    date: '2026.04.02 16:30',
    question: draftInquiry.value.content.trim(),
  })

  selectedTag.value = '전체'
  closeModal()
  resetDraft()
}
</script>
