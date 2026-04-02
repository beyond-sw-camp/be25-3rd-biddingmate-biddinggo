<template>
  <SurfaceCard as="article" class="inquiry-card" :class="{ 'inquiry-card--expanded': isExpanded }">
    <button class="inquiry-card__head inquiry-card__toggle" type="button" @click="toggleExpanded">
      <div>
        <StatusBadge :status="inquiry.status" />
        <h3>{{ inquiry.title }}</h3>
        <p>{{ inquiry.date }}</p>
      </div>

      <div class="inquiry-card__actions">
        <button
          v-if="inquiry.action"
          class="ghost-action"
          :class="{ 'inquiry-card__text-action': inquiry.action === '상품 보러가기' }"
          type="button"
          @click.stop
        >
          {{ inquiry.action }}
        </button>
        <v-icon class="inquiry-card__chevron" :icon="isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
      </div>
    </button>

    <div v-if="isExpanded" class="inquiry-card__body">
      <div class="inquiry-block">
        <strong>Q</strong>
        <p>{{ inquiry.question }}</p>
      </div>

      <div v-if="inquiry.answer" class="inquiry-block answer">
        <strong>A</strong>
        <div>
          <p class="inquiry-answer-meta">{{ inquiry.answerAuthor }} · {{ inquiry.answerDate }}</p>
          <p>{{ inquiry.answer }}</p>
        </div>
      </div>

      <div v-if="inquiry.pendingAction" class="inquiry-card__footer">
        <button class="primary-button light" type="button">{{ inquiry.pendingAction }}</button>
      </div>
    </div>
  </SurfaceCard>
</template>

<script setup>
import { ref } from 'vue'
import SurfaceCard from '../../SurfaceCard.vue'
import StatusBadge from './StatusBadge.vue'

defineProps({
  inquiry: {
    type: Object,
    required: true,
  },
})

const isExpanded = ref(false)

function toggleExpanded() {
  isExpanded.value = !isExpanded.value
}
</script>
