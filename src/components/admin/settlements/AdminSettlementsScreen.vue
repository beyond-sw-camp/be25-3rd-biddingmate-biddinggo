<template>
  <AdminLayout>
    <section class="page-header-block">
      <h1>정산 관리</h1>
    </section>

    <section class="filter-bar admin-filter-bar admin-filter-bar--compact">
      <div class="filter-chips">
        <button
          v-for="status in adminSettlementFilters"
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
            <th>정산 번호</th>
            <th>판매자</th>
            <th>총 판매액</th>
            <th>수수료</th>
            <th>정산 금액</th>
            <th>정산 기간</th>
            <th>처리일</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredSettlements" :key="item.settlementNo">
            <td class="admin-transaction-table__strong">{{ item.settlementNo }}</td>
            <td>{{ item.seller }}</td>
            <td>₩{{ item.grossSales }}</td>
            <td>-₩{{ item.fee }}</td>
            <td>₩{{ item.amount }}</td>
            <td>{{ item.period }}</td>
            <td>{{ item.processedAt }}</td>
            <td><AdminStatusBadge :status="item.status" /></td>
            <td>
              <button class="ghost-button admin-inline-button" type="button" @click="selectedSettlement = item">
                상세
              </button>
            </td>
          </tr>
          <tr v-if="filteredSettlements.length === 0">
            <td class="admin-transaction-table__empty" colspan="9">조건에 맞는 정산 내역이 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <AdminSettlementDetailModal
      v-if="selectedSettlement"
      :item="selectedSettlement"
      @close="selectedSettlement = null"
    />
  </AdminLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import AdminLayout from '../../layout/AdminLayout.vue'
import AdminStatusBadge from '../shared/AdminStatusBadge.vue'
import AdminSettlementDetailModal from './AdminSettlementDetailModal.vue'
import { adminSettlementFilters, adminSettlements } from '../../../data/admin'

const selectedFilter = ref('전체')
const selectedSettlement = ref(null)
const settlements = ref(adminSettlements.map((item) => ({ ...item })))

const filteredSettlements = computed(() => {
  if (selectedFilter.value === '전체') {
    return settlements.value
  }

  return settlements.value.filter((item) => item.status === selectedFilter.value)
})
</script>
