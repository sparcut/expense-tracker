<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus } from 'lucide-vue-next'
import { useExpenseStore } from '../stores/expenses'
import ExpenseForm from '../components/ExpenseForm.vue'
import CategoryBadge from '../components/CategoryBadge.vue'
import type { ExpenseFormData } from '../types/expense'

const store = useExpenseStore()
const showForm = ref(false)
const saving = ref(false)

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

    <!-- Add form (slide down) -->
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

    <!-- States -->
    <p v-if="store.loading" class="text-muted-foreground">Loading...</p>
    <p v-else-if="store.error" class="text-destructive">{{ store.error }}</p>
    <p v-else-if="!store.expenses.length" class="text-muted-foreground">No expenses yet.</p>

    <!-- List -->
    <ul v-else class="space-y-2">
      <li
        v-for="expense in store.expenses"
        :key="expense.id"
        class="bg-card border border-border rounded-lg px-4 py-3 flex items-center justify-between"
      >
        <div>
          <p class="font-medium">{{ expense.title }}</p>
          <div class="flex items-center gap-2 mt-1">
            <CategoryBadge :category="expense.category" />
            <span class="text-xs text-muted-foreground">{{ new Date(expense.date).toLocaleDateString() }}</span>
          </div>
        </div>
        <span class="font-semibold">${{ expense.amount.toFixed(2) }}</span>
      </li>
    </ul>
  </div>
</template>
