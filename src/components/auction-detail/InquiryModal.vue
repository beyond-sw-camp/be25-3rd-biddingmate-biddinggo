<script setup>
import BaseModal from '../shared/BaseModal.vue'

defineProps({
  assets: {
    type: Object,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
  submitting: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['close', 'submit'])
</script>

<template>
  <BaseModal panel-class="detail-inquiry-modal" title="문의하기" @close="$emit('close')">
      <div class="detail-inquiry-summary">
        <img :src="assets.listWatchImage" :alt="item.title" class="detail-inquiry-thumb" />
        <div class="detail-inquiry-summary-copy">
          <strong>{{ item.title }}</strong>
          <span>현재 입찰가</span>
          <em>{{ item.price }}원</em>
        </div>
      </div>

      <label class="detail-inquiry-secret">
        <input v-model="form.isPrivate" type="checkbox" />
        <span>비밀글</span>
      </label>

      <div class="detail-inquiry-fields">
        <label class="detail-inquiry-field">
          <span>문의 제목 <em>*</em></span>
          <input
            v-model="form.title"
            type="text"
            maxlength="50"
            placeholder="제목을 입력해 주세요."
          />
        </label>

        <label class="detail-inquiry-field">
          <span>문의 내용 <em>*</em></span>
          <textarea
            v-model="form.content"
            placeholder="문의 내용을 상세히 작성해주세요."
          />
        </label>
      </div>

      <button
        type="button"
        class="detail-inquiry-submit"
        :disabled="submitting"
        @click="$emit('submit')"
      >
        {{ submitting ? '등록 중...' : '문의하기' }}
      </button>
  </BaseModal>
</template>
