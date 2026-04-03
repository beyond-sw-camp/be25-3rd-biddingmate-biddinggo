<script setup>
defineProps({
  assets: {
    type: Object,
    required: true,
  },
  profile: {
    type: Object,
    required: true,
  },
})
</script>

<template>
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
</template>
