import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { inspectionItems } from '../data/marketplaceData'

export function useRegisterFlow(initialMode) {
  const allowedModes = ['select', 'inspection', 'inspection-pick', 'direct', 'direct-auction']
  const currentMode = ref(allowedModes.includes(initialMode.value) ? initialMode.value : 'select')
  const registrationType = ref(
    initialMode.value === 'inspection' || initialMode.value === 'inspection-pick' ? 'inspection' : 'direct',
  )
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

  const headerTitle = computed(() => {
    if (currentMode.value === 'inspection') return '검수 상품 신청'
    if (currentMode.value === 'inspection-pick') return '사전 검수 상품 등록'
    if (currentMode.value === 'direct') return '직접 상품 등록'
    if (currentMode.value === 'direct-auction') return '경매 등록'
    return '경매 등록 방법 선택'
  })

  const headerDescription = computed(() => {
    if (currentMode.value === 'inspection') return '검수 상품 정보를 입력해주세요.'
    if (currentMode.value === 'inspection-pick') return '검수가 완료된 상품을 선택해 경매에 등록해주세요.'
    if (currentMode.value === 'direct') return '경매에 등록할 상품 정보를 입력해주세요.'
    if (currentMode.value === 'direct-auction') return '경매 정보를 입력해주세요.'
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
  const inspectionReadyItems = computed(() => inspectionItems.filter((item) => item.status === '검수 통과'))
  const selectedInspectionItem = computed(() =>
    inspectionReadyItems.value.length
      ? inspectionReadyItems.value[selectedInspectionId.value % inspectionReadyItems.value.length]
      : null,
  )
  const inspectionPickItems = computed(() => {
    if (!inspectionReadyItems.value.length) return []

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
    initialMode,
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

  return {
    auctionForm,
    bidUnitOptions,
    closeInspectionDetail,
    currentMode,
    durationOptions,
    firstStepLabel,
    form,
    goBackToSelect,
    handleFiles,
    headerDescription,
    headerTitle,
    inspectionPickItems,
    isAuctionStep,
    isInspectionDetailOpen,
    openMode,
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
    uploadedImages,
  }
}
