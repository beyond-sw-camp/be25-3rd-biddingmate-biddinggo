<template>
  <AdminLayout>
    <section class="page-header-block">
      <h1>거래 내역 조회</h1>
    </section>

    <section class="filter-bar admin-filter-bar">
      <div class="filter-chips">
        <button
          v-for="status in adminTransactionStatusFilters"
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
        placeholder="상품명, 거래 번호 검색"
        prepend-inner-icon="mdi-magnify"
        variant="solo"
      />
    </section>

    <section class="admin-table-card surface-card">
      <table class="admin-transaction-table">
        <thead>
          <tr>
            <th>거래 번호</th>
            <th>판매자</th>
            <th>구매자</th>
            <th>상품명</th>
            <th>거래 금액</th>
            <th>거래 일자</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in filteredRows" :key="row.tradeNo" @click="openDetail(row)">
            <td class="admin-transaction-table__strong">{{ row.tradeNo }}</td>
            <td>{{ row.seller }}</td>
            <td>{{ row.buyer }}</td>
            <td>{{ row.productName }}</td>
            <td>{{ row.amount }}</td>
            <td>{{ row.tradedAt }}</td>
            <td>
              <AdminStatusBadge :status="row.status" />
            </td>
          </tr>
          <tr v-if="filteredRows.length === 0">
            <td class="admin-transaction-table__empty" colspan="7">조건에 맞는 거래 내역이 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <AdminTransactionDetailModal
      v-if="selectedTrade"
      :item="selectedTrade"
      @close="closeDetail"
      @open-shipping="openShippingModal"
    />

    <AdminShippingInfoModal
      v-if="selectedTrade && isShippingModalOpen"
      :item="selectedTrade"
      :shipping-companies="shippingCompanies"
      @close="isShippingModalOpen = false"
      @submit="saveShippingInfo"
    />
  </AdminLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import AdminLayout from '../../layout/AdminLayout.vue'
import {
  adminTransactionRows,
  adminTransactionStatusFilters,
  shippingCompanies,
} from '../../../data/admin'
import AdminStatusBadge from '../shared/AdminStatusBadge.vue'
import AdminShippingInfoModal from './AdminShippingInfoModal.vue'
import AdminTransactionDetailModal from './AdminTransactionDetailModal.vue'

const selectedFilter = ref('전체')
const searchQuery = ref('')
const rows = ref(adminTransactionRows.map((row) => ({ ...row })))
const selectedTrade = ref(null)
const isShippingModalOpen = ref(false)

const filteredRows = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()

  return rows.value.filter((row) => {
    const matchesStatus = selectedFilter.value === '전체' || row.status === selectedFilter.value
    const matchesKeyword =
      !keyword ||
      row.productName.toLowerCase().includes(keyword) ||
      row.tradeNo.toLowerCase().includes(keyword)

    return matchesStatus && matchesKeyword
  })
})

function openDetail(row) {
  selectedTrade.value = row
}

function closeDetail() {
  selectedTrade.value = null
  isShippingModalOpen.value = false
}

function openShippingModal() {
  isShippingModalOpen.value = true
}

function saveShippingInfo(payload) {
  if (!selectedTrade.value) {
    return
  }

  selectedTrade.value.shippingInfo = payload
  selectedTrade.value.status = '배송 중'
  isShippingModalOpen.value = false
}
</script>
