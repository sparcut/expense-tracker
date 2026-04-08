<script setup lang="ts">
import { ref, computed } from 'vue'
import { Trash2 } from 'lucide-vue-next'
import type { Expense } from '../types/expense'
import CategoryBadge from './CategoryBadge.vue'
import ConfirmModal from './ConfirmModal.vue'
import { useExpenseStore } from '../stores/expenses'

const props = defineProps<{ expenses: Expense[] }>()

const store = useExpenseStore()
const pendingDelete = ref<Expense | null>(null)
const deleting = ref(false)

async function confirmDelete() {
  if (!pendingDelete.value) return
  deleting.value = true
  try {
    await store.deleteExpense(pendingDelete.value.id)
    pendingDelete.value = null
  } finally {
    deleting.value = false
  }
}

function dayKey(date: string) {
  return new Date(date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatTime(date: string) {
  return new Date(date).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })
}

function isToday(date: string) {
  return new Date(date).toDateString() === new Date().toDateString()
}

function isYesterday(date: string) {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return new Date(date).toDateString() === yesterday.toDateString()
}

function dayLabel(date: string) {
  if (isToday(date)) return 'Today'
  if (isYesterday(date)) return 'Yesterday'
  return dayKey(date)
}

const grouped = computed(() => {
  const map = new Map<string, Expense[]>()
  for (const expense of props.expenses) {
    const key = dayKey(expense.date)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(expense)
  }
  return Array.from(map.entries()).map(([key, items]) => ({
    key,
    label: dayLabel(items[0].date),
    items,
    total: items.reduce((sum, e) => sum + e.amount, 0),
  }))
})
</script>

<template>
  <div class="space-y-6">
    <div v-for="group in grouped" :key="group.key">
      <!-- Day header -->
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-semibold">{{ group.label }}</span>
        <span class="text-sm text-muted-foreground">${{ group.total.toFixed(2) }}</span>
      </div>

      <!-- Timeline entries -->
      <div class="relative">
        <div class="absolute left-[7px] top-3 bottom-3 w-px bg-border" />

        <div class="space-y-1">
          <div
            v-for="expense in group.items"
            :key="expense.id"
            class="flex items-start gap-4 pl-6 relative group"
          >
            <!-- Timeline dot -->
            <div class="absolute left-0 top-3.5 w-3.5 h-3.5 rounded-full border-2 border-primary bg-background shrink-0" />

            <!-- Expense row -->
            <div class="flex-1 bg-card border border-border rounded-lg px-4 py-3 flex items-center justify-between gap-4">
              <div class="min-w-0">
                <p class="font-medium text-sm truncate">{{ expense.title }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <CategoryBadge :category="expense.category" />
                  <span class="text-xs text-muted-foreground">{{ formatTime(expense.date) }}</span>
                </div>
              </div>

              <div class="flex items-center gap-3 shrink-0">
                <span class="font-semibold text-sm">${{ expense.amount.toFixed(2) }}</span>
                <button
                  @click="pendingDelete = expense"
                  class="opacity-0 group-hover:opacity-100 p-1 rounded text-muted-foreground hover:text-destructive transition-all"
                  title="Delete"
                >
                  <Trash2 :size="15" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Confirm modal -->
  <ConfirmModal
    v-if="pendingDelete"
    title="Delete expense"
    :message="`Delete &quot;${pendingDelete.title}&quot;? This cannot be undone.`"
    :loading="deleting"
    @confirm="confirmDelete"
    @cancel="pendingDelete = null"
  />
</template>
