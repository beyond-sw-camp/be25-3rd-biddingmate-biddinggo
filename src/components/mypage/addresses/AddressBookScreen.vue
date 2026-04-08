<template>
  <section class="page-header-inline">
    <h1>배송지 관리</h1>
    <button class="primary-button" type="button" @click="openAddressModal">배송지 추가</button>
  </section>

  <div class="stack-list">
    <SurfaceCard v-if="loading" as="article" class="address-card">
      <p>배송지 목록을 불러오는 중입니다.</p>
    </SurfaceCard>

    <SurfaceCard v-else-if="errorMessage" as="article" class="address-card">
      <p>{{ errorMessage }}</p>
    </SurfaceCard>

    <SurfaceCard v-else-if="!addressItems.length" as="article" class="address-card">
      <p>등록된 배송지가 없습니다.</p>
    </SurfaceCard>

    <SurfaceCard
      v-else
      v-for="address in addressItems"
      :key="address.id"
      as="article"
      class="address-card"
    >
      <div>
        <div class="address-card__top">
          <strong>{{ address.zip }}</strong>
          <span v-if="address.primary" class="primary-tag">기본 배송지</span>
        </div>
        <p>{{ address.address }}</p>
      </div>
      <div class="address-card__actions">
        <button
          v-if="!address.primary"
          class="secondary-button"
          type="button"
          :disabled="settingDefaultId === address.id"
          @click="setPrimaryAddress(address.id)"
        >
          {{ settingDefaultId === address.id ? '설정 중...' : '기본 배송지로 설정' }}
        </button>
        <button
          class="ghost-button"
          type="button"
          :disabled="deletingId === address.id"
          @click="removeAddress(address.id)"
        >
          {{ deletingId === address.id ? '삭제 중...' : '삭제' }}
        </button>
      </div>
    </SurfaceCard>
  </div>

  <BaseModal
    :open="showAddressModal"
    panel-class="purchase-modal address-add-modal"
    header-label="배송지 추가"
    @close="closeAddressModal"
  >
    <form class="address-add-form" @submit.prevent="submitAddress">
      <div class="address-add-form__lookup">
        <label>
          <span>우편번호</span>
          <input v-model="addressForm.zip" type="text" readonly placeholder="주소 검색을 눌러주세요" />
        </label>
        <button class="secondary-button" type="button" @click="openPostcodePopup">주소 검색</button>
      </div>

      <label>
        <span>주소</span>
        <input v-model="addressForm.baseAddress" type="text" readonly placeholder="주소 검색 결과가 들어갑니다" />
      </label>

      <label>
        <span>상세주소</span>
        <input ref="detailAddressInput" v-model="addressForm.detailAddress" type="text" placeholder="상세주소를 입력해주세요" />
      </label>

      <label class="address-add-form__check">
        <input v-model="addressForm.primary" type="checkbox" />
        <span>기본 배송지로 설정</span>
      </label>

      <p v-if="postcodeError" class="address-add-form__error">{{ postcodeError }}</p>

      <div class="purchase-modal__actions">
        <button class="secondary-button purchase-modal__action" type="button" @click="closeAddressModal">취소</button>
        <button class="primary-button purchase-modal__action" type="submit" :disabled="saving">
          {{ saving ? '추가 중...' : '추가' }}
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import BaseModal from '../../BaseModal.vue'
import SurfaceCard from '../../SurfaceCard.vue'

const POSTCODE_SCRIPT_URL = 'https://t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'

let postcodeScriptPromise = null

const props = defineProps({
  addresses: {
    type: Array,
    default: () => [],
  },
  errorMessage: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  saving: {
    type: Boolean,
    default: false,
  },
  createAddress: {
    type: Function,
    default: null,
  },
  deleteAddress: {
    type: Function,
    default: null,
  },
  setDefaultAddress: {
    type: Function,
    default: null,
  },
  deletingId: {
    type: [String, Number],
    default: null,
  },
  settingDefaultId: {
    type: [String, Number],
    default: null,
  },
})

const addressItems = ref([])
const showAddressModal = ref(false)
const postcodeError = ref('')
const detailAddressInput = ref(null)

const addressForm = reactive({
  zip: '',
  baseAddress: '',
  detailAddress: '',
  primary: false,
})

watch(
  () => props.addresses,
  (addresses) => {
    addressItems.value = addresses.map((address, index) => ({
      ...address,
      id: address.id ?? `address-${index}-${address.zip}`,
    }))
  },
  { immediate: true },
)

function resetAddressForm() {
  addressForm.zip = ''
  addressForm.baseAddress = ''
  addressForm.detailAddress = ''
  addressForm.primary = addressItems.value.length === 0
  postcodeError.value = ''
}

function loadPostcodeScript() {
  if (window.kakao?.Postcode) {
    return Promise.resolve()
  }

  if (postcodeScriptPromise) {
    return postcodeScriptPromise
  }

  postcodeScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${POSTCODE_SCRIPT_URL}"]`)

    if (existingScript) {
      if (window.kakao?.Postcode) {
        resolve()
        return
      }

      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error('postcode-load-failed')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = POSTCODE_SCRIPT_URL
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('postcode-load-failed'))
    document.head.appendChild(script)
  })

  return postcodeScriptPromise
}

function buildExtraAddress(data) {
  const extraAddressParts = []

  if (data.bname && /[동로가]$/.test(data.bname)) {
    extraAddressParts.push(data.bname)
  }

  if (data.buildingName && data.apartment === 'Y') {
    extraAddressParts.push(data.buildingName)
  }

  return extraAddressParts.length ? ` (${extraAddressParts.join(', ')})` : ''
}

async function openPostcodePopup() {
  postcodeError.value = ''

  try {
    await loadPostcodeScript()

    new window.kakao.Postcode({
      oncomplete(data) {
        const selectedAddress = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress
        const extraAddress = data.userSelectedType === 'R' ? buildExtraAddress(data) : ''

        addressForm.zip = data.zonecode
        addressForm.baseAddress = `${selectedAddress}${extraAddress}`

        nextTick(() => {
          detailAddressInput.value?.focus()
        })
      },
    }).open()
  } catch {
    postcodeError.value = '주소 검색 서비스를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.'
  }
}

function openAddressModal() {
  resetAddressForm()
  showAddressModal.value = true
}

function closeAddressModal() {
  showAddressModal.value = false
  postcodeError.value = ''
}

async function submitAddress() {
  if (!addressForm.zip || !addressForm.baseAddress) {
    postcodeError.value = '주소 검색으로 배송지를 먼저 선택해주세요.'
    return
  }

  try {
    await props.createAddress?.({
      zipcode: addressForm.zip,
      address: addressForm.baseAddress,
      detailAddress: addressForm.detailAddress.trim(),
      primary: addressForm.primary,
    })
    closeAddressModal()
  } catch (error) {
    postcodeError.value = error?.message || '배송지를 등록하지 못했습니다.'
  }
}

async function setPrimaryAddress(addressId) {
  postcodeError.value = ''

  try {
    await props.setDefaultAddress?.(addressId)
  } catch (error) {
    postcodeError.value = error?.message || '기본 배송지를 설정하지 못했습니다.'
  }
}

async function removeAddress(addressId) {
  postcodeError.value = ''

  try {
    await props.deleteAddress?.(addressId)
  } catch (error) {
    postcodeError.value = error?.message || '배송지를 삭제하지 못했습니다.'
  }
}

onMounted(() => {
  loadPostcodeScript().catch(() => {
    postcodeScriptPromise = null
  })
})
</script>
