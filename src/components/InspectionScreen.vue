<script setup>
import { computed, ref } from 'vue'

defineEmits(['open-register'])

const props = defineProps({
  assets: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  summary: {
    type: Array,
    required: true,
  },
})

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
    return props.items
  }

  return props.items.filter((item) => item.status === activeFilter.value)
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
</script>

<template>
  <section class="inspection-screen">
    <div class="inspection-header">
      <div>
        <h2>사전 검수 상품</h2>
        <p>검수가 완료된 상품을 확인하고 경매에 등록하세요.</p>
      </div>
      <button type="button" class="inspection-action" @click="$emit('open-register', 'inspection')">
        <span class="inspection-action-plus">+</span>
        검수 신청하기
      </button>
    </div>

    <div class="inspection-summary-grid">
      <article
        v-for="item in summary"
        :key="item.label"
        class="inspection-summary-card"
      >
        <div class="inspection-summary-icon" :class="`is-${item.tone}`">
          {{ summaryIcon(item.label) }}
        </div>
        <div class="inspection-summary-copy">
          <span>{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
        </div>
      </article>
    </div>

    <div class="inspection-toolbar">
      <div class="inspection-filters">
        <button
          v-for="filter in filterOptions"
          :key="filter"
          type="button"
          class="inspection-filter"
          :class="{ 'is-active': activeFilter === filter }"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>

      <div class="inspection-search">
        <img :src="assets.listSearchIcon" alt="" class="inspection-search-icon" />
        <span>상품명, 브랜드 검색</span>
      </div>
    </div>

    <div class="inspection-card-grid">
      <article
        v-for="(item, index) in filteredItems"
        :key="`${item.title}-${index}`"
        class="inspection-product-card"
        @click="openDetail(item)"
      >
        <div class="inspection-product-image-wrap">
          <img :src="assets.listWatchImage" :alt="item.title" class="inspection-product-image" />
          <span class="inspection-badge" :class="badgeClass(item.status)">
            {{ item.status }}
          </span>
        </div>

        <div class="inspection-product-body">
          <h3>{{ item.title }}</h3>
          <div class="inspection-product-meta">
            <div>
              <span>검수 등급</span>
              <strong>{{ item.inspectionGrade }}</strong>
            </div>
            <span>{{ item.inspectionDate }}</span>
          </div>
        </div>
      </article>
    </div>

    <div v-if="selectedItem" class="inspection-status-overlay" @click.self="closeDetail">
      <section class="inspection-status-modal">
        <button type="button" class="inspection-status-close" @click="closeDetail">
          ×
        </button>

        <div class="inspection-status-grid">
          <div class="inspection-status-image-card">
            <img :src="assets.listWatchImage" :alt="selectedItem.title" class="inspection-status-image" />
          </div>

          <div class="inspection-status-summary">
            <p class="inspection-status-category">럭셔리 &gt; 시계 &gt; 남성용 시계</p>
            <span class="inspection-badge" :class="badgeClass(selectedItem.status)">
              {{ selectedItem.status }}
            </span>
            <h3>{{ selectedItem.title }}</h3>

            <div class="inspection-status-meta">
              <div>
                <span>브랜드</span>
                <strong>{{ selectedItem.brand }}</strong>
              </div>
              <div>
                <span>검수일</span>
                <strong>{{ selectedItem.inspectionDate }}</strong>
              </div>
              <div>
                <span>검수 등급</span>
                <strong class="is-grade">{{ selectedItem.inspectionGrade }}</strong>
              </div>
            </div>
          </div>

          <div class="inspection-status-section">
            <h4>상품 설명</h4>
            <p>{{ selectedItem.description }}</p>
          </div>

          <div class="inspection-status-section">
            <h4>배송 정보</h4>

            <div v-if="selectedItem.status === '검수 대기'" class="inspection-status-alert">
              <span class="inspection-status-alert-icon">!</span>
              <p>배송 정보를 등록해주세요</p>
            </div>

            <template v-else>
              <p>우체국 택배</p>
              <p>1928391823798</p>
            </template>
          </div>
        </div>

        <div class="inspection-status-actions">
          <button type="button" class="register-secondary-button" @click="closeDetail">
            {{ selectedItem.status === '검수 대기' ? '신청 취소' : '닫기' }}
          </button>
          <button type="button" class="register-primary-button" @click="handleDetailAction">
            {{ detailActionLabel(selectedItem.status) }}
          </button>
        </div>
      </section>
    </div>

    <div v-if="isShippingModalOpen" class="inspection-shipping-overlay" @click.self="closeShippingModal">
      <section class="inspection-shipping-modal">
        <div class="inspection-shipping-header">
          <h3>배송 정보 등록</h3>
          <button type="button" class="inspection-shipping-close" @click="closeShippingModal">×</button>
        </div>

        <div class="inspection-shipping-form">
          <label class="inspection-shipping-field is-small">
            <span>택배사 <em>*</em></span>
            <div class="register-select-wrap">
              <select v-model="shippingForm.company">
                <option value="" disabled>선택</option>
                <option value="우체국 택배">우체국 택배</option>
                <option value="CJ대한통운">CJ대한통운</option>
                <option value="한진택배">한진택배</option>
              </select>
            </div>
          </label>

          <label class="inspection-shipping-field">
            <span>송장 번호 <em>*</em></span>
            <input
              v-model="shippingForm.invoiceNumber"
              type="text"
              placeholder="송장 번호를 입력해 주세요."
            />
          </label>
        </div>

        <button type="button" class="inspection-shipping-submit" @click="submitShippingInfo">
          등록하기
        </button>
      </section>
    </div>
  </section>
</template>
