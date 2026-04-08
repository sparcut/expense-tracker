<script setup lang="ts">
defineProps<{ category: string }>()

const colorMap: Record<string, string> = {
  'Food & Drink':  'var(--color-orange-500)',
  'Transport':     'var(--color-blue-500)',
  'Housing':       'var(--color-violet-500)',
  'Entertainment': 'var(--color-pink-500)',
  'Health':        'var(--color-green-500)',
  'Shopping':      'var(--color-red-500)',
  'Education':     'var(--color-teal-500)',
  'Other':         'var(--color-zinc-500)',
}

function getStyle(category: string) {
  const color = colorMap[category] ?? colorMap['Other']
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
