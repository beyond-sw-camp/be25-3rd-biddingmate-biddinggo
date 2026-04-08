<template>
  <main class="login-page login-page--purple">
    <div class="login-page__orb login-page__orb--top" aria-hidden="true"></div>
    <div class="login-page__orb login-page__orb--bottom" aria-hidden="true"></div>

    <section class="login-layout" aria-label="사용자 로그인">
      <aside class="login-visual" :style="{ '--login-visual-image': `url('${visualImageUrl}')` }" aria-hidden="true">
        <p class="login-visual__brand">Biddinggo</p>

        <div class="login-visual__message">
          <span class="login-visual__label">THE DIGITAL CURATOR</span>
          <h1>
            대한민국 경매
            <strong>한 곳에서 확인 하세요</strong>
          </h1>
          <p>놓치면 아까운 오늘 최저가 매물, 지금 확인하세요.</p>
        </div>

        <div class="login-visual__pagination">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </aside>

      <section class="login-form-side" aria-labelledby="login-title">
        <div class="login-copy">
          <h2 id="login-title">환영해요.</h2>
          <p>쉽고 빠른 소셜 로그인으로 바로 로그인해보세요.</p>
        </div>

        <div class="login-actions" aria-label="소셜 로그인 선택">
          <button type="button" class="login-provider login-provider--google" @click="startLogin('google')">
            <svg class="login-provider__icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285f4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34a853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#fbbc05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#ea4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
              />
            </svg>
            <span>구글로 시작하기</span>
          </button>

          <button type="button" class="login-provider login-provider--kakao" @click="startLogin('kakao')">
            <span class="login-provider__kakao-icon" aria-hidden="true"></span>
            <span>카카오로 시작하기</span>
          </button>
        </div>

        <p class="login-terms">
          로그인은
          <a href="https://www.surfit.io/terms/privacy" target="_blank" rel="noreferrer">개인 정보 보호 정책</a>
          및
          <a href="https://www.surfit.io/terms/service" target="_blank" rel="noreferrer">서비스 약관</a>에 동의하는 것을 의미하며,<br />
          서비스 이용을 위해 이메일과 이름을 수집합니다.
        </p>
      </section>
    </section>

    <p class="login-footer">© 2026 team biddingmate</p>
  </main>
</template>

<script setup>
import { useAuth } from '../composables/useAuth'

const visualImageUrl = 'https://www.figma.com/api/mcp/asset/860efbfe-88d2-4135-8255-bdbcb5eeab4b'
const { startLogin } = useAuth()
</script>
