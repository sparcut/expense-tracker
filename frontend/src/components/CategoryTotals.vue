<script setup lang="ts">
import { computed } from 'vue'
import type { Expense } from '../types/expense'
import CategoryBadge from './CategoryBadge.vue'
import { getCategoryColor } from '../types/categories'

const props = defineProps<{ expenses: Expense[] }>()

const totals = computed(() => {
  const map = new Map<string, number>()
  for (const e of props.expenses) {
    map.set(e.category, (map.get(e.category) ?? 0) + e.amount)
  }
  return Array.from(map.entries())
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
})

const grandTotal = computed(() => totals.value.reduce((sum, t) => sum + t.total, 0))

function getBarColor(category: string) {
  const color = getCategoryColor(category)
  return `color-mix(in srgb, ${color} 70%, transparent)`
}
</script>

<template>
  <div v-if="totals.length" class="mb-8">
    <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">By Category</h2>
    <div class="bg-card border border-border rounded-lg divide-y divide-border">
      <div
        v-for="{ category, total } in totals"
        :key="category"
        class="flex items-center gap-4 px-4 py-2.5"
      >
        <CategoryBadge :category="category" />
        <div class="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-500"
            :style="{ width: `${(total / grandTotal) * 100}%`, backgroundColor: getBarColor(category) }"
          />
        </div>
        <span class="text-sm font-medium tabular-nums shrink-0">${{ total.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>
