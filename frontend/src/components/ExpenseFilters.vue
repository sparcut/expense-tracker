<script setup lang="ts">
import { ArrowUpDown } from 'lucide-vue-next'
import { CATEGORIES } from '../types/expense'
import { useFilterStore } from '../stores/filters'
import type { SortField } from '../stores/filters'

const filters = useFilterStore()

function toggleSort(field: SortField) {
  if (filters.sortField === field) {
    filters.sortDir = filters.sortDir === 'desc' ? 'asc' : 'desc'
  } else {
    filters.sortField = field
    filters.sortDir = 'desc'
  }
}

function toDateStr(d: Date) {
  return d.toISOString().slice(0, 10)
}

const presets = [
  {
    label: 'This month',
    apply() {
      const now = new Date()
      filters.startDate = toDateStr(new Date(now.getFullYear(), now.getMonth(), 1))
      filters.endDate = toDateStr(new Date(now.getFullYear(), now.getMonth() + 1, 0))
    },
  },
  {
    label: 'Last month',
    apply() {
      const now = new Date()
      filters.startDate = toDateStr(new Date(now.getFullYear(), now.getMonth() - 1, 1))
      filters.endDate = toDateStr(new Date(now.getFullYear(), now.getMonth(), 0))
    },
  },
  {
    label: 'Last 30 days',
    apply() {
      const now = new Date()
      const from = new Date(now)
      from.setDate(from.getDate() - 29)
      filters.startDate = toDateStr(from)
      filters.endDate = toDateStr(now)
    },
  },
  {
    label: 'This year',
    apply() {
      const now = new Date()
      filters.startDate = toDateStr(new Date(now.getFullYear(), 0, 1))
      filters.endDate = toDateStr(new Date(now.getFullYear(), 11, 31))
    },
  },
]

const inputClass = 'px-3 py-1.5 rounded-md border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors'
</script>

<template>
  <div class="p-4 bg-card border border-border rounded-lg space-y-2">
    <!-- Row 1: search + category -->
    <div class="flex flex-wrap gap-2">
      <input v-model="filters.search" type="text" placeholder="Search..." :class="inputClass + ' flex-1 min-w-0'" />
      <select v-model="filters.category" :class="inputClass + ' flex-1 min-w-0'">
        <option value="">All categories</option>
        <option v-for="cat in CATEGORIES" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>
    <!-- Row 2: date presets -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="preset in presets"
        :key="preset.label"
        @click="preset.apply()"
        class="px-3 py-1.5 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
      >
        {{ preset.label }}
      </button>
    </div>
    <!-- Row 3: date range inputs + sort -->
    <div class="flex flex-wrap items-center gap-2">
      <input v-model="filters.startDate" type="date" :class="inputClass + ' flex-1 min-w-0'" />
      <span class="text-muted-foreground text-sm shrink-0">to</span>
      <input v-model="filters.endDate" type="date" :class="inputClass + ' flex-1 min-w-0'" />
      <button @click="toggleSort('date')" :class="['flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm transition-colors shrink-0', filters.sortField === 'date' ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground hover:text-foreground']">
        <ArrowUpDown :size="13" /> Date {{ filters.sortField === 'date' ? (filters.sortDir === 'desc' ? '↓' : '↑') : '' }}
      </button>
      <button @click="toggleSort('amount')" :class="['flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm transition-colors shrink-0', filters.sortField === 'amount' ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground hover:text-foreground']">
        <ArrowUpDown :size="13" /> Amount {{ filters.sortField === 'amount' ? (filters.sortDir === 'desc' ? '↓' : '↑') : '' }}
      </button>
    </div>
  </div>
</template>
