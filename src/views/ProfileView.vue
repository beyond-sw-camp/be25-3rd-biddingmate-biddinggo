<template>
  <ProfileScreen :profile="profile" @submit="updateProfile" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getUserProfile, updateUserProfile } from '../api/users'
import defaultAvatar from '../assets/default-avatar.svg'
import ProfileScreen from '../components/mypage/profile/ProfileScreen.vue'
import { useToast } from '../composables/useToast'
import { overviewUser } from '../data/mypage'

const { showToast } = useToast()
const profile = ref({
  name: overviewUser.name,
  nickname: overviewUser.nickname ?? '',
  email: overviewUser.email ?? '',
  bank: overviewUser.bank ?? '',
  bankCode: overviewUser.bankCode ?? '',
  bankAccount: overviewUser.bankAccount ?? '',
  avatar: overviewUser.avatar || defaultAvatar,
  imageUrl: overviewUser.imageUrl ?? overviewUser.avatar ?? defaultAvatar,
  rating: overviewUser.rating,
  reviews: overviewUser.reviews,
  joinedAt: overviewUser.joinedAt,
})

function formatDate(date) {
  if (!date) {
    return overviewUser.joinedAt
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return String(date)
  }

  return parsedDate.toLocaleDateString('ko-KR')
}

function normalizeUserProfile(user = {}) {
  return {
    name: user.name || user.username || overviewUser.name,
    nickname: user.nickname || overviewUser.nickname || '',
    email: user.email || overviewUser.email || '',
    bankCode: user.bankCode || user.bank || user.bankName || overviewUser.bankCode || '',
    bankAccount: user.bankAccount || overviewUser.bankAccount || '',
    avatar: user.imageUrl || user.profileImageUrl || overviewUser.avatar || defaultAvatar,
    imageUrl: user.imageUrl || user.profileImageUrl || overviewUser.imageUrl || overviewUser.avatar || defaultAvatar,
    rating: user.rating || overviewUser.rating,
    reviews: user.reviews || overviewUser.reviews,
    joinedAt: formatDate(user.createdAt),
  }
}

async function loadUserProfile() {
  try {
    const userProfile = await getUserProfile()
    profile.value = normalizeUserProfile(userProfile)
  } catch {
    profile.value = normalizeUserProfile()
  }
}

async function updateProfile(payload) {
  try {
    const updatedProfile = await updateUserProfile(payload)
    profile.value = normalizeUserProfile({
      ...profile.value,
      ...payload,
      ...updatedProfile,
    })
    showToast('프로필 정보가 수정되었습니다.')
  } catch (error) {
    showToast(error?.message || '프로필 정보 수정에 실패했습니다.', { color: 'error' })
  }
}

onMounted(() => {
  loadUserProfile()
})
</script>
