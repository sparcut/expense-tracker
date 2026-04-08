<script setup lang="ts">
defineProps<{
  title: string
  message: string
  confirmLabel?: string
  loading?: boolean
}>()

const emit = defineEmits<{ confirm: []; cancel: [] }>()
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click.self="emit('cancel')"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <!-- Dialog -->
      <div class="relative z-10 w-full max-w-sm bg-card border border-border rounded-xl shadow-xl p-6">
        <h3 class="text-base font-semibold mb-2">{{ title }}</h3>
        <p class="text-sm text-muted-foreground mb-6">{{ message }}</p>

        <div class="flex justify-end gap-2">
          <button
            @click="emit('cancel')"
            class="px-4 py-2 text-sm rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            @click="emit('confirm')"
            :disabled="loading"
            class="px-4 py-2 text-sm rounded-md bg-destructive text-destructive-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {{ loading ? 'Deleting...' : (confirmLabel ?? 'Delete') }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
