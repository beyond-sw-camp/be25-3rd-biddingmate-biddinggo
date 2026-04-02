<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import RegisterScreen from '../components/RegisterScreen.vue'

const route = useRoute()
const allowedModes = ['select', 'inspection', 'inspection-pick', 'direct', 'direct-auction']

const initialMode = computed(() => {
  const mode = typeof route.query.mode === 'string' ? route.query.mode : 'select'
  return allowedModes.includes(mode) ? mode : 'select'
})
</script>

<template>
  <RegisterScreen :initial-mode="initialMode" />
</template>
