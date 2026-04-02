<script setup>
const props = defineProps({
  assets: {
    type: Object,
    required: true,
  },
  profile: {
    type: Object,
    required: true,
  },
  bidItems: {
    type: Array,
    required: true,
  },
  purchaseItems: {
    type: Array,
    required: true,
  },
})

function purchaseBadgeClass(status) {
  return status === '거래완료' ? 'is-complete' : 'is-waiting'
}
</script>

<template>
  <section class="mypage-screen">
    <header class="mypage-header">
      <h2>마이페이지</h2>
    </header>

    <section class="mypage-profile-card">
      <div class="mypage-profile-row">
        <div class="mypage-profile-user">
          <img :src="assets.mypageAvatar" :alt="profile.seller" class="mypage-avatar" />
          <div class="mypage-user-copy">
            <img :src="assets.mypageBadge" alt="" class="mypage-badge" />
            <strong>{{ profile.seller }}</strong>
          </div>
        </div>
      </div>

      <div class="mypage-points-block">
        <span>보유 포인트</span>
        <strong>{{ profile.points }}</strong>
      </div>
    </section>

    <section class="mypage-section">
      <div class="mypage-section-header">
        <h3>입찰 내역</h3>
        <button type="button">View All</button>
      </div>

      <div class="mypage-bid-list">
        <article
          v-for="(item, index) in bidItems"
          :key="`${item.title}-${index}`"
          class="mypage-bid-card"
        >
          <img :src="assets.mypageProductImage" :alt="item.title" class="mypage-bid-image" />

          <div class="mypage-bid-content">
            <div class="mypage-bid-copy">
              <span class="mypage-chip is-auction">{{ item.status }}</span>
              <h4>{{ item.title }}</h4>
              <div class="mypage-time">
                <img :src="assets.clockIcon" alt="" />
                <span>{{ item.time }}</span>
              </div>
            </div>

            <div class="mypage-bid-prices">
              <span>현재가</span>
              <strong>{{ item.currentPrice }}</strong>
              <span>내 입찰가</span>
              <strong>{{ item.myBidPrice }}</strong>
              <span>{{ item.date }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="mypage-section">
      <div class="mypage-section-header">
        <h3>진행 중 구매 현황</h3>
        <button type="button">View All</button>
      </div>

      <div class="mypage-purchase-list">
        <article
          v-for="(item, index) in purchaseItems"
          :key="`${item.title}-${index}`"
          class="mypage-purchase-card"
        >
          <div class="mypage-purchase-copy">
            <span class="mypage-chip" :class="purchaseBadgeClass(item.status)">{{ item.status }}</span>
            <h4>{{ item.title }}</h4>
            <p>구매자: {{ item.buyer }}</p>
          </div>

          <div class="mypage-purchase-price">
            <strong>{{ item.price }}</strong>
            <span>{{ item.date }}</span>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>
