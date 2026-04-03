<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>판매 내역</h1>
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

    <div class="winner-deal-list">
      <WinnerDealCard
        v-for="item in filteredItems"
        :key="item.date + item.status + item.name"
        :item="item"
        clickable
        @select="openModal"
      />
    </div>

    <WinnerDealDetailModal
      v-if="selectedItem"
      variant="sale"
      :item="selectedItem"
      :mode="modalMode"
      :form="shippingForm"
      @close="closeModal"
      @next="modalMode = $event"
      @update-form="updateForm"
      @save-shipping="saveShipping"
    />
  </MyPageLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import MyPageLayout from '../../layout/MyPageLayout.vue'
import WinnerDealCard from '../cards/WinnerDealCard.vue'
import WinnerDealDetailModal from '../winner-deals/WinnerDealDetailModal.vue'
import { useSalesModal } from '../../../composables/useSalesModal'
import { salesHistoryItems } from '../../../data/salesHistory'

const { selectedItem, modalMode, shippingForm, openModal, closeModal, updateForm, saveShipping } = useSalesModal()

const selectedTag = ref('전체')
const searchQuery = ref('')

const filterTags = computed(() => ['전체', ...new Set(salesHistoryItems.map((item) => item.status))])

const filteredItems = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase()

  return salesHistoryItems.filter((item) => {
    const matchesTag = selectedTag.value === '전체' || item.status === selectedTag.value
    const matchesSearch = !keyword || item.name.toLowerCase().includes(keyword)
    return matchesTag && matchesSearch
  })
})
</script>
