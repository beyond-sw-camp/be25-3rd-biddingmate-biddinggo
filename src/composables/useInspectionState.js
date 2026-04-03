import { computed, ref } from 'vue'

export function useInspectionState(items) {
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

    return items.value.filter((item) => item.status === activeFilter.value)
  })

  function badgeClass(status) {
    if (status === '검수 통과') return 'is-passed'
    if (status === '검수 반려') return 'is-rejected'
    if (status === '경매 진행 중') return 'is-auction'
    return 'is-pending'
  }

  function summaryIcon(label) {
    if (label === '총 검수 완료') return '✓'
    if (label === '검수 대기') return '👜'
    if (label === '검수 승인') return '⌛'
    return '▣'
  }

  function openDetail(item) {
    selectedItem.value = item
  }

  function closeDetail() {
    selectedItem.value = null
    isShippingModalOpen.value = false
  }

  function detailActionLabel(status) {
    if (status === '검수 대기') return '배송 정보 등록'
    if (status === '검수 통과') return '경매 등록'
    if (status === '경매 진행 중') return '경매 상세 보기'
    return '확인'
  }

  function handleDetailAction() {
    if (!selectedItem.value) return

    if (selectedItem.value.status === '검수 대기') {
      isShippingModalOpen.value = true
      return
    }

    closeDetail()
  }

  function closeShippingModal() {
    isShippingModalOpen.value = false
  }

  function submitShippingInfo() {
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
    summaryIcon,
  }
}
