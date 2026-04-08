<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus } from 'lucide-vue-next'
import { useExpenseStore } from '../stores/expenses'
import { useExpenseFilters } from '../composables/useExpenseFilters'
import ExpenseForm from '../components/ExpenseForm.vue'
import ExpenseFilters from '../components/ExpenseFilters.vue'
import RecentExpenses from '../components/RecentExpenses.vue'
import ExpenseTimeline from '../components/ExpenseTimeline.vue'
import type { ExpenseFormData } from '../types/expense'

const store = useExpenseStore()
const showForm = ref(false)
const saving = ref(false)

const filters = useExpenseFilters(() => store.expenses)

onMounted(() => store.fetchExpenses())

async function handleAdd(data: ExpenseFormData) {
  saving.value = true
  try {
    await store.createExpense(data)
    showForm.value = false
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">Expenses</h1>
      <button
        @click="showForm = !showForm"
        class="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
      >
        <Plus :size="16" />
        Add Expense
      </button>
    </div>

    <!-- Add form -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="showForm" class="mb-6">
        <ExpenseForm :loading="saving" @submit="handleAdd" @cancel="showForm = false" />
      </div>
    </Transition>

    <!-- Recent cards -->
    <RecentExpenses />

    <!-- Filters -->
    <ExpenseFilters
      v-model:search="filters.search.value"
      v-model:category="filters.category.value"
      v-model:startDate="filters.startDate.value"
      v-model:endDate="filters.endDate.value"
      v-model:sortField="filters.sortField.value"
      v-model:sortDir="filters.sortDir.value"
      :isFiltered="filters.isFiltered.value"
      @reset="filters.reset()"
    />

    <!-- All expenses heading -->
    <h2 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">All Expenses</h2>

    <!-- States -->
    <p v-if="store.loading" class="text-muted-foreground">Loading...</p>
    <p v-else-if="store.error" class="text-destructive">{{ store.error }}</p>
    <p v-else-if="!filters.filtered.value.length" class="text-muted-foreground">
      {{ filters.isFiltered.value ? 'No expenses match your filters.' : 'No expenses yet.' }}
    </p>

    <!-- Timeline -->
    <ExpenseTimeline v-else :expenses="filters.filtered.value" />
  </div>
</template>
