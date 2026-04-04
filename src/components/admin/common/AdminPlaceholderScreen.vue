<template>
  <AdminLayout>
    <section class="page-header-block">
      <h1>{{ title }}</h1>
    </section>

    <section class="surface-card admin-placeholder-card">
      <h2>준비 중인 관리자 화면입니다.</h2>
      <p>디자인은 연결되어 있고, 기능 구현은 다음 단계에서 이어서 붙일 수 있습니다.</p>
    </section>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '../../layout/AdminLayout.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
