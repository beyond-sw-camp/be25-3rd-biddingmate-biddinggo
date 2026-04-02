<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { assets, inspectionItems } from '../data/marketplaceData'

const inspectionIcon = 'https://www.figma.com/api/mcp/asset/d5a99cb7-a2ca-482c-b0ca-24c4ff52d162'
const directIcon = 'https://www.figma.com/api/mcp/asset/f2c463ba-f81c-4eba-8631-58c625f3d89b'
const checkBullet = 'https://www.figma.com/api/mcp/asset/22001c49-ae72-4074-8e82-fb905a0e3640'
const infoBullet = 'https://www.figma.com/api/mcp/asset/f9c860bc-f862-4836-b1e9-b0ea19594b4d'
const inspectionProductImage = 'https://www.figma.com/api/mcp/asset/32f14895-b803-4f5e-ae62-afb42f566620'

const props = defineProps({
  initialMode: {
    type: String,
    default: 'select',
  },
})

const allowedModes = ['select', 'inspection', 'inspection-pick', 'direct', 'direct-auction']
const currentMode = ref(allowedModes.includes(props.initialMode) ? props.initialMode : 'select')
const registrationType = ref(
  props.initialMode === 'inspection' || props.initialMode === 'inspection-pick' ? 'inspection' : 'direct',
)
const fileInput = ref(null)
const submitted = ref(false)
const uploadedImages = ref([])
const selectedBidUnit = ref('10,000')
const selectedDuration = ref('5일')
const selectedInspectionId = ref(0)
const isInspectionDetailOpen = ref(false)

const form = ref({
  name: '',
  category: '',
  brand: '',
  condition: '',
  description: '',
})

const auctionForm = ref({
  extendAuction: true,
  timeDeal: false,
  startPrice: '',
  buyNowPrice: '',
  startDate: '2024 / 03 / 27',
  startTime: '12 : 00 : 00',
  endDate: '2024 / 03 / 27',
  endTime: '12 : 00 : 00',
})

const registrationMethods = [
  {
    key: 'inspection-pick',
    title: '사전 검수 상품 등록',
    points: [
      '검수 완료된 상품만 골라 바로 경매에 등록할 수 있습니다.',
      '검수 정보와 등급이 함께 노출되어 입찰 신뢰도가 높습니다.',
      '상품 선택 후 바로 2단계 경매 등록으로 이어집니다.',
    ],
    buttonLabel: '검수 상품 등록하기',
    cardClass: 'is-inspection',
    buttonClass: 'is-inspection',
    iconSrc: inspectionIcon,
    bulletSrc: checkBullet,
  },
  {
    key: 'direct',
    title: '직접 상품 등록',
    points: [
      '판매자가 직접 사진 설명 및 상품 정보를 입력합니다.',
      '검수 절차 없이 빠르게 상품을 등록할 수 있습니다.',
      '낙찰 후 구매자와 직접 배송 및 거래를 진행합니다.',
    ],
    buttonLabel: '직접 등록하기',
    cardClass: 'is-direct',
    buttonClass: 'is-direct',
    iconSrc: directIcon,
    bulletSrc: infoBullet,
  },
]

const headerTitle = computed(() => {
  if (currentMode.value === 'inspection') {
    return '검수 상품 신청'
  }

  if (currentMode.value === 'inspection-pick') {
    return '사전 검수 상품 등록'
  }

  if (currentMode.value === 'direct') {
    return '직접 상품 등록'
  }

  if (currentMode.value === 'direct-auction') {
    return '경매 등록'
  }

  return '경매 등록 방법 선택'
})

const headerDescription = computed(() => {
  if (currentMode.value === 'inspection') {
    return '검수 상품 정보를 입력해주세요.'
  }

  if (currentMode.value === 'inspection-pick') {
    return '검수가 완료된 상품을 선택해 경매에 등록해주세요.'
  }

  if (currentMode.value === 'direct') {
    return '경매에 등록할 상품 정보를 입력해주세요.'
  }

  if (currentMode.value === 'direct-auction') {
    return '경매 정보를 입력해주세요.'
  }

  return '경매 등록하실 방법을 선택해주세요.'
})

const thumbnailPlaceholders = computed(() =>
  Math.max(0, 3 - Math.max(0, uploadedImages.value.length - 1)),
)

const successMessage = computed(() =>
  currentMode.value === 'inspection'
    ? '더미 데이터 기준으로 검수 상품 신청이 완료되었습니다.'
    : currentMode.value === 'direct-auction'
      ? registrationType.value === 'inspection'
        ? '더미 데이터 기준으로 사전 검수 상품 경매 등록이 완료되었습니다.'
        : '더미 데이터 기준으로 경매 등록이 완료되었습니다.'
      : '더미 데이터 기준으로 직접 상품 등록이 완료되었습니다.',
)

