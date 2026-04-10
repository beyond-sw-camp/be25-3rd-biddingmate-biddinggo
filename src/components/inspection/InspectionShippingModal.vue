<script setup>
import BaseModal from '../shared/BaseModal.vue'

defineProps({
  form: {
    type: Object,
    required: true,
  },
})

defineEmits(['close', 'submit'])
</script>

<template>
  <BaseModal
    overlay-class="inspection-shipping-overlay"
    panel-class="inspection-shipping-modal"
    @close="$emit('close')"
  >
    <template #header>
      <div class="inspection-shipping-header">
        <h3>배송 정보 등록</h3>
        <button type="button" class="inspection-shipping-close" @click="$emit('close')">×</button>
      </div>
    </template>

      <div class="inspection-shipping-form">
        <label class="inspection-shipping-field is-small">
          <span>택배사 <em>*</em></span>
          <div class="register-select-wrap">
            <select v-model="form.company">
              <option value="" disabled>선택</option>
              <option value="우체국 택배">우체국 택배</option>
              <option value="CJ대한통운">CJ대한통운</option>
              <option value="한진택배">한진택배</option>
            </select>
          </div>
        </label>

        <label class="inspection-shipping-field">
          <span>송장 번호 <em>*</em></span>
          <input
            v-model="form.invoiceNumber"
            type="text"
            placeholder="송장 번호를 입력해 주세요."
          />
        </label>
      </div>

      <button type="button" class="inspection-shipping-submit" @click="$emit('submit')">
        등록하기
      </button>
  </BaseModal>
</template>
