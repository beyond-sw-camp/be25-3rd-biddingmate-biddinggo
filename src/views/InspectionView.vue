<script setup>
import { useRouter } from 'vue-router'
import InspectionScreen from '../components/InspectionScreen.vue'
import { assets, inspectionItems, inspectionSummary } from '../data/marketplaceData'

const router = useRouter()

function openRegister(mode = 'inspection') {
  router.push({
    path: '/register',
    query: {
      mode,
    },
  })
}
</script>

<template>
  <InspectionScreen
    :assets="assets"
    :items="inspectionItems"
    :summary="inspectionSummary"
    @open-register="openRegister"
  />
</template>
