import { computed, ref } from 'vue'
import { pointHistory } from '../data/mypage'

const INITIAL_POINTS = 1850000

const CHARGE_PRESETS = [10000, 50000, 100000, 500000]
const WITHDRAW_PRESETS = [10000, 50000, 100000, 'all']

function formatAmount(value, suffix = 'P') {
  return `${value.toLocaleString('ko-KR')} ${suffix}`
}

function formatTimestamp(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}.${month}.${day} ${hours}:${minutes}`
}

export function usePointModal() {
  const currentPoints = ref(INITIAL_POINTS)
  const history = ref([...pointHistory])
  const modalMode = ref('')
  const amount = ref(0)
  const selectedPreset = ref(null)

  const presets = computed(() => (modalMode.value === 'withdraw' ? WITHDRAW_PRESETS : CHARGE_PRESETS))
  const modalTitle = computed(() => {
    if (modalMode.value === 'withdraw') return '포인트 인출'
    if (modalMode.value === 'charge' || modalMode.value === 'virtual-account') return '포인트 충전'
    return ''
  })
  const actionLabel = computed(() => (modalMode.value === 'withdraw' ? '인출하기' : '충전하기'))
  const amountLabel = computed(() => (modalMode.value === 'withdraw' ? '인출할 포인트' : '충전할 포인트'))
  const expectedLabel = computed(() => (modalMode.value === 'withdraw' ? '인출 후 예상 포인트' : '충전 후 예상 포인트'))
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
    dueAt: '2026.04.03 23:59',
  }))

  function resetAmount() {
    amount.value = 0
    selectedPreset.value = null
  }

  function openWithdrawModal() {
    modalMode.value = 'withdraw'
    resetAmount()
  }

  function openChargeModal() {
    modalMode.value = 'charge'
    resetAmount()
  }

  function closeModal() {
    modalMode.value = ''
    selectedPreset.value = null
  }

  function setPreset(preset) {
    selectedPreset.value = preset

    if (preset === 'all') {
      amount.value = currentPoints.value
      return
    }

    if (modalMode.value === 'withdraw') {
      amount.value = Math.min(amount.value + preset, currentPoints.value)
      return
    }

    amount.value += preset
  }

  function submitModal() {
    if (amount.value <= 0) {
      return
    }

    if (modalMode.value === 'withdraw') {
      history.value.unshift({
        title: '인출',
        date: formatTimestamp(),
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
    if (amount.value <= 0) {
      closeModal()
      return
    }

    history.value.unshift({
      title: '충전',
      date: formatTimestamp(),
      amount: `+${amount.value.toLocaleString('ko-KR')} P`,
      tone: 'plus',
    })
    currentPoints.value += amount.value
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
