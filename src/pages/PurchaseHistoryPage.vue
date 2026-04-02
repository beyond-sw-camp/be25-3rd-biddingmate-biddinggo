<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>구매 내역</h1>
    </section>

    <div class="stack-list">
      <StatusRowCard
        v-for="item in purchaseStatusItems"
        :key="item.date + item.status"
        :item="item"
        :muted="item.status === '발송 대기'"
        clickable
        @select="openModal"
      />
    </div>

    <PurchaseDetailModal
      v-if="selectedItem"
      :item="selectedItem"
      :mode="modalMode"
      :form="shippingForm"
      @close="closeModal"
      @next="modalMode = $event"
      @back="modalMode = $event"
      @save-address="saveAddress"
      @select-address="selectAddress"
      @confirm-purchase="confirmPurchase"
    />
  </MyPageLayout>
</template>

<script setup>
import { reactive, ref } from 'vue'
import MyPageLayout from '../components/MyPageLayout.vue'
import StatusRowCard from '../components/StatusRowCard.vue'
import PurchaseDetailModal from '../components/PurchaseDetailModal.vue'
import { purchaseStatusItems } from '../data/mypage'

const selectedItem = ref(null)
const modalMode = ref('detail')
const shippingForm = reactive({
  name: '김셀러',
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
</script>
