<template>
  <MyPageLayout>
    <section class="page-header-inline">
      <h1>1:1 문의 내역</h1>
      <button class="primary-button" type="button">+  문의하기</button>
    </section>

    <div class="stack-list">
      <InquiryCard v-for="inquiry in supportInquiries" :key="inquiry.title + inquiry.date" :inquiry="inquiry" />
    </div>
  </MyPageLayout>
</template>

<script setup>
import MyPageLayout from '../../MyPageLayout.vue'
import InquiryCard from '../cards/InquiryCard.vue'
import { supportInquiries } from '../../../data/mypage'
</script>


