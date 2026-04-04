<template>
  <AdminPlaceholderScreen :title="title" />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AdminPlaceholderScreen from '../components/admin/common/AdminPlaceholderScreen.vue'

const route = useRoute()
const title = computed(() => String(route.meta.adminTitle ?? '관리자 페이지'))
</script>
