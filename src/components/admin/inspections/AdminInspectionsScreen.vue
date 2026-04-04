<template>
  <AdminLayout>
    <section class="page-header-inline">
      <h1>검수 관리</h1>
      <div class="admin-summary-strip">
        <span>총 {{ inspections.length }}건</span>
        <span>대기 {{ waitingCount }}건</span>
      </div>
    </section>

    <section class="filter-bar admin-filter-bar">
      <div class="filter-chips">
        <button
          v-for="status in adminInspectionFilters"
          :key="status"
          class="chip admin-chip"
          :class="{ active: selectedFilter === status }"
          type="button"
          @click="selectedFilter = status"
        >
          {{ status }}
        </button>
      </div>

      <v-text-field
        v-model="searchQuery"
        class="page-search-field admin-search-field"
        density="comfortable"
        hide-details
        placeholder="상품명, 판매자 검색"
        prepend-inner-icon="mdi-magnify"
        variant="solo"
      />
    </section>

    <section class="admin-table-card surface-card">
      <table class="admin-transaction-table">
        <thead>
          <tr>
            <th>검수 번호</th>
            <th>상품명</th>
            <th>판매자</th>
            <th>신청일</th>
            <th>등급</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredInspections" :key="item.inspectionNo">
            <td class="admin-transaction-table__strong">{{ item.inspectionNo }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.seller }}</td>
            <td>{{ item.requestedAt }}</td>
            <td>{{ item.grade }}</td>
            <td><AdminStatusBadge :status="item.status" /></td>
            <td>
              <div class="admin-inline-actions">
                <button
                  class="ghost-button admin-inline-button"
                  type="button"
                  :disabled="item.status !== '검수 대기'"
                  @click="updateInspectionStatus(item.inspectionNo, '승인')"
                >
                  승인
                </button>
                <button
                  class="ghost-button admin-inline-button"
                  type="button"
                  :disabled="item.status !== '검수 대기'"
                  @click="updateInspectionStatus(item.inspectionNo, '반려')"
                >
                  반려
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredInspections.length === 0">
            <td class="admin-transaction-table__empty" colspan="7">조건에 맞는 검수 건이 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </section>
  </AdminLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import AdminLayout from '../../layout/AdminLayout.vue'
import AdminStatusBadge from '../shared/AdminStatusBadge.vue'
import { adminInspectionFilters, adminInspections } from '../../../data/admin'

const selectedFilter = ref('전체')
const searchQuery = ref('')
const inspections = ref(adminInspections.map((item) => ({ ...item })))

const waitingCount = computed(() => inspections.value.filter((item) => item.status === '검수 대기').length)

const filteredInspections = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()

  return inspections.value.filter((item) => {
    const matchesStatus = selectedFilter.value === '전체' || item.status === selectedFilter.value
    const matchesKeyword =
      !keyword ||
      item.productName.toLowerCase().includes(keyword) ||
      item.seller.toLowerCase().includes(keyword)

    return matchesStatus && matchesKeyword
  })
})

function updateInspectionStatus(inspectionNo, nextStatus) {
  inspections.value = inspections.value.map((item) => {
    if (item.inspectionNo !== inspectionNo) {
      return item
    }

    return {
      ...item,
      status: nextStatus,
      reason: nextStatus === '반려' ? '관리자 검수 결과 반려 처리' : '',
    }
  })
}
</script>
