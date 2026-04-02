<template>
  <MyPageLayout>
    <section class="page-header-inline">
      <h1>1:1 문의 내역</h1>
      <button class="primary-button" type="button" @click="openModal">+ 문의하기</button>
    </section>

    <div class="stack-list">
      <InquiryCard v-for="inquiry in inquiries" :key="inquiry.title + inquiry.date" :inquiry="inquiry" />
    </div>

    <DirectInquiryModal
      v-model="draftInquiry"
      :open="isModalOpen"
      @close="closeModal"
      @submit="submitInquiry"
    />
  </MyPageLayout>
</template>

<script setup>
import { ref } from 'vue'
import MyPageLayout from '../../layout/MyPageLayout.vue'
import InquiryCard from '../cards/InquiryCard.vue'
import DirectInquiryModal from './DirectInquiryModal.vue'
import { directInquiries } from '../../../data/mypage'

const inquiries = ref([...directInquiries])
const isModalOpen = ref(false)
const draftInquiry = ref({
  type: '기타',
  content: '',
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

  closeModal()
  resetDraft()
}
</script>
