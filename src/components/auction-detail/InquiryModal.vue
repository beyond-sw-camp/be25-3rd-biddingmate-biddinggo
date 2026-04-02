<script setup>
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
})

defineEmits(['close', 'submit'])
</script>

<template>
  <div class="detail-inquiry-overlay" @click.self="$emit('close')">
    <section class="detail-inquiry-modal">
      <div class="detail-inquiry-header">
        <h3>문의하기</h3>
        <button type="button" class="detail-inquiry-close" @click="$emit('close')">×</button>
      </div>

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

      <button type="button" class="detail-inquiry-submit" @click="$emit('submit')">
        문의하기
      </button>
    </section>
  </div>
</template>
