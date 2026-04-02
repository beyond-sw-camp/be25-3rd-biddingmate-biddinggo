<template>
  <MyPageLayout>
    <section class="page-header-block">
      <h1>구매 / 판매 문의 내역</h1>
    </section>

    <section class="filter-bar">
      <div class="filter-chips">
        <button class="chip active" type="button">전체</button>
        <button class="chip" type="button">구매</button>
        <button class="chip" type="button">판매</button>
      </div>
    </section>

    <div class="stack-list">
      <InquiryCard v-for="inquiry in auctionInquiries" :key="inquiry.title + inquiry.date" :inquiry="inquiry" />
    </div>
  </MyPageLayout>
</template>

<script setup>
import MyPageLayout from '../../layout/MyPageLayout.vue'
import InquiryCard from '../cards/InquiryCard.vue'
import { auctionInquiries } from '../../../data/mypage'
</script>