const showStepper = computed(() =>
  currentMode.value === 'inspection-pick' || currentMode.value === 'direct' || currentMode.value === 'direct-auction',
)

const isAuctionStep = computed(() => currentMode.value === 'direct-auction')
const firstStepLabel = computed(() =>
  registrationType.value === 'inspection' ? '사전 검수 상품 등록' : '직접 상품 등록',
)
const bidUnitOptions = ['1,000', '5,000', '10,000', '50,000', '100,000', '직접입력']
const durationOptions = computed(() =>
  auctionForm.value.timeDeal
    ? ['4시간', '8시간', '12시간', '16시간', '20시간', '24시간', '28시간', '32시간', '36시간', '40시간', '44시간', '48시간']
    : ['3일', '4일', '5일', '6일', '7일', '8일', '9일', '10일'],
)
const inspectionReadyItems = computed(() =>
  inspectionItems.filter((item) => item.status === '검수 통과'),
)
const selectedInspectionItem = computed(() =>
  inspectionReadyItems.value.length
    ? inspectionReadyItems.value[selectedInspectionId.value % inspectionReadyItems.value.length]
    : null,
)
const inspectionPickItems = computed(() => {
  if (!inspectionReadyItems.value.length) {
    return []
  }

  return Array.from({ length: 7 }, (_, index) => ({
    ...inspectionReadyItems.value[index % inspectionReadyItems.value.length],
    displayId: index,
  }))
})

function openMode(mode) {
  registrationType.value = mode === 'inspection' || mode === 'inspection-pick' ? 'inspection' : 'direct'
  currentMode.value = mode
  submitted.value = false
}

function openFilePicker() {
  fileInput.value?.click()
}

function handleFiles(event) {
  const files = Array.from(event.target.files || [])
  const remain = Math.max(0, 4 - uploadedImages.value.length)
  const selected = files.slice(0, remain)

  selected.forEach((file) => {
    uploadedImages.value.push({
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    })
  })

  event.target.value = ''
}

function removeImage(index) {
  const [image] = uploadedImages.value.splice(index, 1)

  if (image?.previewUrl) {
    URL.revokeObjectURL(image.previewUrl)
  }
}

function resetForm() {
  uploadedImages.value.forEach((image) => {
    if (image.previewUrl) {
      URL.revokeObjectURL(image.previewUrl)
    }
  })

  uploadedImages.value = []
  form.value = {
    name: '',
    category: '',
    brand: '',
    condition: '',
    description: '',
  }
  submitted.value = false
}

function goBackToSelect() {
  resetForm()
  currentMode.value = 'select'
}

function submitForm() {
  if (currentMode.value === 'direct' || currentMode.value === 'inspection-pick') {
    currentMode.value = 'direct-auction'
    submitted.value = false
    return
  }

  submitted.value = true
}

function returnFromAuctionStep() {
  currentMode.value = registrationType.value === 'inspection' ? 'inspection-pick' : 'direct'
  submitted.value = false
}

function toggleAuctionField(field) {
  auctionForm.value[field] = !auctionForm.value[field]

  if (field === 'timeDeal') {
    selectedDuration.value = auctionForm.value.timeDeal ? '12시간' : '5일'
  }
}

function selectInspectionItem(index) {
  selectedInspectionId.value = index
  isInspectionDetailOpen.value = true
}

function closeInspectionDetail() {
  isInspectionDetailOpen.value = false
}

function startAuctionFromInspection() {
  isInspectionDetailOpen.value = false
  currentMode.value = 'direct-auction'
  submitted.value = false
}

watch(
  () => props.initialMode,
  (mode) => {
    currentMode.value = allowedModes.includes(mode) ? mode : 'select'
    registrationType.value = mode === 'inspection' || mode === 'inspection-pick' ? 'inspection' : 'direct'
    submitted.value = false
  },
)

onBeforeUnmount(() => {
  uploadedImages.value.forEach((image) => {
    if (image.previewUrl) {
      URL.revokeObjectURL(image.previewUrl)
    }
  })
})
</script>

