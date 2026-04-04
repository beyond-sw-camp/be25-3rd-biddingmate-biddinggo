<template>
  <AdminLayout>
    <section class="page-header-block">
      <h1>사용자 관리</h1>
    </section>

    <section class="filter-bar admin-filter-bar">
      <div class="filter-chips">
        <button
          v-for="status in adminUserStatusFilters"
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
        placeholder="닉네임, 이메일 검색"
        prepend-inner-icon="mdi-magnify"
        variant="solo"
      />
    </section>

    <section class="admin-table-card surface-card">
      <table class="admin-transaction-table">
        <thead>
          <tr>
            <th>회원 번호</th>
            <th>닉네임</th>
            <th>이메일</th>
            <th>가입일</th>
            <th>거래 수</th>
            <th>신고 수</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.userNo">
            <td class="admin-transaction-table__strong">{{ user.userNo }}</td>
            <td>{{ user.nickname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.joinedAt }}</td>
            <td>{{ user.tradeCount }}</td>
            <td>{{ user.reportCount }}</td>
            <td><AdminStatusBadge :status="user.status" /></td>
            <td>
              <button class="ghost-button admin-inline-button" type="button" @click="toggleStatus(user.userNo)">
                {{ user.status === '활성' ? '정지' : '복구' }}
              </button>
            </td>
          </tr>
          <tr v-if="filteredUsers.length === 0">
            <td class="admin-transaction-table__empty" colspan="8">조건에 맞는 사용자가 없습니다.</td>
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
import { adminUserStatusFilters, adminUsers } from '../../../data/admin'

const selectedFilter = ref('전체')
const searchQuery = ref('')
const users = ref(adminUsers.map((user) => ({ ...user })))

const filteredUsers = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()

  return users.value.filter((user) => {
    const matchesStatus = selectedFilter.value === '전체' || user.status === selectedFilter.value
    const matchesKeyword =
      !keyword ||
      user.nickname.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword)

    return matchesStatus && matchesKeyword
  })
})

function toggleStatus(userNo) {
  users.value = users.value.map((user) => {
    if (user.userNo !== userNo) {
      return user
    }

    return {
      ...user,
      status: user.status === '활성' ? '정지' : '활성',
    }
  })
}
</script>
