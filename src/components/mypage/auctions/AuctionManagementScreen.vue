<template>
  <section class="page-header-inline">
    <h1>경매 관리</h1>
    <button class="primary-button" type="button">+ 경매 등록하기</button>
  </section>

  <section class="stats-grid">
    <SurfaceCard as="article" v-for="card in auctionSummary" :key="card.label" class="stat-card">
      <span class="stat-card__icon"></span>
      <div>
        <p>{{ card.label }}</p>
        <strong>{{ card.value }}</strong>
      </div>
    </SurfaceCard>
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
      placeholder="상품명 또는 브랜드 검색"
      prepend-inner-icon="mdi-magnify"
      variant="solo"
    />
  </section>

  <div class="list-grid mypage-auction-card-grid">
    <AuctionCard
      v-for="(item, index) in filteredItems"
      :key="item.id || `${item.title}-${index}`"
      :clock-icon="clockIcon"
      :heart-icon="heartIcon"
      :image-src="item.image"
      :item="item"
      :show-live-tag="true"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AuctionCard from '../../AuctionCard.vue'
import SurfaceCard from '../../SurfaceCard.vue'
import { auctionItems, auctionSummary } from '../../../data/mypage'

const selectedTag = ref('전체')
const searchQuery = ref('')
const clockIcon = 'https://www.figma.com/api/mcp/asset/4ef495a0-f919-4c28-9d20-c5dfe3e99e93'
const heartIcon = 'https://www.figma.com/api/mcp/asset/64e7d0cd-6ebd-4492-a951-2b0ca40524d2'
const filterTags = ['전체', '경매 진행 중', '낙찰', '유찰']

const auctionItemsWithStatus = auctionItems.map((item, index) => {
  const auctionStatus = filterTags[(index % 3) + 1]

  return {
    ...item,
    id: item.id || `managed-auction-${index}`,
    auctionStatus,
    bids: item.bids || item.bidCount,
    highlight: item.highlight || item.highlighted,
    isTimeDeal: Boolean(item.tag),
    price: item.price || item.currentPrice,
    title: item.title || item.name,
  }
})

const filteredItems = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()

  return auctionItemsWithStatus.filter((item) => {
    const matchesTag = selectedTag.value === '전체' || item.auctionStatus === selectedTag.value
    const matchesSearch = !keyword || item.title.toLowerCase().includes(keyword) || String(item.brand || '').toLowerCase().includes(keyword)
    return matchesTag && matchesSearch
  })
})
</script>