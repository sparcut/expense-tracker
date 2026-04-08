<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, SlidersHorizontal, X } from 'lucide-vue-next'
import { useExpenseStore } from '../stores/expenses'
import { useFilterStore } from '../stores/filters'
import ExpenseForm from '../components/ExpenseForm.vue'
import ExpenseFilters from '../components/ExpenseFilters.vue'
import CategoryTotals from '../components/CategoryTotals.vue'
import ExpenseTimeline from '../components/ExpenseTimeline.vue'
import type { ExpenseFormData } from '../types/expense'
import { formatCurrency } from '../utils/currency'

const store = useExpenseStore()
const filters = useFilterStore()
const showForm = ref(false)
const saving = ref(false)
const addError = ref('')
const filterOpen = ref(false)

onMounted(() => store.fetchExpenses())

async function handleAdd(data: ExpenseFormData) {
  saving.value = true
  addError.value = ''
  try {
    await store.createExpense(data)
    showForm.value = false
  } catch (e) {
    addError.value = (e as Error).message
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex flex-wrap items-center gap-2 mb-6">
      <h1 class="text-2xl font-semibold flex-1">Expenses</h1>
      <div class="flex items-center gap-2">
        <button
          @click="filterOpen = !filterOpen"
          :class="['flex items-center gap-2 px-3 py-2 text-sm rounded-md border transition-colors',
            filterOpen || filters.isFiltered
              ? 'border-primary text-primary bg-primary/10'
              : 'border-border text-muted-foreground hover:text-foreground']"
        >
          <SlidersHorizontal :size="14" />
          Filters
          <span v-if="filters.isFiltered" class="w-1.5 h-1.5 rounded-full bg-primary" />
        </button>
        <button
          v-if="filters.isFiltered"
          @click="filters.reset(); filterOpen = false"
          class="flex items-center gap-1 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <X :size="13" />
          Clear
        </button>
        <button
          @click="showForm = !showForm"
          class="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Plus :size="16" />
          <span class="hidden sm:inline">Add Expense</span>
          <span class="sm:hidden">Add</span>
        </button>
      </div>
    </div>

    <!-- Filter panel -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <ExpenseFilters v-if="filterOpen" class="mb-6" />
    </Transition>

    <!-- Add form -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="showForm" class="mb-6 space-y-2">
        <ExpenseForm mode="add" :loading="saving" @submit="handleAdd" @cancel="showForm = false" />
        <p v-if="addError" class="text-sm text-destructive px-1">{{ addError }}</p>
      </div>
    </Transition>

    <!-- States -->
    <p v-if="store.loading" class="text-muted-foreground">Loading...</p>
    <p v-else-if="store.error" class="text-destructive">{{ store.error }}</p>
    <template v-else>
      <!-- Category totals (respects filters) -->
      <CategoryTotals :expenses="filters.filtered" />

      <!-- All expenses heading -->
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider">All Expenses</h2>
        <span class="text-sm font-semibold">{{ formatCurrency(filters.filtered.reduce((sum, e) => sum + e.amount, 0)) }}</span>
      </div>

      <p v-if="!filters.filtered.length" class="text-muted-foreground">
        {{ filters.isFiltered ? 'No expenses match your filters.' : 'No expenses yet.' }}
      </p>
      <ExpenseTimeline v-else :expenses="filters.filtered" />
    </template>
  </div>
</template>
