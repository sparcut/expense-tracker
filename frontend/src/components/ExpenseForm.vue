<script setup lang="ts">
import { reactive, computed } from 'vue'
import { CATEGORIES, type ExpenseFormData } from '../types/expense'
import AmountInput from './AmountInput.vue'

const props = withDefaults(defineProps<{
  initial?: Partial<ExpenseFormData>
  loading?: boolean
}>(), {
  loading: false,
})

const isEditing = computed(() => !!props.initial?.title)

const emit = defineEmits<{
  submit: [data: ExpenseFormData]
  cancel: []
}>()

function nowLocal() {
  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
  return now.toISOString().slice(0, 16)
}

const form = reactive<ExpenseFormData>({
  title: props.initial?.title ?? '',
  category: props.initial?.category ?? '',
  amount: props.initial?.amount ?? ('' as unknown as number),
  date: props.initial?.date ?? nowLocal(),
  description: props.initial?.description ?? '',
})

const errors = reactive({ title: '', category: '', amount: '', date: '' })

function validate() {
  errors.title    = form.title.trim() ? '' : 'Title is required'
  errors.category = form.category     ? '' : 'Category is required'
  errors.amount   = Number(form.amount) > 0 ? '' : 'Amount must be greater than 0'
  errors.date     = form.date         ? '' : 'Date is required'
  return !Object.values(errors).some(Boolean)
}

function handleSubmit() {
  if (!validate()) return
  emit('submit', { ...form, amount: Number(form.amount) })
}

const inputClass = 'w-full px-3 py-2 rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-colors'
const labelClass = 'block text-sm font-medium mb-1'
const errorClass = 'text-destructive text-xs mt-1'
</script>

<template>
  <form @submit.prevent="handleSubmit" class="bg-card border border-border rounded-lg p-5 space-y-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Title -->
      <div>
        <label :class="labelClass">Title <span class="text-destructive">*</span></label>
        <input v-model="form.title" type="text" placeholder="e.g. Coffee" :class="inputClass" />
        <p v-if="errors.title" :class="errorClass">{{ errors.title }}</p>
      </div>

      <!-- Category -->
      <div>
        <label :class="labelClass">Category <span class="text-destructive">*</span></label>
        <select v-model="form.category" :class="inputClass">
          <option value="" disabled>Select category</option>
          <option v-for="cat in CATEGORIES" :key="cat" :value="cat">{{ cat }}</option>
        </select>
        <p v-if="errors.category" :class="errorClass">{{ errors.category }}</p>
      </div>

      <!-- Amount -->
      <div>
        <label :class="labelClass">Amount <span class="text-destructive">*</span></label>
        <AmountInput v-model="form.amount" />
        <p v-if="errors.amount" :class="errorClass">{{ errors.amount }}</p>
      </div>

      <!-- Date & Time -->
      <div>
        <label :class="labelClass">Date & Time <span class="text-destructive">*</span></label>
        <input v-model="form.date" type="datetime-local" :class="inputClass" />
        <p v-if="errors.date" :class="errorClass">{{ errors.date }}</p>
      </div>
    </div>

    <!-- Description -->
    <div>
      <label :class="labelClass">Description</label>
      <textarea v-model="form.description" rows="2" placeholder="Optional notes..." :class="inputClass + ' resize-none'" />
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-2 pt-1">
      <button
        type="button"
        @click="emit('cancel')"
        class="px-4 py-2 text-sm rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {{ loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Expense' }}
      </button>
    </div>
  </form>
</template>
