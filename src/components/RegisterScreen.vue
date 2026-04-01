<script setup>
defineProps({
  options: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="register-screen">
    <div class="register-header">
      <h2>경매 등록 방법 선택</h2>
      <p>판매 상품의 상태와 목적에 맞는 등록 방식을 선택하세요.</p>
    </div>

    <div class="register-grid">
      <article
        v-for="option in options"
        :key="option.title"
        class="register-card"
        :class="`is-${option.tone}`"
      >
        <div class="register-icon">{{ option.tone === 'inspection' ? '✓' : '＋' }}</div>
        <strong>{{ option.title }}</strong>
        <p>{{ option.description }}</p>
        <button type="button" class="register-button">
          {{ option.button }}
        </button>
      </article>
    </div>
  </section>
</template>
