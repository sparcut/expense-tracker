<script setup lang="ts">
defineProps<{
  label: string
  value: string
  sub?: string
  trend?: number | null
}>()
</script>

<template>
  <div class="bg-card border border-border rounded-lg p-4">
    <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{{ label }}</p>
    <p class="text-lg font-semibold truncate">{{ value }}</p>
    <div v-if="sub || trend !== undefined" class="flex items-center gap-2 mt-1">
      <span v-if="trend !== null && trend !== undefined" :class="['text-xs font-medium', trend >= 0 ? 'text-green-500' : 'text-red-500']">
        {{ trend >= 0 ? '↑' : '↓' }} {{ Math.abs(trend).toFixed(1) }}%
      </span>
      <span v-if="sub" class="text-xs text-muted-foreground">{{ sub }}</span>
    </div>
  </div>
</template>
