<template>
  <AdminLayout>
    <section class="page-header-block">
      <h1>1:1 문의 관리</h1>
    </section>

    <section class="filter-bar admin-filter-bar admin-filter-bar--compact">
      <div class="filter-chips">
        <button
          v-for="status in adminInquiryFilters"
          :key="status"
          class="chip admin-chip"
          :class="{ active: selectedFilter === status }"
          type="button"
          @click="selectedFilter = status"
        >
          {{ status }}
        </button>
      </div>
    </section>

    <section class="stack-list admin-inquiry-stack">
      <AdminInquiryCard
        v-for="inquiry in filteredInquiries"
        :key="inquiry.id"
        :expanded="expandedIds.has(inquiry.id)"
        :inquiry="inquiry"
        @submit-reply="submitReply(inquiry.id, $event)"
        @toggle="toggleExpanded(inquiry.id)"
      />
    </section>
  </AdminLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import AdminLayout from '../../layout/AdminLayout.vue'
import { adminInquiries, adminInquiryFilters } from '../../../data/admin'
import AdminInquiryCard from './AdminInquiryCard.vue'

const selectedFilter = ref('전체')
const inquiries = ref(adminInquiries.map((item) => ({ ...item })))
const expandedIds = ref(new Set(['inq-1', 'inq-2']))

const filteredInquiries = computed(() => {
  if (selectedFilter.value === '전체') {
    return inquiries.value
  }

  return inquiries.value.filter((inquiry) => inquiry.status === selectedFilter.value)
})

function toggleExpanded(id) {
  const next = new Set(expandedIds.value)

  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }

  expandedIds.value = next
}

function submitReply(id, content) {
  const nextInquiries = inquiries.value.map((inquiry) => {
    if (inquiry.id !== id) {
      return inquiry
    }

    return {
      ...inquiry,
      status: '답변 완료',
      answer: {
        author: '관리자 답변',
        createdAt: '2026.04.04 10:30',
        content,
      },
    }
  })

  inquiries.value = nextInquiries
}
</script>
