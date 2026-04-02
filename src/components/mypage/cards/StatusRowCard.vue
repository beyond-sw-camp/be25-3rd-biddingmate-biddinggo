<template>
  <article class="status-row-card" :class="{ 'status-row-card--interactive': clickable }" @click="handleClick">
    <div>
      <span class="status-pill" :class="{ muted: muted }">{{ item.status }}</span>
      <h3>{{ item.name }}</h3>
      <p>{{ item.person }}</p>
    </div>
    <div class="status-row-card__side">
      <strong>{{ item.price }}</strong>
      <span>{{ item.date }}</span>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  muted: {
    type: Boolean,
    default: false,
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

