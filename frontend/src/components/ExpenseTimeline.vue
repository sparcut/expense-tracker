<script setup lang="ts">
import { ref, computed } from 'vue'
import { Trash2, Pencil } from 'lucide-vue-next'
import type { Expense, ExpenseFormData } from '../types/expense'
import CategoryBadge from './CategoryBadge.vue'
import ConfirmModal from './ConfirmModal.vue'
import ExpenseForm from './ExpenseForm.vue'
import { useExpenseStore } from '../stores/expenses'
import { toLocalDatetime } from '../utils/date'

const props = defineProps<{ expenses: Expense[] }>()

const store = useExpenseStore()
const pendingDelete = ref<Expense | null>(null)
const deleting = ref(false)
const deleteError = ref('')
const editingId = ref<string | null>(null)
const saving = ref(false)
const editError = ref('')

async function confirmDelete() {
  if (!pendingDelete.value) return
  deleting.value = true
  deleteError.value = ''
  try {
    await store.deleteExpense(pendingDelete.value.id)
    pendingDelete.value = null
  } catch (e) {
    deleteError.value = (e as Error).message
  } finally {
    deleting.value = false
  }
}

async function handleEdit(id: string, data: ExpenseFormData) {
  saving.value = true
  editError.value = ''
  try {
    await store.updateExpense(id, data)
    editingId.value = null
  } catch (e) {
    editError.value = (e as Error).message
  } finally {
    saving.value = false
  }
}

function toFormData(expense: Expense): ExpenseFormData {
  return {
    title: expense.title,
    category: expense.category,
    amount: expense.amount,
    date: toLocalDatetime(expense.date),
    description: expense.description ?? '',
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
        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold">{{ group.label }}</span>
          <span class="text-xs text-muted-foreground">{{ group.items.length }} {{ group.items.length === 1 ? 'expense' : 'expenses' }}</span>
        </div>
        <span class="text-sm text-muted-foreground">${{ group.total.toFixed(2) }}</span>
      </div>

      <!-- Timeline entries -->
      <div class="relative">
        <div class="absolute left-[7px] top-3 bottom-3 w-px bg-border" />

        <div class="space-y-1">
          <div
            v-for="expense in group.items"
            :key="expense.id"
            class="flex items-start gap-4 pl-6 relative group transition-opacity"
            :class="{ 'opacity-40': pendingDelete?.id === expense.id }"
          >
            <!-- Timeline dot -->
            <div class="absolute left-[7px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-primary bg-background shrink-0" />

            <!-- Edit mode -->
            <div v-if="editingId === expense.id" class="flex-1 space-y-2">
              <ExpenseForm
                :initial="toFormData(expense)"
                :loading="saving"
                @submit="handleEdit(expense.id, $event)"
                @cancel="editingId = null"
              />
              <p v-if="editError" class="text-sm text-destructive px-1">{{ editError }}</p>
            </div>

            <!-- Display mode -->
            <div v-else class="flex-1 bg-card border border-border rounded-lg px-4 py-3 flex items-center justify-between gap-4">
              <div class="min-w-0">
                <p class="font-medium text-sm truncate">{{ expense.title }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <CategoryBadge :category="expense.category" />
                  <span class="text-xs text-muted-foreground">{{ formatTime(expense.date) }}</span>
                </div>
                <p v-if="expense.description" class="text-xs text-muted-foreground mt-1 truncate">{{ expense.description }}</p>
              </div>

              <div class="flex items-center gap-3 shrink-0">
                <span class="font-semibold text-sm">${{ expense.amount.toFixed(2) }}</span>
                <div class="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button
                    @click="editingId = expense.id"
                    class="p-1 rounded text-muted-foreground hover:text-primary transition-colors"
                    title="Edit"
                  >
                    <Pencil :size="15" />
                  </button>
                  <button
                    @click="pendingDelete = expense"
                    class="p-1 rounded text-muted-foreground hover:text-destructive transition-colors"
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
  </div>

  <ConfirmModal
    v-if="pendingDelete"
    title="Delete expense"
    :message="`Delete &quot;${pendingDelete.title}&quot;? This cannot be undone.`"
    :loading="deleting"
    :error="deleteError"
    @confirm="confirmDelete"
    @cancel="pendingDelete = null; deleteError = ''"
  />
</template>
