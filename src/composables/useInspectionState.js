import { computed, ref } from 'vue'
import { getInspectionDetail } from '../api/inspections'
import { mergeInspectionItemDetail } from '../utils/marketplace'

export function useInspectionState(items, { onShippingSubmit } = {}) {
  const activeFilter = ref('전체')
  const selectedItem = ref(null)
  const isShippingModalOpen = ref(false)
  const shippingForm = ref({
    company: '',
    invoiceNumber: '',
  })

  const filterOptions = ['전체', '검수 대기', '검수 통과', '검수 반려']

  const filteredItems = computed(() => {
    if (activeFilter.value === '전체') {
      return items.value
    }

    return items.value.filter((item) => item.statusLabel === activeFilter.value)
  })

  function badgeClass(status) {
    if (status === 'PASSED' || status === '검수 통과') return 'is-passed'
    if (status === 'FAILED' || status === '검수 반려') return 'is-rejected'
    if (status === 'ON_AUCTION' || status === '경매 진행 중') return 'is-auction'
    return 'is-pending'
  }

  async function openDetail(item) {
    selectedItem.value = item

    if (!item?.inspectionId) {
      return
    }

    try {
      const detail = await getInspectionDetail(item.inspectionId)
      selectedItem.value = mergeInspectionItemDetail(item, detail)
    } catch {
      // 상세 조회 실패 시 목록 응답 기반 정보로만 모달을 유지한다.
    }
  }

  function closeDetail() {
    selectedItem.value = null
    isShippingModalOpen.value = false
  }

  function detailActionLabel(status) {
    if (status === 'PENDING' || status === '검수 대기') return '배송 정보 등록'
    if (status === 'PASSED' || status === '검수 통과') return '경매 등록'
    if (status === 'ON_AUCTION' || status === '경매 진행 중') return '경매 상세 보기'
    return '확인'
  }

  function handleDetailAction() {
    if (!selectedItem.value) return

    if (selectedItem.value.status === 'PENDING') {
      shippingForm.value = {
        company: selectedItem.value.carrier || '',
        invoiceNumber: selectedItem.value.trackingNumber || '',
      }
      isShippingModalOpen.value = true
      return
    }

    closeDetail()
  }

  function closeShippingModal() {
    isShippingModalOpen.value = false
  }

  async function submitShippingInfo() {
    if (typeof onShippingSubmit === 'function') {
      const result = await onShippingSubmit(selectedItem.value, shippingForm.value)

      if (result === false) {
        return
      }
    }

    isShippingModalOpen.value = false
  }

  return {
    activeFilter,
    badgeClass,
    closeDetail,
    closeShippingModal,
    detailActionLabel,
    filterOptions,
    filteredItems,
    handleDetailAction,
    isShippingModalOpen,
    openDetail,
    selectedItem,
    shippingForm,
    submitShippingInfo,
  }
}
