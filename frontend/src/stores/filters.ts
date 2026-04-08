import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useExpenseStore } from './expenses'

export type SortField = 'date' | 'amount'
export type SortDir = 'desc' | 'asc'

export const useFilterStore = defineStore('filters', () => {
  const search = ref('')
  const category = ref('')
  const startDate = ref('')
  const endDate = ref('')
  const sortField = ref<SortField>('date')
  const sortDir = ref<SortDir>('desc')

  const expenseStore = useExpenseStore()

  const filtered = computed(() => {
    let result = [...expenseStore.expenses]

    if (search.value.trim()) {
      const q = search.value.toLowerCase()
      result = result.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q)
      )
    }

    if (category.value) {
      result = result.filter(e => e.category === category.value)
    }

    if (startDate.value) {
      result = result.filter(e => new Date(e.date) >= new Date(startDate.value))
    }

    if (endDate.value) {
      result = result.filter(e => new Date(e.date) <= new Date(endDate.value + 'T23:59:59'))
    }

    result.sort((a, b) => {
      const valA = sortField.value === 'date' ? new Date(a.date).getTime() : a.amount
      const valB = sortField.value === 'date' ? new Date(b.date).getTime() : b.amount
      return sortDir.value === 'desc' ? valB - valA : valA - valB
    })

    return result
  })

  const isFiltered = computed(() =>
    !!search.value || !!category.value || !!startDate.value || !!endDate.value
  )

  function reset() {
    search.value = ''
    category.value = ''
    startDate.value = ''
    endDate.value = ''
    sortField.value = 'date'
    sortDir.value = 'desc'
  }

  return { search, category, startDate, endDate, sortField, sortDir, filtered, isFiltered, reset }
})