<template>
  <section class="register-screen">
    <header class="register-method-header">
      <h2>{{ headerTitle }}</h2>
      <p>{{ headerDescription }}</p>
    </header>

    <div v-if="showStepper" class="register-stepper">
      <div class="register-step" :class="{ 'is-active': !isAuctionStep }">
        <span class="register-step-index" :class="{ 'is-muted': isAuctionStep }">1</span>
        <span>{{ firstStepLabel }}</span>
      </div>
      <span class="register-step-line" />
      <div class="register-step" :class="{ 'is-active': isAuctionStep }">
        <span class="register-step-index" :class="{ 'is-muted': !isAuctionStep }">2</span>
        <span>경매 등록</span>
      </div>
    </div>

    <section v-if="currentMode === 'select'" class="register-method-grid">
      <article
        v-for="method in registrationMethods"
        :key="method.title"
        class="register-method-card"
        :class="method.cardClass"
      >
        <div class="register-method-icon-wrap">
          <img :src="method.iconSrc" :alt="method.title" class="register-method-icon" />
        </div>

        <h3>{{ method.title }}</h3>

        <ul class="register-method-points">
          <li
            v-for="point in method.points"
            :key="point"
            class="register-method-point"
          >
            <img :src="method.bulletSrc" alt="" class="register-method-bullet" />
            <span>{{ point }}</span>
          </li>
        </ul>

        <button
          type="button"
          class="register-method-button"
          :class="method.buttonClass"
          @click="openMode(method.key)"
        >
          {{ method.buttonLabel }}
        </button>
      </article>
    </section>

    <section v-else-if="currentMode === 'inspection-pick'" class="register-form-card register-inspection-pick-card">
      <div class="inspection-toolbar register-inspection-toolbar">
        <div class="inspection-search">
          <img :src="assets.listSearchIcon" alt="" class="inspection-search-icon" />
          <span>상품명, 브랜드 검색</span>
        </div>
      </div>

      <div class="inspection-card-grid register-inspection-grid">
        <article
          v-for="item in inspectionPickItems"
          :key="`${item.title}-${item.displayId}`"
          class="inspection-product-card register-inspection-card"
          :class="{ 'is-selected': selectedInspectionId === item.displayId }"
          @click="selectInspectionItem(item.displayId)"
        >
          <div class="inspection-product-image-wrap">
            <img :src="inspectionProductImage" :alt="item.title" class="inspection-product-image" />
            <span class="inspection-badge is-passed">검수 통과</span>
          </div>

          <div class="inspection-product-body">
            <h3>{{ item.title }}</h3>
            <div class="inspection-product-meta">
              <div>
                <span>검수 등급</span>
                <strong>{{ item.inspectionGrade }}</strong>
              </div>
              <span>{{ item.inspectionDate }}</span>
            </div>
          </div>
        </article>

        <article class="register-empty-card">
          <div class="register-empty-icon">+</div>
          <strong>상품이 없으신가요?</strong>
          <p>신규 사전 검수 상품을 등록해보세요.</p>
        </article>
      </div>

      <div v-if="isInspectionDetailOpen && selectedInspectionItem" class="inspection-detail-overlay" @click.self="closeInspectionDetail">
        <section class="inspection-detail-modal">
          <button type="button" class="inspection-detail-close" @click="closeInspectionDetail">
            ×
          </button>

          <div class="inspection-detail-grid">
            <div class="inspection-detail-image-card">
              <img :src="inspectionProductImage" :alt="selectedInspectionItem.title" class="inspection-detail-image" />
            </div>

            <div class="inspection-detail-summary">
              <p class="inspection-detail-category">럭셔리 &gt; 시계 &gt; 남성용 시계</p>
              <span class="inspection-badge is-passed">검수 통과</span>
              <h3>{{ selectedInspectionItem.title }}</h3>

              <div class="inspection-detail-meta">
                <div>
                  <span>브랜드</span>
                  <strong>{{ selectedInspectionItem.brand }}</strong>
                </div>
                <div>
                  <span>검수일</span>
                  <strong>{{ selectedInspectionItem.inspectionDate }}</strong>
                </div>
                <div>
                  <span>검수 등급</span>
                  <strong class="is-grade">{{ selectedInspectionItem.inspectionGrade }}</strong>
                </div>
              </div>
            </div>

            <div class="inspection-detail-section">
              <h4>상품 설명</h4>
              <p>{{ selectedInspectionItem.description }}</p>
            </div>

            <div class="inspection-detail-section">
              <h4>배송 정보</h4>
              <p>우체국 택배</p>
              <p>1928391823798</p>
            </div>
          </div>

          <div class="inspection-detail-actions">
            <button type="button" class="register-secondary-button" @click="closeInspectionDetail">
              반환 신청
            </button>
            <button type="button" class="register-primary-button" @click="startAuctionFromInspection">
              경매 등록
            </button>
          </div>
        </section>
      </div>
    </section>

    <section v-else-if="currentMode === 'inspection' || currentMode === 'direct'" class="register-form-card">
      <div class="register-form-grid">
        <div class="register-upload-column">
          <label class="register-label">상품 이미지 <span>*</span></label>
          <input
            ref="fileInput"
            class="register-hidden-input"
            type="file"
            accept="image/*"
            multiple
            @change="handleFiles"
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
                <span>이미지 업로드</span>
              </div>
            </template>
          </button>

          <div class="register-thumb-row">
            <button
              v-for="(image, index) in uploadedImages.slice(1)"
              :key="`${image.name}-${index}`"
              type="button"
              class="register-thumb register-thumb-image"
              @click="removeImage(index + 1)"
            >
              <img :src="image.previewUrl" :alt="image.name" />
            </button>
            <div
              v-for="slot in thumbnailPlaceholders"
              :key="`empty-${slot}`"
              class="register-thumb"
            />
          </div>

          <p class="register-helper-text">최대 20MB까지 업로드 가능</p>
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
              <select v-model="form.category">
                <option value="" disabled>
                  {{ currentMode === 'inspection' ? '카테고리를 선택해 주세요.' : '카테고리를 선택해주세요.' }}
                </option>
                <option value="watch">시계</option>
                <option value="bag">가방</option>
                <option value="shoes">신발</option>
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

      <div v-if="submitted" class="register-success-banner">
        {{ successMessage }}
      </div>

      <div class="register-actions">
        <button type="button" class="register-secondary-button" @click="goBackToSelect">
          취소
        </button>
        <button type="button" class="register-primary-button" @click="submitForm">
          확인
        </button>
      </div>
    </section>

    <section v-else class="register-form-card register-auction-card">
      <div class="auction-settings">
        <div class="auction-toggle-grid">
          <article class="auction-toggle-card">
            <div class="auction-toggle-copy">
              <div class="auction-toggle-icon is-extend">↻</div>
              <div>
                <strong>연장 경매</strong>
                <p>종료 직전 입찰 시 시간 연장</p>
              </div>
            </div>
            <button
              type="button"
              class="auction-switch"
              :class="{ 'is-on': auctionForm.extendAuction }"
              @click="toggleAuctionField('extendAuction')"
            >
              <span />
            </button>
          </article>

          <article class="auction-toggle-card">
            <div class="auction-toggle-copy">
              <div class="auction-toggle-icon is-timedeal">⚡</div>
              <div>
                <strong>타임딜</strong>
                <p>단시간 내 고가가 낙찰 유도</p>
              </div>
            </div>
            <button
              type="button"
              class="auction-switch"
              :class="[{ 'is-on': auctionForm.timeDeal }, 'is-danger']"
              @click="toggleAuctionField('timeDeal')"
            >
              <span />
            </button>
          </article>
        </div>

        <div class="auction-field-grid">
          <label class="register-field">
            <span class="register-label">경매 시작가 <span>*</span></span>
            <div class="auction-money-field">
              <input v-model="auctionForm.startPrice" type="number" placeholder="0" />
              <span>원</span>
            </div>
          </label>

          <label class="register-field">
            <span class="register-label">즉시 구매가</span>
            <div class="auction-money-field">
              <input v-model="auctionForm.buyNowPrice" type="number" placeholder="0" />
              <span>원</span>
            </div>
          </label>
        </div>

        <div class="auction-option-section">
          <span class="register-label">입찰 단위 <span>*</span></span>
          <div class="auction-chip-row">
            <button
              v-for="option in bidUnitOptions"
              :key="option"
              type="button"
              class="auction-chip"
              :class="{ 'is-selected': selectedBidUnit === option }"
              @click="selectedBidUnit = option"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <div class="auction-option-section">
          <span class="register-label">경매 기간 <span>*</span></span>

          <div class="auction-date-grid">
            <div class="auction-date-card">
              <span class="auction-date-label">시작 일시</span>
              <div class="auction-date-value-row">
                <div class="auction-date-value">🗓 {{ auctionForm.startDate }}</div>
                <div class="auction-date-value">🕒 {{ auctionForm.startTime }}</div>
              </div>
            </div>

            <div class="auction-date-card">
              <span class="auction-date-label">종료 일시</span>
              <div class="auction-date-value-row">
                <div class="auction-date-value">🗓 {{ auctionForm.endDate }}</div>
                <div class="auction-date-value">🕒 {{ auctionForm.endTime }}</div>
              </div>
            </div>
          </div>

          <div class="auction-chip-row is-duration">
            <button
              v-for="option in durationOptions"
              :key="option"
              type="button"
              class="auction-chip"
              :class="{ 'is-selected': selectedDuration === option }"
              @click="selectedDuration = option"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <div v-if="submitted" class="register-success-banner">
          {{ successMessage }}
        </div>

        <div class="register-actions">
          <button type="button" class="register-secondary-button" @click="returnFromAuctionStep">
            취소
          </button>
          <button type="button" class="register-primary-button" @click="submitForm">
            확인
          </button>
        </div>
      </div>
    </section>
  </section>
</template>
