<script setup lang="ts">
import { getCategoryColor } from '../types/categories'

defineProps<{ category: string }>()

function getStyle(category: string) {
  const color = getCategoryColor(category)
  return {
    color,
    backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
  }
}
</script>

<template>
  <span
    :style="getStyle(category)"
    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
  >
    {{ category }}
  </span>
</template>
