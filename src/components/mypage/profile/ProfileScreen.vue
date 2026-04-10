<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>프로필 관리</h1>
    </section>

    <SurfaceCard as="section" class="panel-card form-panel">
      <div class="profile-summary">
        <div class="profile-summary__avatar">
          <img :src="overviewUser.avatar" :alt="form.name" class="avatar" />
          <button type="button">+</button>
        </div>
        <div>
          <div class="profile-summary__name">
            <span class="rank-badge">G</span>
            <strong>{{ form.name }}</strong>
          </div>
          <div class="profile-summary__meta">
            <span>사용자 평점 {{ overviewUser.rating }} ({{ overviewUser.reviews }})</span>
            <span>가입일: {{ overviewUser.joinedAt }}</span>
          </div>
        </div>
      </div>

      <div class="form-grid">
        <label>
          <span>이름</span>
          <input v-model="form.name" type="text" />
        </label>
        <label>
          <span>닉네임</span>
          <input v-model="form.nickname" type="text" />
        </label>
        <label>
          <span>이메일</span>
          <input v-model="form.email" type="email" />
        </label>
        <label>
          <span>전화번호</span>
          <input v-model="form.phone" type="text" />
        </label>
        <label class="bank-row">
          <span>계좌번호</span>
          <div class="bank-row__inputs">
            <select v-model="form.bank">
              <option v-for="bank in bankOptions" :key="bank" :value="bank">
                {{ bank }}
              </option>
            </select>
            <input v-model="form.accountNumber" type="text" />
          </div>
        </label>
      </div>

      <div class="form-actions">
        <button class="primary-button" type="button" @click="saveProfile">수정</button>
      </div>
    </SurfaceCard>
  </MyPageLayout>
</template>

<script setup>
import { reactive } from 'vue'
import SurfaceCard from '../../SurfaceCard.vue'
import MyPageLayout from '../../layout/MyPageLayout.vue'
import { overviewUser } from '../../../data/mypage'

const bankOptions = ['우리은행', '국민은행', '신한은행', '하나은행', '카카오뱅크']

const form = reactive({
  name: overviewUser.name,
  nickname: overviewUser.nickname ?? '설정11',
  email: overviewUser.email ?? 'seller@gmail.com',
  phone: overviewUser.phone ?? '010-1111-2222',
  bank: overviewUser.bank ?? '우리은행',
  accountNumber: overviewUser.accountNumber ?? '123-456-789012',
})

function saveProfile() {
  Object.assign(overviewUser, {
    name: form.name,
    nickname: form.nickname,
    email: form.email,
    phone: form.phone,
    bank: form.bank,
    accountNumber: form.accountNumber,
  })
}
</script>
