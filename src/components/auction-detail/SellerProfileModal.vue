<script setup>
defineProps({
  assets: {
    type: Object,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
  sellerProfile: {
    type: Object,
    required: true,
  },
})

defineEmits(['close'])
</script>

<template>
  <div class="detail-inquiry-overlay" @click.self="$emit('close')">
    <section class="detail-seller-modal">
      <div class="detail-seller-modal-header">
        <button type="button" class="detail-inquiry-close" @click="$emit('close')">×</button>
      </div>

      <div class="detail-seller-profile">
        <img :src="sellerProfile.avatar" :alt="item.seller" class="detail-seller-avatar" />
        <div class="detail-seller-copy">
          <div class="detail-seller-name-row">
            <img :src="sellerProfile.badge" alt="" class="detail-seller-badge" />
            <strong>{{ item.seller }}</strong>
          </div>

          <div class="detail-seller-meta-row">
            <div class="detail-seller-rating">
              <span
                v-for="starIndex in 5"
                :key="`seller-star-${starIndex}`"
                class="detail-seller-star"
              >
                {{ starIndex <= Math.round(Number(sellerProfile.rating)) ? '★' : '☆' }}
              </span>
              <span class="detail-seller-rating-value">{{ sellerProfile.rating }}</span>
              <span class="detail-seller-review-count">(리뷰 {{ sellerProfile.reviewCount }})</span>
            </div>

            <div class="detail-seller-joined">가입일: {{ sellerProfile.joinedAt }}</div>
          </div>
        </div>
      </div>

      <div class="detail-seller-stats">
        <article
          v-for="stat in sellerProfile.stats"
          :key="stat.label"
          class="detail-seller-stat-card"
        >
          <span>{{ stat.label }}</span>
          <strong>{{ stat.value }}</strong>
        </article>
      </div>

      <div class="detail-seller-reviews">
        <h3>구매자 리뷰 ({{ sellerProfile.reviewCount }})</h3>

        <article
          v-for="review in sellerProfile.reviews"
          :key="`${review.author}-${review.date}`"
          class="detail-seller-review"
        >
          <div class="detail-seller-review-top">
            <div>
              <strong>{{ review.author }}</strong>
              <span>{{ review.date }}</span>
            </div>
            <div class="detail-seller-review-stars">
              <span
                v-for="starIndex in 5"
                :key="`${review.author}-star-${starIndex}`"
                class="detail-seller-star"
              >
                {{ starIndex <= review.rating ? '★' : '☆' }}
              </span>
            </div>
          </div>

          <img :src="assets.listWatchImage" :alt="item.title" class="detail-seller-review-image" />
          <p>{{ review.content }}</p>
        </article>
      </div>
    </section>
  </div>
</template>
