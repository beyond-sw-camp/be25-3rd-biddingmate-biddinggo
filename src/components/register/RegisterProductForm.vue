<script setup>
import { computed, ref } from 'vue'

const MAX_IMAGE_COUNT = 10

const props = defineProps({
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

const emit = defineEmits(['cancel', 'files-selected', 'remove-image', 'set-primary-image', 'submit'])

const fileInput = ref(null)
const thumbnailScroller = ref(null)
const remainingImageCount = computed(() => Math.max(0, MAX_IMAGE_COUNT - props.uploadedImages.length))
const showThumbnailNav = computed(() => props.uploadedImages.length + (remainingImageCount.value > 0 ? 1 : 0) > 3)
const imageHelperText = computed(() => {
  if (props.uploadInProgress) {
    return '이미지를 업로드하고 있습니다.'
  }

  return `최대 ${MAX_IMAGE_COUNT}장, 각 20MB까지 업로드 가능 · 현재 ${props.uploadedImages.length}장`
})

function openFilePicker() {
  if (remainingImageCount.value <= 0 || props.uploadInProgress) {
    return
  }

  fileInput.value?.click()
}

function setPrimaryImage(index) {
  emit('set-primary-image', index)
}

function removeImage(index) {
  emit('remove-image', index)
}

function slideThumbnails(direction) {
  thumbnailScroller.value?.scrollBy({
    left: direction * 138,
    behavior: 'smooth',
  })
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

        <button
          type="button"
          class="register-upload-box"
          :disabled="uploadInProgress"
          @click="openFilePicker"
        >
          <img
            v-if="uploadedImages[0]"
            :src="uploadedImages[0].previewUrl"
            alt=""
            class="register-main-preview"
          />
          <span v-if="uploadedImages[0]" class="register-upload-overlay">
            {{ remainingImageCount > 0 ? '사진 추가' : '최대 업로드 완료' }}
          </span>
          <template v-else>
            <div class="register-upload-placeholder">
              <div class="register-upload-icon">+</div>
              <span>{{ uploadInProgress ? '업로드 중...' : '이미지 업로드' }}</span>
            </div>
          </template>
        </button>

        <div class="register-thumb-strip">
          <button
            v-if="showThumbnailNav"
            type="button"
            class="register-thumb-nav is-left"
            aria-label="이전 사진 보기"
            @click="slideThumbnails(-1)"
          >
            ‹
          </button>

          <div ref="thumbnailScroller" class="register-thumb-row">
            <div
              v-for="(image, index) in uploadedImages"
              :key="`${image.name}-${index}`"
              class="register-thumb register-thumb-image"
              :class="{ 'is-primary': index === 0 }"
            >
              <button type="button" class="register-thumb-preview" @click="setPrimaryImage(index)">
                <img :src="image.previewUrl" :alt="image.name" />
                <span v-if="index === 0" class="register-thumb-badge">대표</span>
              </button>
              <button
                type="button"
                class="register-thumb-remove"
                :aria-label="`${image.name} 삭제`"
                @click="removeImage(index)"
              >
                ×
              </button>
            </div>
            <button
              v-if="remainingImageCount > 0"
              type="button"
              class="register-thumb register-thumb-add"
              :disabled="uploadInProgress"
              @click="openFilePicker"
            >
              <span>+</span>
              <em>사진 추가</em>
            </button>
          </div>

          <button
            v-if="showThumbnailNav"
            type="button"
            class="register-thumb-nav is-right"
            aria-label="다음 사진 보기"
            @click="slideThumbnails(1)"
          >
            ›
          </button>
        </div>

        <p class="register-helper-text">
          {{ imageHelperText }}
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
