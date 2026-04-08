<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Minus } from 'lucide-vue-next'

const props = defineProps<{ modelValue: number | string }>()
const emit = defineEmits<{ 'update:modelValue': [value: number | string] }>()

const inputRef = ref<HTMLInputElement | null>(null)
const focused = ref(false)

function adjust(e: MouseEvent, direction: 1 | -1) {
  const step = e.shiftKey ? 10 : 1
  const current = parseFloat(String(props.modelValue)) || 0
  const next = Math.max(0, parseFloat((current + direction * step).toFixed(2)))
  emit('update:modelValue', next)
}

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

function onFocus() { focused.value = true }
function onBlur() {
  focused.value = false
  const parsed = parseFloat(String(props.modelValue))
  if (!isNaN(parsed)) emit('update:modelValue', parseFloat(parsed.toFixed(2)))
}

const btnClass = 'px-3 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'
</script>

<template>
  <div class="flex rounded-md border border-border bg-card overflow-hidden focus-within:ring-2 focus-within:ring-ring transition-all">
    <button type="button" @click="adjust($event, -1)" :class="btnClass" title="Decrease (Shift for -$10)">
      <Minus :size="14" />
    </button>

    <div class="relative flex-1">
      <span class="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
      <input
        ref="inputRef"
        :value="modelValue"
        type="number"
        min="0"
        step="0.01"
        placeholder="0.00"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        class="w-full pl-6 pr-2 py-2 bg-transparent text-foreground text-sm focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
    </div>

    <button type="button" @click="adjust($event, 1)" :class="btnClass" title="Increase (Shift for +$10)">
      <Plus :size="14" />
    </button>
  </div>
</template>
