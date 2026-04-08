<template>
  <div class="app-shell">
    <MyPageSidebar />

    <div class="content-shell">
      <MyPageHeader
        :auth="auth"
        @logout="handleLogout"
        @open-notification="isNotificationOpen = true"
      />

      <main class="page-area">
        <RouterView />
      </main>
    </div>

    <NotificationModal :open="isNotificationOpen" @close="isNotificationOpen = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import MyPageHeader from './MyPageHeader.vue'
import MyPageSidebar from './MyPageSidebar.vue'
import NotificationModal from '../NotificationModal.vue'

const router = useRouter()
const { auth, logout } = useAuth()
const isNotificationOpen = ref(false)

async function handleLogout() {
  await logout()
  router.push('/')
}
</script>
