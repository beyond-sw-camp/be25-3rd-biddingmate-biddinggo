import { reactive, ref } from 'vue'

export function useSalesModal() {
  const selectedItem = ref(null)
  const modalMode = ref('detail')
  const shippingForm = reactive({
    courier: '',
    trackingNumber: '',
  })

  function openModal(item) {
    selectedItem.value = item
    modalMode.value = 'detail'
    shippingForm.courier = item.shippingInfo?.courier ?? ''
    shippingForm.trackingNumber = item.shippingInfo?.trackingNumber ?? ''
  }

  function closeModal() {
    selectedItem.value = null
    modalMode.value = 'detail'
    shippingForm.courier = ''
    shippingForm.trackingNumber = ''
  }

  function updateForm(field, value) {
    shippingForm[field] = value
  }

  function saveShipping() {
    if (!selectedItem.value || !shippingForm.courier || !shippingForm.trackingNumber) return

    selectedItem.value.shippingInfo = {
      courier: shippingForm.courier,
      trackingNumber: shippingForm.trackingNumber,
    }
    selectedItem.value.status = '배송중'
    selectedItem.value.modalType = 'readonly'
    modalMode.value = 'detail'
  }

  return {
    selectedItem,
    modalMode,
    shippingForm,
    openModal,
    closeModal,
    updateForm,
    saveShipping,
  }
}
