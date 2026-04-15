<script setup>
const props = defineProps({
  heartIcon: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
  priceLabel: {
    type: String,
    default: '현재 입찰가',
  },
  showClock: {
    type: Boolean,
    default: true,
  },
  showLiveTag: {
    type: Boolean,
    default: true,
  },
  wishlistProcessing: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select', 'toggleWishlist', 'toggle-wishlist'])

function handleSelect() {
  emit('select', props.item)
}

function handleToggleWishlist() {
  emit('toggleWishlist', props.item)
  emit('toggle-wishlist', props.item)
}
</script>

<template>
  <article class="item-card" @click="handleSelect">
    <div class="item-image-wrap">
      <div v-if="showLiveTag && (item.isTimeDeal || item.isInspected)" class="item-tag-stack">
        <span v-if="item.isTimeDeal" class="live-tag">TIME DEAL</span>
        <span v-if="item.isInspected" class="live-tag is-inspected">검수 완료</span>
      </div>
      <img :src="item.image || imageSrc" :alt="item.title" class="item-image" />

      <button
        type="button"
        class="wish-button"
        :class="{ 'is-wished': item.isWished }"
        :disabled="wishlistProcessing"
        :aria-pressed="item.isWished"
        :aria-label="item.isWished ? '찜 취소' : '찜하기'"
        @click.stop="handleToggleWishlist"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 20.25S4.5 15.98 4.5 9.8A4.25 4.25 0 0 1 12 7.05 4.25 4.25 0 0 1 19.5 9.8c0 6.18-7.5 10.45-7.5 10.45Z"
          />
        </svg>
      </button>
    </div>

    <div class="item-body">
      <p class="item-title">{{ item.title }}</p>

      <div class="price-block">
        <span>{{ priceLabel }}</span>
        <strong>{{ item.price }}</strong>
      </div>

      <div class="item-meta">
        <span>{{ showClock ? item.bids : '검수 상태' }}</span>
        <span class="divider"></span>
        <span v-if="showClock" class="time-meta">
          <v-icon icon="mdi-alarm" size="14" />
          {{ item.time }}
        </span>
        <span v-else>{{ item.time }}</span>
      </div>
    </div>
  </article>
</template>
