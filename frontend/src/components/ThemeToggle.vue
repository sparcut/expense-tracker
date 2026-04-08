<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '../composables/useTheme'

const { isDark, toggle } = useTheme()
</script>

<template>
  <button
    @click="toggle"
    class="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
    :aria-label="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <Sun v-if="isDark()" :size="18" />
    <Moon v-else :size="18" />
  </button>
</template>
