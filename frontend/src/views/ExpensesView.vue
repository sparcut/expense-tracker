<script setup lang="ts">
import { onMounted } from 'vue'
import { useExpenseStore } from '../stores/expenses'

const store = useExpenseStore()

onMounted(() => store.fetchExpenses())
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold text-gray-900 mb-6">Expenses</h1>
    <p v-if="store.loading" class="text-gray-500">Loading...</p>
    <p v-else-if="store.error" class="text-red-500">{{ store.error }}</p>
    <p v-else-if="!store.expenses.length" class="text-gray-400">No expenses yet.</p>
    <ul v-else class="space-y-2">
      <li
        v-for="expense in store.expenses"
        :key="expense.id"
        class="bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-center justify-between"
      >
        <div>
          <p class="font-medium text-gray-900">{{ expense.title }}</p>
          <p class="text-sm text-gray-500">{{ expense.category }} · {{ new Date(expense.date).toLocaleDateString() }}</p>
        </div>
        <span class="font-semibold text-gray-800">${{ expense.amount.toFixed(2) }}</span>
      </li>
    </ul>
  </div>
</template>
