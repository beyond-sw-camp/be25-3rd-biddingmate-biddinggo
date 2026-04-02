<template>
  <SurfaceCard
    as="article"
    class="status-row-card"
    :class="{ 'status-row-card--interactive': clickable }"
    @click="handleClick"
  >
    <div class="status-row-card__main">
      <StatusBadge :status="item.status" />
      <h3>{{ item.name }}</h3>
      <p v-if="item.person">{{ item.person }}</p>
    </div>

    <div class="status-row-card__side">
      <strong>{{ item.price }}</strong>
      <span>{{ item.date }}</span>
    </div>
  </SurfaceCard>
</template>

<script setup>
import SurfaceCard from '../../SurfaceCard.vue'
import StatusBadge from './StatusBadge.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  clickable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select'])

function handleClick() {
  if (props.clickable) {
    emit('select', props.item)
  }
}
</script>
