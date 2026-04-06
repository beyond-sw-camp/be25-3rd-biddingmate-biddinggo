<script setup>
import { toRef } from 'vue'
import { assets } from '../data/marketplaceData'
import { useRegisterFlow } from '../composables/useRegisterFlow'
import AuctionSetupForm from './register/AuctionSetupForm.vue'
import InspectionPickStep from './register/InspectionPickStep.vue'
import RegisterMethodSelect from './register/RegisterMethodSelect.vue'
import RegisterProductForm from './register/RegisterProductForm.vue'
import RegisterStepper from './register/RegisterStepper.vue'

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

const {
  auctionForm,
  bidUnitOptions,
  categoryOptions,
  closeInspectionDetail,
  currentMode,
  durationOptions,
  errorMessage,
  firstStepLabel,
  form,
  goBackToSelect,
  handleFiles,
  headerDescription,
  headerTitle,
  inspectionPickItems,
  isAuctionStep,
  isInspectionDetailOpen,
  openInspectionRequest,
  openMode,
  processing,
  removeImage,
  returnFromAuctionStep,
  selectedBidUnit,
  selectedDuration,
  selectedInspectionId,
  selectedInspectionItem,
  selectInspectionItem,
  showStepper,
  startAuctionFromInspection,
  submitted,
  submitForm,
  successMessage,
  thumbnailPlaceholders,
  toggleAuctionField,
  uploadInProgress,
  uploadedImages,
} = useRegisterFlow(toRef(props, 'initialMode'))
</script>

<template>
  <section class="register-screen">
    <header class="register-method-header">
      <h2>{{ headerTitle }}</h2>
      <p>{{ headerDescription }}</p>
    </header>

    <RegisterStepper
      v-if="showStepper"
      :first-step-label="firstStepLabel"
      :is-auction-step="isAuctionStep"
    />

    <RegisterMethodSelect
      v-if="currentMode === 'select'"
      :methods="registrationMethods"
      @select-mode="openMode"
    />

    <InspectionPickStep
      v-else-if="currentMode === 'inspection-pick'"
      :assets="assets"
      :error-message="errorMessage"
      :inspection-pick-items="inspectionPickItems"
      :inspection-product-image="inspectionProductImage"
      :is-inspection-detail-open="isInspectionDetailOpen"
      :selected-inspection-id="selectedInspectionId"
      :selected-inspection-item="selectedInspectionItem"
      @close-detail="closeInspectionDetail"
      @open-inspection-request="openInspectionRequest"
      @select-item="selectInspectionItem"
      @start-auction="startAuctionFromInspection"
    />

    <RegisterProductForm
      v-else-if="currentMode === 'inspection' || currentMode === 'direct'"
      :category-options="categoryOptions"
      :current-mode="currentMode"
      :error-message="errorMessage"
      :form="form"
      :processing="processing"
      :submitted="submitted"
      :success-message="successMessage"
      :thumbnail-placeholders="thumbnailPlaceholders"
      :upload-in-progress="uploadInProgress"
      :uploaded-images="uploadedImages"
      @cancel="goBackToSelect"
      @files-selected="handleFiles"
      @remove-image="removeImage"
      @submit="submitForm"
    />

    <AuctionSetupForm
      v-else
      :auction-form="auctionForm"
      :bid-unit-options="bidUnitOptions"
      :duration-options="durationOptions"
      :error-message="errorMessage"
      :processing="processing"
      :selected-bid-unit="selectedBidUnit"
      :selected-duration="selectedDuration"
      :submitted="submitted"
      :success-message="successMessage"
      @cancel="returnFromAuctionStep"
      @select-bid-unit="selectedBidUnit = $event"
      @select-duration="selectedDuration = $event"
      @submit="submitForm"
      @toggle-field="toggleAuctionField"
    />
  </section>
</template>
