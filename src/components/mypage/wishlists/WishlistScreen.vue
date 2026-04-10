<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>관심 경매 내역</h1>
    </section>

    <section class="filter-bar wishlist-filter-bar">
      <v-text-field
        v-model="searchQuery"
        class="wishlist-search-field"
        density="comfortable"
        hide-details
        placeholder="상품명 또는 브랜드 검색"
        prepend-inner-icon="mdi-magnify"
        variant="solo"
      />

      <v-menu location="bottom end" offset="12">
        <template #activator="{ props: menuProps }">
          <button class="sort-menu__trigger" type="button" v-bind="menuProps">
            <span>{{ currentSortLabel }}</span>
            <v-icon icon="mdi-chevron-down" />
          </button>
        </template>

        <div class="sort-menu__panel">
          <button
            v-for="option in sortOptions"
            :key="option.value"
            class="sort-menu__item"
            :class="{ 'sort-menu__item--active': sortOption === option.value }"
            type="button"
            @click="sortOption = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </v-menu>
    </section>

    <div class="grid-list">
      <ProductGridCard
        v-for="(item, index) in filteredFavoriteItems"
        :key="item.name + item.currentPrice + index"
        :item="item"
      />
    </div>
  </MyPageLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import MyPageLayout from '../../layout/MyPageLayout.vue'
import ProductGridCard from '../cards/ProductGridCard.vue'
import { favoriteItems } from '../../../data/mypage'

const searchQuery = ref('')
const sortOption = ref('latest')

const sortOptions = [
  { value: 'latest', label: '최신순' },
  { value: 'interest', label: '관심순' },
  { value: 'price-desc', label: '높은 가격순' },
  { value: 'price-asc', label: '낮은 가격순' },
  { value: 'deadline', label: '마감임박순' },
]

const currentSortLabel = computed(() => {
  return sortOptions.find((option) => option.value === sortOption.value)?.label ?? '최신순'
})

const favoriteItemsWithMeta = favoriteItems.map((item, index) => ({
  ...item,
  createdOrder: index,
  interestCount: item.highlighted ? 120 - index * 3 : 80 - index * 2,
  numericPrice: Number(item.currentPrice.replace(/[^\d]/g, '')) || 0,
  deadlineMinutes: Number(item.time.replace(/[^\d]/g, '')) || 9999,
}))

const filteredFavoriteItems = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()

  const searchedItems = favoriteItemsWithMeta.filter((item) => {
    return !keyword || item.name.toLowerCase().includes(keyword)
  })

  return [...searchedItems].sort((left, right) => {
    switch (sortOption.value) {
      case 'interest':
        return right.interestCount - left.interestCount
      case 'price-desc':
        return right.numericPrice - left.numericPrice
      case 'price-asc':
        return left.numericPrice - right.numericPrice
      case 'deadline':
        return left.deadlineMinutes - right.deadlineMinutes
      case 'latest':
      default:
        return left.createdOrder - right.createdOrder
    }
  })
})
</script>
