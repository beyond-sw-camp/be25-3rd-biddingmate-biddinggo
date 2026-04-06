<script setup>
import { ref } from 'vue'

defineProps({
  categoryOptions: {
    type: Array,
    required: true,
  },
  currentMode: {
    type: String,
    required: true,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  form: {
    type: Object,
    required: true,
  },
  processing: {
    type: Boolean,
    default: false,
  },
  submitted: {
    type: Boolean,
    required: true,
  },
  successMessage: {
    type: String,
    required: true,
  },
  thumbnailPlaceholders: {
    type: Number,
    required: true,
  },
  uploadInProgress: {
    type: Boolean,
    default: false,
  },
  uploadedImages: {
    type: Array,
    required: true,
  },
})

defineEmits(['cancel', 'files-selected', 'remove-image', 'submit'])

const fileInput = ref(null)

function openFilePicker() {
  fileInput.value?.click()
}
</script>

<template>
  <section class="register-form-card">
    <div class="register-form-grid">
      <div class="register-upload-column">
        <label class="register-label">상품 이미지 <span>*</span></label>
        <input
          ref="fileInput"
          class="register-hidden-input"
          type="file"
          accept="image/*"
          multiple
          @change="$emit('files-selected', $event)"
        />

        <button type="button" class="register-upload-box" @click="openFilePicker">
          <img
            v-if="uploadedImages[0]"
            :src="uploadedImages[0].previewUrl"
            alt=""
            class="register-main-preview"
          />
          <template v-else>
            <div class="register-upload-placeholder">
              <div class="register-upload-icon">+</div>
              <span>{{ uploadInProgress ? '업로드 중...' : '이미지 업로드' }}</span>
            </div>
          </template>
        </button>

        <div class="register-thumb-row">
          <button
            v-for="(image, index) in uploadedImages.slice(1)"
            :key="`${image.name}-${index}`"
            type="button"
            class="register-thumb register-thumb-image"
            @click="$emit('remove-image', index + 1)"
          >
            <img :src="image.previewUrl" :alt="image.name" />
          </button>
          <div
            v-for="slot in thumbnailPlaceholders"
            :key="`empty-${slot}`"
            class="register-thumb"
          />
        </div>

        <p class="register-helper-text">
          {{ uploadInProgress ? '이미지를 업로드하고 있습니다.' : '최대 20MB까지 업로드 가능' }}
        </p>
      </div>

      <div class="register-fields-column">
        <label class="register-field">
          <span class="register-label">상품명 <span>*</span></span>
          <input
            v-model="form.name"
            type="text"
            :placeholder="currentMode === 'inspection' ? '상품명을 입력해 주세요.' : '상품명을 입력해주세요.'"
          />
        </label>

        <label class="register-field">
          <span class="register-label">카테고리 <span>*</span></span>
          <div class="register-select-wrap">
            <select v-model="form.categoryId">
              <option value="" disabled>
                {{ currentMode === 'inspection' ? '카테고리를 선택해 주세요.' : '카테고리를 선택해주세요.' }}
              </option>
              <option
                v-for="option in categoryOptions"
                :key="option.id"
                :value="String(option.id)"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
        </label>

        <label v-if="currentMode === 'direct'" class="register-field">
          <span class="register-label">상품 상태 <span>*</span></span>
          <div class="register-select-wrap">
            <select v-model="form.condition">
              <option value="" disabled>상품의 상태를 선택해주세요.</option>
              <option value="최상">최상</option>
              <option value="상">상</option>
              <option value="중">중</option>
              <option value="하">하</option>
            </select>
          </div>
        </label>

        <label class="register-field">
          <span class="register-label">브랜드</span>
          <input
            v-model="form.brand"
            type="text"
            :placeholder="currentMode === 'inspection' ? '브랜드를 입력해 주세요.' : '브랜드를 입력해주세요.'"
          />
        </label>

        <label class="register-field">
          <span class="register-label">상세 설명 <span>*</span></span>
          <textarea
            v-model="form.description"
            placeholder="구매 시기, 보증서 유무, 하자 여부 등 상세한 내용을 입력해주세요."
          />
        </label>
      </div>
    </div>

    <div v-if="errorMessage" class="register-success-banner is-error">
      {{ errorMessage }}
    </div>

    <div v-else-if="submitted" class="register-success-banner">
      {{ successMessage }}
    </div>

    <div class="register-actions">
      <button type="button" class="register-secondary-button" :disabled="processing || uploadInProgress" @click="$emit('cancel')">
        취소
      </button>
      <button type="button" class="register-primary-button" :disabled="processing || uploadInProgress" @click="$emit('submit')">
        {{ processing ? '처리 중...' : '확인' }}
      </button>
    </div>
  </section>
</template>
