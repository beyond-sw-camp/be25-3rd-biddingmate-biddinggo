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
        <div v-if="allowReply && isReplying" class="inquiry-reply-form">
          <v-textarea
            v-model="replyText"
            class="inquiry-reply-form__textarea"
            auto-grow
            density="comfortable"
            hide-details
            placeholder="답변 내용을 입력해 주세요"
            rows="3"
            variant="outlined"
          />
        </div>
        <button :class="replyButtonClass" type="button" @click="handlePendingAction">
          {{ inquiry.pendingAction }}
        </button>
      </div>
    </div>
  </SurfaceCard>
</template>

<script setup>
import { computed, ref } from 'vue'
import SurfaceCard from '../../SurfaceCard.vue'
import StatusBadge from './StatusBadge.vue'

const props = defineProps({
  inquiry: {
    type: Object,
    required: true,
  },
  allowReply: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit-reply'])

const isExpanded = ref(false)
const isReplying = ref(false)
const replyText = ref('')

const replyButtonClass = computed(() => (props.allowReply ? 'primary-button' : 'primary-button light'))

function toggleExpanded() {
  isExpanded.value = !isExpanded.value
}

function handlePendingAction() {
  if (!props.allowReply) {
    return
  }

  if (!isReplying.value) {
    isReplying.value = true
    return
  }

  const content = replyText.value.trim()

  if (!content) {
    return
  }

  emit('submit-reply', content)
  replyText.value = ''
  isReplying.value = false
}
</script>
