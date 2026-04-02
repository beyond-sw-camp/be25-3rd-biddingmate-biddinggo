<template>
  <article class="inquiry-card">
    <div class="inquiry-card__head">
      <div>
        <span class="status-pill" :class="{ muted: inquiry.status.includes('대기') }">{{ inquiry.status }}</span>
        <h3>{{ inquiry.title }}</h3>
        <p>{{ inquiry.date }}</p>
      </div>
      <button v-if="inquiry.action" class="ghost-action" type="button">{{ inquiry.action }}</button>
    </div>

    <div v-if="inquiry.expanded" class="inquiry-card__body">
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
defineProps({
  inquiry: {
    type: Object,
    required: true,
  },
})
</script>
