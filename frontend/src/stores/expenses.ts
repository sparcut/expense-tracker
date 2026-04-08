import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../api'
import type { Expense, ExpenseFormData } from '../types/expense'

export const useExpenseStore = defineStore('expenses', () => {
  const expenses = ref<Expense[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchExpenses() {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get<Expense[]>('/expenses')
      expenses.value = data
    } catch (e) {
      error.value = 'Failed to load expenses'
    } finally {
      loading.value = false
    }
  }

  async function createExpense(form: ExpenseFormData) {
    try {
      const { data } = await api.post<Expense>('/expenses', form)
      expenses.value.push(data)
      expenses.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      return data
    } catch {
      throw new Error('Failed to add expense. Please try again.')
    }
  }

  async function updateExpense(id: string, form: ExpenseFormData) {
    try {
      const { data } = await api.put<Expense>(`/expenses/${id}`, form)
      const idx = expenses.value.findIndex((e) => e.id === id)
      if (idx !== -1) expenses.value[idx] = data
      expenses.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      return data
    } catch {
      throw new Error('Failed to update expense. Please try again.')
    }
  }

  async function deleteExpense(id: string) {
    try {
      await api.delete(`/expenses/${id}`)
      expenses.value = expenses.value.filter((e) => e.id !== id)
    } catch {
      throw new Error('Failed to delete expense. Please try again.')
    }
  }

  return { expenses, loading, error, fetchExpenses, createExpense, updateExpense, deleteExpense }
})
