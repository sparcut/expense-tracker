<script setup lang="ts">
import { ArrowUpDown } from 'lucide-vue-next'
import { CATEGORIES } from '../types/expense'
import type { SortField, SortDir } from '../composables/useExpenseFilters'

const search = defineModel<string>('search', { default: '' })
const category = defineModel<string>('category', { default: '' })
const startDate = defineModel<string>('startDate', { default: '' })
const endDate = defineModel<string>('endDate', { default: '' })
const sortField = defineModel<SortField>('sortField', { default: 'date' })
const sortDir = defineModel<SortDir>('sortDir', { default: 'desc' })

function toggleSort(field: SortField) {
  if (sortField.value === field) {
    sortDir.value = sortDir.value === 'desc' ? 'asc' : 'desc'
  } else {
    sortField.value = field
    sortDir.value = 'desc'
  }
}

const inputClass = 'px-3 py-1.5 rounded-md border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors'
</script>

<template>
  <div class="p-4 bg-card border border-border rounded-lg space-y-2">
    <!-- Row 1: search + category -->
    <div class="flex flex-wrap gap-2">
      <input v-model="search" type="text" placeholder="Search..." :class="inputClass + ' flex-1 min-w-0'" />
      <select v-model="category" :class="inputClass + ' flex-1 min-w-0'">
        <option value="">All categories</option>
        <option v-for="cat in CATEGORIES" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>
    <!-- Row 2: date range + sort -->
    <div class="flex flex-wrap items-center gap-2">
      <input v-model="startDate" type="date" :class="inputClass + ' flex-1 min-w-0'" />
      <span class="text-muted-foreground text-sm shrink-0">to</span>
      <input v-model="endDate" type="date" :class="inputClass + ' flex-1 min-w-0'" />
      <button @click="toggleSort('date')" :class="['flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm transition-colors shrink-0', sortField === 'date' ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground hover:text-foreground']">
        <ArrowUpDown :size="13" /> Date {{ sortField === 'date' ? (sortDir === 'desc' ? '↓' : '↑') : '' }}
      </button>
      <button @click="toggleSort('amount')" :class="['flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm transition-colors shrink-0', sortField === 'amount' ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground hover:text-foreground']">
        <ArrowUpDown :size="13" /> Amount {{ sortField === 'amount' ? (sortDir === 'desc' ? '↓' : '↑') : '' }}
      </button>
    </div>
  </div>
</template>
