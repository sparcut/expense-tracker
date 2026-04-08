<script setup lang="ts">
import { computed } from 'vue'
import { useExpenseStore } from '../stores/expenses'
import CategoryBadge from './CategoryBadge.vue'

const store = useExpenseStore()

const recent = computed(() => store.expenses.slice(0, 5))
</script>

<template>
  <div v-if="recent.length">
    <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Recent</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
      <div
        v-for="expense in recent"
        :key="expense.id"
        class="bg-card border border-border rounded-lg p-4 flex flex-col gap-2 hover:border-ring transition-colors"
      >
        <div class="flex items-start justify-between gap-2">
          <p class="font-medium text-sm leading-tight">{{ expense.title }}</p>
          <span class="font-semibold text-base shrink-0">${{ expense.amount.toFixed(2) }}</span>
        </div>

        <div class="flex items-center justify-between">
          <CategoryBadge :category="expense.category" />
          <span class="text-xs text-muted-foreground">
            {{ new Date(expense.date).toLocaleDateString() }}
          </span>
        </div>

        <p v-if="expense.description" class="text-xs text-muted-foreground line-clamp-1">
          {{ expense.description }}
        </p>
      </div>
    </div>
  </div>
</template>
