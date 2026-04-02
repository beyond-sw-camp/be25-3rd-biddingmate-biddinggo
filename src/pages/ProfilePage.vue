<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>프로필 관리</h1>
    </section>

    <section class="panel-card form-panel">
      <div class="profile-hero">
        <div class="profile-hero__avatar">
          <img :src="overviewUser.avatar" :alt="overviewUser.name" class="avatar" />
          <button type="button">✎</button>
        </div>
        <div>
          <div class="profile-hero__name">
            <span class="rank-badge">G</span>
            <strong>{{ overviewUser.name }}</strong>
          </div>
          <div class="profile-hero__meta">
            <span>★★★★★ {{ overviewUser.rating }} ({{ overviewUser.reviews }})</span>
            <span>가입일: {{ overviewUser.joinedAt }}</span>
          </div>
        </div>
      </div>

      <div class="form-grid">
        <label>
          <span>이름</span>
          <input value="김셀러" type="text" />
        </label>
        <label>
          <span>닉네임</span>
          <input value="셀러111" type="text" />
        </label>
        <label>
          <span>이메일</span>
          <input value="seller@gmail.com" type="email" />
        </label>
        <label>
          <span>전화번호</span>
          <input value="010-1111-2222" type="text" />
        </label>
        <label class="bank-row">
          <span>계좌번호</span>
          <div class="bank-row__inputs">
            <select>
              <option>우리은행</option>
            </select>
            <input value="123-456-789012" type="text" />
          </div>
        </label>
      </div>

      <div class="form-actions">
        <button class="primary-button" type="button">수정</button>
      </div>
    </section>
  </MyPageLayout>
</template>

<script setup>
import MyPageLayout from '../components/MyPageLayout.vue'
import { overviewUser } from '../data/mypage'
</script>
