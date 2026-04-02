<template>
  <article class="inquiry-card" :class="{ 'inquiry-card--expanded': isExpanded }">
    <button class="inquiry-card__head inquiry-card__toggle" type="button" @click="toggleExpanded">
      <div>
        <span class="status-pill" :class="{ muted: inquiry.status.includes('대기') }">{{ inquiry.status }}</span>
        <h3>{{ inquiry.title }}</h3>
        <p>{{ inquiry.date }}</p>
      </div>

      <div class="inquiry-card__actions">
        <button v-if="inquiry.action" class="ghost-action" type="button" @click.stop>{{ inquiry.action }}</button>
        <span class="inquiry-card__chevron">{{ isExpanded ? '∧' : '∨' }}</span>
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
  </article>
</template>

<script setup>
import { ref } from 'vue'

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
