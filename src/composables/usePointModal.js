import { computed, ref } from 'vue'
import { pointHistory } from '../data/mypage'

const INITIAL_POINTS = 1850000

const CHARGE_PRESETS = [10000, 50000, 100000, 500000]
const WITHDRAW_PRESETS = [10000, 50000, 100000, 'all']

function formatAmount(value, suffix = 'P') {
  return `${value.toLocaleString('ko-KR')} ${suffix}`
}

export function usePointModal() {
  const currentPoints = ref(INITIAL_POINTS)
  const history = ref([...pointHistory])
  const modalMode = ref('')
  const amount = ref(100000)

  const presets = computed(() => (modalMode.value === 'withdraw' ? WITHDRAW_PRESETS : CHARGE_PRESETS))
  const modalTitle = computed(() => {
    if (modalMode.value === 'withdraw') return '포인트 인출'
    if (modalMode.value === 'charge' || modalMode.value === 'virtual-account') return '포인트 충전'
    return ''
  })
  const actionLabel = computed(() => (modalMode.value === 'withdraw' ? '인출하기' : '충전하기'))
  const amountLabel = computed(() => (modalMode.value === 'withdraw' ? '인출할 포인트' : '충전할 포인트'))
  const expectedLabel = computed(() => (modalMode.value === 'withdraw' ? '인출 후 예상 포인트' : '충전 후 예상 포인트'))
  const selectedPreset = computed(() => {
    if (modalMode.value === 'withdraw' && amount.value === currentPoints.value) {
      return 'all'
    }

    return presets.value.find((preset) => preset === amount.value) ?? null
  })
  const expectedPoints = computed(() => {
    if (modalMode.value === 'withdraw') {
      return Math.max(currentPoints.value - amount.value, 0)
    }

    return currentPoints.value + amount.value
  })

  const virtualAccount = computed(() => ({
    bank: '우리은행',
    accountNumber: '1002-123-456789',
    accountHolder: '주식회사 비딩고',
    depositAmount: formatAmount(amount.value, '원'),
    dueAt: '2026.03.24 23:59',
  }))

  function openWithdrawModal() {
    modalMode.value = 'withdraw'
    amount.value = 100000
  }

  function openChargeModal() {
    modalMode.value = 'charge'
    amount.value = 100000
  }

  function closeModal() {
    modalMode.value = ''
  }

  function setPreset(preset) {
    amount.value = preset === 'all' ? currentPoints.value : preset
  }

  function submitModal() {
    if (modalMode.value === 'withdraw') {
      history.value.unshift({
        title: '인출',
        date: '2026.04.02 16:10',
        amount: `-${amount.value.toLocaleString('ko-KR')} P`,
        tone: 'minus',
      })
      currentPoints.value = Math.max(currentPoints.value - amount.value, 0)
      closeModal()
      return
    }

    if (modalMode.value === 'charge') {
      modalMode.value = 'virtual-account'
    }
  }

  function confirmVirtualAccount() {
    closeModal()
  }

  return {
    actionLabel,
    amount,
    amountLabel,
    closeModal,
    confirmVirtualAccount,
    currentPoints,
    expectedLabel,
    expectedPoints,
    formatAmount,
    history,
    modalMode,
    modalTitle,
    openChargeModal,
    openWithdrawModal,
    presets,
    selectedPreset,
    setPreset,
    submitModal,
    virtualAccount,
  }
}
