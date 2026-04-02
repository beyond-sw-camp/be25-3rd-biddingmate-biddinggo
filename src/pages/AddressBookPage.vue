<template>
  <MyPageLayout>
    <section class="page-header-inline">
      <h1>배송지 관리</h1>
      <button class="primary-button" type="button">배송지 추가</button>
    </section>

    <div class="stack-list">
      <article v-for="address in addresses" :key="address.zip + address.primary" class="address-card">
        <div>
          <div class="address-card__top">
            <strong>{{ address.zip }}</strong>
            <span v-if="address.primary" class="primary-tag">기본 배송지</span>
          </div>
          <p>{{ address.address }}</p>
        </div>
        <div class="address-card__actions">
          <button v-if="!address.primary" class="secondary-button" type="button">기본 배송지로 설정</button>
          <button class="ghost-button" type="button">삭제</button>
        </div>
      </article>
    </div>
  </MyPageLayout>
</template>

<script setup>
import MyPageLayout from '../components/MyPageLayout.vue'
import { addresses } from '../data/mypage'
</script>
