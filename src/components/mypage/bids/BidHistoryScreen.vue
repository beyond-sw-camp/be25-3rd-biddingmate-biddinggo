<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>입찰 내역</h1>
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
      <v-text-field
        v-model="searchQuery"
        class="page-search-field"
        density="comfortable"
        hide-details
        placeholder="상품명으로 검색"
        prepend-inner-icon="mdi-magnify"
        variant="solo"
      />
    </section>

    <div class="bid-history-list">
      <ProductBidCard
        v-for="item in filteredBidItems"
        :key="item.date + item.status + item.name"
        :item="item"
      />
    </div>
  </MyPageLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import MyPageLayout from '../../layout/MyPageLayout.vue'
import ProductBidCard from '../cards/ProductBidCard.vue'
import { bidItems } from '../../../data/mypage'

const selectedTag = ref('전체')
const searchQuery = ref('')

const filterTags = computed(() => ['전체', ...new Set(bidItems.map((item) => item.status))])

const filteredBidItems = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()

  return bidItems.filter((item) => {
    const matchesTag = selectedTag.value === '전체' || item.status === selectedTag.value
    const matchesSearch = !keyword || item.name.toLowerCase().includes(keyword)
    return matchesTag && matchesSearch
  })
})
</script>
