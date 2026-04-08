<script setup lang="ts">
import { computed } from 'vue'
import type { Expense } from '../types/expense'
import CategoryBadge from './CategoryBadge.vue'

const props = defineProps<{ expenses: Expense[] }>()

function dayKey(date: string) {
  return new Date(date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatTime(date: string) {
  return new Date(date).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })
}

function isToday(date: string) {
  const d = new Date(date)
  const now = new Date()
  return d.toDateString() === now.toDateString()
}

function isYesterday(date: string) {
  const d = new Date(date)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return d.toDateString() === yesterday.toDateString()
}

function dayLabel(date: string) {
  if (isToday(date)) return 'Today'
  if (isYesterday(date)) return 'Yesterday'
  return dayKey(date)
}

const grouped = computed(() => {
  const map = new Map<string, Expense[]>()
  for (const expense of props.expenses) {
    const key = dayKey(expense.date)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(expense)
  }
  return Array.from(map.entries()).map(([key, items]) => ({
    key,
    label: dayLabel(items[0].date),
    items,
    total: items.reduce((sum, e) => sum + e.amount, 0),
  }))
})
</script>

<template>
  <div class="space-y-6">
    <div v-for="group in grouped" :key="group.key">
      <!-- Day header -->
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-semibold">{{ group.label }}</span>
        <span class="text-sm text-muted-foreground">${{ group.total.toFixed(2) }}</span>
      </div>

      <!-- Timeline entries -->
      <div class="relative">
        <!-- Vertical line -->
        <div class="absolute left-[7px] top-3 bottom-3 w-px bg-border" />

        <div class="space-y-1">
          <div
            v-for="expense in group.items"
            :key="expense.id"
            class="flex items-start gap-4 pl-6 relative"
          >
            <!-- Timeline dot -->
            <div class="absolute left-0 top-3.5 w-3.5 h-3.5 rounded-full border-2 border-primary bg-background shrink-0" />

            <!-- Expense row -->
            <div class="flex-1 bg-card border border-border rounded-lg px-4 py-3 flex items-center justify-between gap-4">
              <div class="min-w-0">
                <p class="font-medium text-sm truncate">{{ expense.title }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <CategoryBadge :category="expense.category" />
                  <span class="text-xs text-muted-foreground">{{ formatTime(expense.date) }}</span>
                </div>
              </div>
              <span class="font-semibold text-sm shrink-0">${{ expense.amount.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
