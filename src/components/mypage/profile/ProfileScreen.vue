<template>
  <section class="page-header-block">
    <h1>프로필 관리</h1>
  </section>

  <SurfaceCard as="section" class="panel-card form-panel">
    <div class="profile-summary">
      <div class="profile-summary__avatar">
        <img :src="profile.avatar" :alt="displayNickname" class="avatar" @error="setDefaultAvatar" />
        <button type="button">+</button>
      </div>
      <div>
        <div class="profile-summary__name">
          <span class="rank-badge">G</span>
          <strong>{{ displayNickname }}</strong>
        </div>
        <div class="profile-summary__meta">
          <span>사용자 평점 {{ profile.rating }} ({{ profile.reviews }})</span>
          <span>가입일: {{ profile.joinedAt }}</span>
        </div>
      </div>
    </div>

    <div class="form-grid">
      <label>
        <span>이름</span>
        <input v-model="form.name" type="text" readonly aria-readonly="true" />
      </label>
      <label>
        <span>닉네임</span>
        <input v-model="form.nickname" type="text" />
      </label>
      <label>
        <span>이메일</span>
        <input v-model="form.email" type="email" readonly aria-readonly="true" />
      </label>
      <label class="bank-row">
        <span>계좌번호</span>
        <div class="bank-row__inputs">
          <v-menu location="bottom start" offset="12">
            <template #activator="{ props: menuProps }">
              <button class="sort-menu__trigger bank-menu__trigger" type="button" v-bind="menuProps">
                <span>{{ currentBankLabel }}</span>
                <v-icon icon="mdi-chevron-down" />
              </button>
            </template>

            <div class="sort-menu__panel bank-menu__panel">
              <button
                v-for="bank in bankOptions"
                :key="bank.code || 'none'"
                class="sort-menu__item"
                :class="{ 'sort-menu__item--active': form.bank === bank.code }"
                type="button"
                @click="selectBank(bank.code)"
              >
                {{ bank.label }}
              </button>
            </div>
          </v-menu>
          <input v-model="form.bankAccount" type="text" />
        </div>
      </label>
    </div>

    <div class="form-actions">
      <button class="primary-button" type="button" @click="saveProfile">수정</button>
    </div>
  </SurfaceCard>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import defaultAvatar from '../../../assets/default-avatar.svg'
import SurfaceCard from '../../SurfaceCard.vue'
import { overviewUser } from '../../../data/mypage'
import { bankOptions, normalizeBankCode as normalizeKnownBankCode } from '../../../utils/banks'

const props = defineProps({
  profile: {
    type: Object,
    default: () => overviewUser,
  },
})

const emit = defineEmits(['submit'])

const form = reactive({
  name: '',
  nickname: '',
  email: '',
  bank: '',
  bankAccount: '',
})

const currentBankLabel = computed(() => {
  return bankOptions.find((bank) => bank.code === form.bank)?.label ?? '선택 안함'
})

const displayNickname = computed(() => {
  return form.nickname || props.profile.nickname || form.name
})

function normalizeBankCode(bank) {
  if (!bank) {
    return ''
  }

  const bankValue = normalizeKnownBankCode(bank)
  const matchedBank = bankOptions.find((option) => option.code === bankValue || option.label === bankValue)

  return matchedBank?.code || bankValue
}

function syncForm(profile = {}) {
  form.name = profile.name || ''
  form.nickname = profile.nickname || ''
  form.email = profile.email || ''
  form.bank = normalizeBankCode(profile.bankCode || profile.bank)
  form.bankAccount = profile.bankAccount || profile.accountNumber || ''
}

function selectBank(bankCode) {
  form.bank = bankCode
}

function setDefaultAvatar(event) {
  event.target.src = defaultAvatar
}

watch(
  () => props.profile,
  (profile) => {
    syncForm(profile)
  },
  { immediate: true },
)

function saveProfile() {
  emit('submit', {
    nickname: form.nickname,
    imageUrl: props.profile.imageUrl || props.profile.avatar || '',
    bankCode: form.bank,
    bankAccount: form.bankAccount,
  })
}
</script>
