<template>
  <section class="auth-page">
    <article class="surface-card auth-card">
      <p class="auth-card__eyebrow">BIDDINGGO LOGIN</p>
      <h1>소셜 로그인으로 시작하세요</h1>
      <p class="auth-card__description">
        경매 등록, 검수 신청, 입찰 테스트는 로그인 후에만 진행할 수 있습니다.
      </p>

      <div v-if="auth.isAuthenticated" class="auth-card__status">
        <strong>{{ displayName }}</strong>
        <span>현재 로그인 상태입니다.</span>
      </div>

      <div class="auth-card__actions">
        <button type="button" class="auth-provider auth-provider--kakao" @click="startLogin('kakao')">
          카카오로 로그인
        </button>
        <button type="button" class="auth-provider auth-provider--google" @click="startLogin('google')">
          구글로 로그인
        </button>
      </div>

      <div v-if="auth.isAuthenticated" class="auth-card__footer">
        <button type="button" class="topbar-link-button" @click="router.push('/')">메인으로 이동</button>
        <button type="button" class="topbar-link-button" @click="handleLogout">로그아웃</button>
      </div>
    </article>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { auth, displayName, logout, startLogin } = useAuth()

async function handleLogout() {
  await logout()
}
</script>
