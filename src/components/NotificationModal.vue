<template>
  <BaseModal
    :open="open"
    panel-class="purchase-modal purchase-modal--notification"
    body-class="base-modal__body base-modal__body--notification modal-scroll"
    header-label="알림"
    @close="$emit('close')"
  >
    <div class="notification-list">
      <article
        v-for="notification in notifications"
        :key="notification.title"
        class="notification-card"
        :class="{ unread: notification.unread }"
      >
        <span class="notification-card__dot"></span>
        <div class="notification-card__body">
          <h3>{{ notification.title }}</h3>
          <p>{{ notification.body }}</p>
          <span>{{ notification.time }}</span>
        </div>
        <img :src="notification.image" :alt="notification.title" />
      </article>
    </div>
  </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue'
import { notifications } from '../data/mypage'

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['close'])
</script>
