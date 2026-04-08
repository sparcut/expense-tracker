<script setup lang="ts">
import { onMounted } from 'vue'
import { useExpenseStore } from '../stores/expenses'

const store = useExpenseStore()

onMounted(() => store.fetchExpenses())
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold mb-6">Expenses</h1>
    <p v-if="store.loading" class="text-muted-foreground">Loading...</p>
    <p v-else-if="store.error" class="text-destructive">{{ store.error }}</p>
    <p v-else-if="!store.expenses.length" class="text-muted-foreground">No expenses yet.</p>
    <ul v-else class="space-y-2">
      <li
        v-for="expense in store.expenses"
        :key="expense.id"
        class="bg-card border border-border rounded-lg px-4 py-3 flex items-center justify-between"
      >
        <div>
          <p class="font-medium">{{ expense.title }}</p>
          <p class="text-sm text-muted-foreground">{{ expense.category }} · {{ new Date(expense.date).toLocaleDateString() }}</p>
        </div>
        <span class="font-semibold">${{ expense.amount.toFixed(2) }}</span>
      </li>
    </ul>
  </div>
</template>
