<script setup>
const props = defineProps({
  clockIcon: {
    type: String,
    default: '',
  },
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
})

const emit = defineEmits(['select'])

function handleSelect() {
  emit('select', props.item)
}
</script>

<template>
  <article
    class="item-card"
    :class="{ 'is-highlight': item.highlight }"
    @click="handleSelect"
  >
    <div class="item-image-wrap">
      <span v-if="showLiveTag && item.highlight" class="live-tag">TIME DEAL</span>
      <img :src="item.image || imageSrc" :alt="item.title" class="item-image" />

      <button type="button" class="wish-button" aria-label="관심상품 추가" @click.stop>
        <img :src="heartIcon" alt="" />
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
          <img :src="clockIcon" alt="" />
          {{ item.time }}
        </span>
        <span v-else>{{ item.time }}</span>
      </div>
    </div>
  </article>
</template>
