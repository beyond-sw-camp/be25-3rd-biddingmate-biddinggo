<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})

defineEmits(['open-inquiry', 'open-seller'])
</script>

<template>
  <div class="seller-card">
    <div class="seller-meta">
      <div class="seller-avatar"></div>
      <div class="seller-info">
        <button type="button" class="seller-name-button" @click="$emit('open-seller')">
          {{ item.seller }}
        </button>
        <span class="seller-grade">{{ item.sellerGrade }}</span>
      </div>
    </div>
    <button type="button" class="seller-button" @click="$emit('open-inquiry')">문의 하기</button>
  </div>
</template>
