import { reactive, ref } from 'vue'

export function usePurchaseModal() {
  const selectedItem = ref(null)
  const modalMode = ref('detail')
  const shippingForm = reactive({
    name: '김다정',
    phone: '010-1111-2222',
    zip: '06234',
    address1: '서울특별시 강남구 테헤란로 123',
    address2: '아크로타워 1502호',
  })

  function openModal(item) {
    selectedItem.value = item
    modalMode.value = 'detail'
  }

  function closeModal() {
    selectedItem.value = null
    modalMode.value = 'detail'
  }

  function selectAddress(address) {
    shippingForm.zip = address.zip
    shippingForm.address1 = address.address1
    shippingForm.address2 = address.address2
    modalMode.value = 'shipping-form'
  }

  function saveAddress() {
    if (!selectedItem.value) return

    selectedItem.value.shippingAddress = {
      name: shippingForm.name,
      phone: shippingForm.phone,
      zip: shippingForm.zip,
      address1: shippingForm.address1,
      address2: shippingForm.address2,
    }
    modalMode.value = 'detail'
  }

  function confirmPurchase() {
    if (!selectedItem.value) return

    selectedItem.value.status = '구매 확정'
    selectedItem.value.modalType = 'readonly'
    closeModal()
  }

  return {
    selectedItem,
    modalMode,
    shippingForm,
    openModal,
    closeModal,
    selectAddress,
    saveAddress,
    confirmPurchase,
  }
}
