import { reactive, ref } from 'vue'

export function usePurchaseModal({ onSaveAddress } = {}) {
  const selectedItem = ref(null)
  const modalMode = ref('detail')
  const savingAddress = ref(false)
  const modalErrorMessage = ref('')
  const shippingForm = reactive({
    name: '',
    phone: '',
    zip: '',
    address1: '',
    address2: '',
  })

  function syncShippingForm(address = {}) {
    shippingForm.name = address.name || address.recipient || ''
    shippingForm.phone = address.phone || address.tel || ''
    shippingForm.zip = address.zip || address.zipcode || ''
    shippingForm.address1 = address.address1 || address.address || ''
    shippingForm.address2 = address.address2 || address.detailAddress || ''
  }

  function openModal(item) {
    selectedItem.value = item
    modalMode.value = 'detail'
    modalErrorMessage.value = ''
    syncShippingForm(item?.shippingAddress || {})
  }

  function closeModal() {
    selectedItem.value = null
    modalMode.value = 'detail'
    modalErrorMessage.value = ''
  }

  function selectAddress(address) {
    syncShippingForm(address)
    modalMode.value = 'shipping-form'
  }

  function updateForm(field, value) {
    if (field in shippingForm) {
      shippingForm[field] = value
    }
  }

  async function saveAddress() {
    if (!selectedItem.value || savingAddress.value) return

    const nextAddress = {
      name: shippingForm.name,
      phone: shippingForm.phone,
      zip: shippingForm.zip,
      address1: shippingForm.address1,
      address2: shippingForm.address2,
    }

    savingAddress.value = true
    modalErrorMessage.value = ''

    try {
      if (onSaveAddress) {
        await onSaveAddress(selectedItem.value, nextAddress)
      }

      selectedItem.value.shippingAddress = nextAddress
      selectedItem.value.modalType = 'readonly'
      modalMode.value = 'detail'
    } catch (error) {
      modalErrorMessage.value = error?.message || '배송지 정보를 등록하지 못했습니다.'
    } finally {
      savingAddress.value = false
    }
  }

  function confirmPurchase() {
    if (!selectedItem.value) return

    selectedItem.value.status = '거래 완료'
    selectedItem.value.modalType = 'readonly'
    closeModal()
  }

  return {
    selectedItem,
    modalMode,
    shippingForm,
    savingAddress,
    modalErrorMessage,
    openModal,
    closeModal,
    selectAddress,
    updateForm,
    saveAddress,
    confirmPurchase,
  }
}