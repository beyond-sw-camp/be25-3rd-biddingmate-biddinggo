<template>
  <section class="page-header-block">
    <h1>구매 내역</h1>
  </section>

  <section class="filter-bar">
    <div class="filter-chips">
      <button
        v-for="tag in filterTags"
        :key="tag"
        class="chip"
        :class="{ active: selectedTag === tag }"
        type="button"
        @click="selectedTag = tag"
      >
        {{ tag }}
      </button>
    </div>
  </section>

  <p v-if="errorMessage" class="feedback-strip is-error">{{ errorMessage }}</p>
  <p v-if="detailErrorMessage" class="feedback-strip is-error">{{ detailErrorMessage }}</p>

  <div class="winner-deal-list">
    <WinnerDealCard
      v-for="item in filteredItems"
      :key="item.id"
      :item="item"
      clickable
      @select="openDetailModal"
    />
  </div>

  <div ref="loadMoreTarget" class="load-more-sentinel">
    <span v-if="detailLoadingId">상세 내역을 불러오는 중입니다.</span>
    <span v-else-if="loading">구매 내역을 불러오는 중입니다.</span>
    <span v-else-if="!hasNext && items.length">마지막 구매 내역입니다.</span>
    <span v-else-if="!items.length && !errorMessage">구매 내역이 없습니다.</span>
  </div>

  <WinnerDealDetailModal
    v-if="selectedItem"
    variant="purchase"
    :item="selectedItem"
    :mode="modalMode"
    :form="shippingForm"
    :saving="savingAddress"
    :error-message="modalErrorMessage"
    @close="closeModal"
    @next="modalMode = $event"
    @back="modalMode = $event"
    @save-address="saveAddress"
    @select-address="selectAddress"
    @update-form="updateForm"
    @confirm-purchase="confirmPurchase"
  />
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import WinnerDealCard from '../cards/WinnerDealCard.vue'
import WinnerDealDetailModal from '../winner-deals/WinnerDealDetailModal.vue'
import { usePurchaseModal } from '../../../composables/usePurchaseModal'

const props = defineProps({
  errorMessage: {
    type: String,
    default: '',
  },
  hasNext: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    default: () => [],
  },
  loadDetail: {
    type: Function,
    default: async (item) => item,
  },
  saveShippingAddress: {
    type: Function,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['load-more'])
const {
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
} = usePurchaseModal({
  onSaveAddress: props.saveShippingAddress,
})

const selectedTag = ref('전체')
const loadMoreTarget = ref(null)
const detailLoadingId = ref(null)
const detailErrorMessage = ref('')
let observer = null

const filterTags = ['전체', '발송 대기', '배송 중', '배송 완료', '거래 완료', '취소']

const filteredItems = computed(() => {
  return props.items.filter((item) => selectedTag.value === '전체' || item.status === selectedTag.value)
})

async function openDetailModal(item) {
  if (detailLoadingId.value) {
    return
  }

  detailLoadingId.value = item.winnerDealId || item.id
  detailErrorMessage.value = ''

  try {
    const detailItem = await props.loadDetail(item)
    openModal(detailItem)
  } catch (error) {
    detailErrorMessage.value = error?.message || '상세 내역을 불러오지 못했습니다.'
  } finally {
    detailLoadingId.value = null
  }
}

function requestLoadMore() {
  if (props.hasNext && !props.loading) {
    emit('load-more')
  }
}

function handleScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const viewportHeight = window.innerHeight
  const scrollHeight = document.documentElement.scrollHeight

  if (scrollTop + viewportHeight >= scrollHeight - 160) {
    requestLoadMore()
  }
}

watch(
  () => [props.items.length, props.hasNext, props.loading],
  () => nextTick(handleScroll),
)

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        requestLoadMore()
      }
    },
    { rootMargin: '160px' },
  )

  if (loadMoreTarget.value) {
    observer.observe(loadMoreTarget.value)
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  nextTick(handleScroll)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', handleScroll)
})
</script>
