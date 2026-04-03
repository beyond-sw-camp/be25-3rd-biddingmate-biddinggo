<script setup>
defineProps({
  activeFilter: {
    type: String,
    required: true,
  },
  assets: {
    type: Object,
    required: true,
  },
  filterOptions: {
    type: Array,
    required: true,
  },
})

defineEmits(['update:activeFilter'])
</script>

<template>
  <div class="inspection-toolbar">
    <div class="inspection-filters">
      <button
        v-for="filter in filterOptions"
        :key="filter"
        type="button"
        class="inspection-filter"
        :class="{ 'is-active': activeFilter === filter }"
        @click="$emit('update:activeFilter', filter)"
      >
        {{ filter }}
      </button>
    </div>

    <div class="inspection-search">
      <img :src="assets.listSearchIcon" alt="" class="inspection-search-icon" />
      <span>상품명, 브랜드 검색</span>
    </div>
  </div>
</template>
