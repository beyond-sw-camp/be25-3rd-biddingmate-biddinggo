<template>
  <AdminLayout>
    <section class="page-header-inline">
      <h1>공지사항 관리</h1>
      <button class="primary-button" type="button" @click="openCreateModal">+ 공지사항 등록</button>
    </section>

    <section class="filter-bar admin-filter-bar admin-filter-bar--compact">
      <div class="filter-chips">
        <button
          v-for="status in adminNoticeStatusFilters"
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

    <section class="admin-table-card surface-card">
      <table class="admin-transaction-table">
        <thead>
          <tr>
            <th>공지 번호</th>
            <th>제목</th>
            <th>등록일</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="notice in filteredNotices" :key="notice.noticeNo">
            <td class="admin-transaction-table__strong">{{ notice.noticeNo }}</td>
            <td>{{ notice.title }}</td>
            <td>{{ notice.createdAt }}</td>
            <td><AdminStatusBadge :status="notice.status" /></td>
            <td>
              <div class="admin-inline-actions">
                <button class="ghost-button admin-inline-button" type="button" @click="openEditModal(notice)">
                  수정
                </button>
                <button class="ghost-button admin-inline-button" type="button" @click="toggleNoticeStatus(notice.noticeNo)">
                  {{ notice.status === '게시중' ? '비공개' : '게시' }}
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredNotices.length === 0">
            <td class="admin-transaction-table__empty" colspan="5">조건에 맞는 공지사항이 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <AdminNoticeModal
      v-if="isModalOpen"
      :notice="editingNotice"
      @close="closeModal"
      @submit="saveNotice"
    />
  </AdminLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import AdminLayout from '../../layout/AdminLayout.vue'
import AdminStatusBadge from '../shared/AdminStatusBadge.vue'
import AdminNoticeModal from './AdminNoticeModal.vue'
import { adminNoticeStatusFilters, adminNotices } from '../../../data/admin'

const selectedFilter = ref('전체')
const notices = ref(adminNotices.map((notice) => ({ ...notice })))
const isModalOpen = ref(false)
const editingNotice = ref(null)

const filteredNotices = computed(() => {
  if (selectedFilter.value === '전체') {
    return notices.value
  }

  return notices.value.filter((notice) => notice.status === selectedFilter.value)
})

function openCreateModal() {
  editingNotice.value = null
  isModalOpen.value = true
}

function openEditModal(notice) {
  editingNotice.value = notice
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  editingNotice.value = null
}

function saveNotice(payload) {
  if (editingNotice.value) {
    notices.value = notices.value.map((notice) => {
      if (notice.noticeNo !== editingNotice.value.noticeNo) {
        return notice
      }

      return {
        ...notice,
        ...payload,
      }
    })
  } else {
    const nextNo = `N-${200 + notices.value.length + 1}`
    notices.value.unshift({
      noticeNo: nextNo,
      title: payload.title,
      content: payload.content,
      createdAt: '2026.04.04 12:00',
      status: '게시중',
    })
  }

  closeModal()
}

function toggleNoticeStatus(noticeNo) {
  notices.value = notices.value.map((notice) => {
    if (notice.noticeNo !== noticeNo) {
      return notice
    }

    return {
      ...notice,
      status: notice.status === '게시중' ? '비공개' : '게시중',
    }
  })
}
</script>
