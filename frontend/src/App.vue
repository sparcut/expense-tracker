<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { Wallet } from 'lucide-vue-next'
import ThemeToggle from './components/ThemeToggle.vue'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen bg-background text-foreground transition-colors">
    <nav class="bg-nav border-b border-nav-border px-6 py-4 flex items-center gap-6">
      <div class="flex items-center gap-2">
        <Wallet :size="20" class="text-primary" />
        <span class="font-semibold text-lg">Expense Tracker</span>
      </div>

      <div class="flex items-center gap-6 flex-1">
        <RouterLink
          to="/expenses"
          class="text-sm font-medium transition-colors"
          :class="route.path === '/expenses'
            ? 'text-primary'
            : 'text-muted-foreground hover:text-foreground'"
        >
          Expenses
        </RouterLink>
        <RouterLink
          to="/dashboard"
          class="text-sm font-medium transition-colors"
          :class="route.path === '/dashboard'
            ? 'text-primary'
            : 'text-muted-foreground hover:text-foreground'"
        >
          Dashboard
        </RouterLink>
      </div>

      <ThemeToggle />
    </nav>

    <main class="max-w-5xl mx-auto px-6 py-8">
      <RouterView />
    </main>
  </div>
</template>
