<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>포인트 관리</h1>
    </section>

    <section class="hero-card hero-card--left">
      <p>보유 포인트</p>
      <strong>1,850,000 원</strong>
      <div class="button-row">
        <button class="primary-button" type="button">충전하기</button>
        <button class="secondary-button" type="button">환급하기</button>
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <h2>포인트 내역</h2>
      </div>
      <div class="stack-list">
        <article v-for="entry in pointHistory" :key="entry.title + entry.date" class="point-row">
          <div class="point-row__left">
            <span class="point-icon" :class="entry.tone">{{ entry.tone === 'minus' ? '−' : '+' }}</span>
            <div>
              <h3>{{ entry.title }}</h3>
              <p>{{ entry.date }}</p>
            </div>
          </div>
          <strong :class="entry.tone">{{ entry.amount }}</strong>
        </article>
      </div>
    </section>
  </MyPageLayout>
</template>

<script setup>
import MyPageLayout from '../components/MyPageLayout.vue'
import { pointHistory } from '../data/mypage'
</script>
