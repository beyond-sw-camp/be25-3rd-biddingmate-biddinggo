<template>
  <div v-if="open" class="modal-backdrop" @click="$emit('close')">
    <section class="notification-modal" @click.stop>
      <div class="notification-modal__head">
        <h1>알림</h1>
        <button class="notification-modal__close" type="button" @click="$emit('close')">×</button>
      </div>

      <div class="notification-modal__scroll modal-scroll">
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
      </div>
    </section>
  </div>
</template>

<script setup>
import { notifications } from '../data/mypage'

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['close'])
</script>
