<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-6">
      <span class="font-semibold text-lg text-gray-900">Expense Tracker</span>
      <RouterLink
        to="/expenses"
        class="text-sm font-medium transition-colors"
        :class="route.path === '/expenses' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'"
      >
        Expenses
      </RouterLink>
      <RouterLink
        to="/dashboard"
        class="text-sm font-medium transition-colors"
        :class="route.path === '/dashboard' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'"
      >
        Dashboard
      </RouterLink>
    </nav>

    <main class="max-w-5xl mx-auto px-6 py-8">
      <RouterView />
    </main>
  </div>
</template>
