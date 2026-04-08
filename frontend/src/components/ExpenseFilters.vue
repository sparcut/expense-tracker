<script setup lang="ts">
import { Search, X, ArrowUpDown } from 'lucide-vue-next'
import { CATEGORIES } from '../types/expense'
import type { SortField, SortDir } from '../composables/useExpenseFilters'

const search = defineModel<string>('search', { default: '' })
const category = defineModel<string>('category', { default: '' })
const startDate = defineModel<string>('startDate', { default: '' })
const endDate = defineModel<string>('endDate', { default: '' })
const sortField = defineModel<SortField>('sortField', { default: 'date' })
const sortDir = defineModel<SortDir>('sortDir', { default: 'desc' })

const props = defineProps<{ isFiltered: boolean }>()
const emit = defineEmits<{ reset: [] }>()

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
  <div class="flex flex-wrap items-center gap-2 mb-6">
    <!-- Search -->
    <div class="relative flex-1 min-w-40">
      <Search :size="14" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        v-model="search"
        type="text"
        placeholder="Search..."
        :class="inputClass + ' pl-8 w-full'"
      />
    </div>

    <!-- Category -->
    <select v-model="category" :class="inputClass">
      <option value="">All categories</option>
      <option v-for="cat in CATEGORIES" :key="cat" :value="cat">{{ cat }}</option>
    </select>

    <!-- Date range -->
    <input v-model="startDate" type="date" :class="inputClass" />
    <span class="text-muted-foreground text-sm">to</span>
    <input v-model="endDate" type="date" :class="inputClass" />

    <!-- Sort -->
    <button
      @click="toggleSort('date')"
      :class="['flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm transition-colors',
        sortField === 'date'
          ? 'border-primary text-primary bg-primary/10'
          : 'border-border text-muted-foreground hover:text-foreground']"
    >
      <ArrowUpDown :size="13" />
      Date {{ sortField === 'date' ? (sortDir === 'desc' ? '↓' : '↑') : '' }}
    </button>

    <button
      @click="toggleSort('amount')"
      :class="['flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm transition-colors',
        sortField === 'amount'
          ? 'border-primary text-primary bg-primary/10'
          : 'border-border text-muted-foreground hover:text-foreground']"
    >
      <ArrowUpDown :size="13" />
      Amount {{ sortField === 'amount' ? (sortDir === 'desc' ? '↓' : '↑') : '' }}
    </button>

    <!-- Clear -->
    <button
      v-if="isFiltered"
      @click="emit('reset')"
      class="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <X :size="13" />
      Clear
    </button>
  </div>
</template>
