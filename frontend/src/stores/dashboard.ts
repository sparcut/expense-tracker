import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

interface CategorySummary {
  category: string
  _sum: { amount: number }
  _count: { id: number }
}

interface MonthlySummary {
  month: string
  total: number
}

export const useDashboardStore = defineStore('dashboard', () => {
  const byCategory = ref<CategorySummary[]>([])
  const monthly = ref<MonthlySummary[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchSummary() {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get('/expenses/summary')
      byCategory.value = data.byCategory
      monthly.value = data.monthly
    } catch {
      error.value = 'Failed to load summary'
    } finally {
      loading.value = false
    }
  }

  const totalAllTime = computed(() =>
    byCategory.value.reduce((sum, c) => sum + (c._sum.amount ?? 0), 0)
  )

  const thisMonth = computed(() => {
    const key = new Date().toISOString().slice(0, 7)
    return monthly.value.find(m => m.month === key)?.total ?? 0
  })

  const lastMonth = computed(() => {
    const d = new Date()
    d.setMonth(d.getMonth() - 1)
    const key = d.toISOString().slice(0, 7)
    return monthly.value.find(m => m.month === key)?.total ?? 0
  })

  const momChange = computed(() => {
    if (!lastMonth.value) return null
    return ((thisMonth.value - lastMonth.value) / lastMonth.value) * 100
  })

  const topCategory = computed(() =>
    byCategory.value[0]?.category ?? '—'
  )

  return { byCategory, monthly, loading, error, fetchSummary, totalAllTime, thisMonth, lastMonth, momChange, topCategory }
})
