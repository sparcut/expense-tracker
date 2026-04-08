<script setup lang="ts">
import { onActivated } from 'vue'
import { useDashboardStore } from '../stores/dashboard'
import { formatCurrency } from '../utils/currency'
import StatCard from '../components/StatCard.vue'
import BarChart from '../components/charts/BarChart.vue'
import DoughnutChart from '../components/charts/DoughnutChart.vue'
import LineChart from '../components/charts/LineChart.vue'

const store = useDashboardStore()

// onActivated fires on first mount and on every return navigation (KeepAlive).
// Dashboard always refreshes since expenses may have changed on the other tab.
onActivated(() => store.fetchSummary())

const fmt = formatCurrency
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold mb-6">Dashboard</h1>

    <p v-if="store.loading" class="text-muted-foreground">Loading...</p>
    <p v-else-if="store.error" class="text-destructive">{{ store.error }}</p>

    <template v-else-if="!store.byCategory.length && !store.monthly.length">
      <div class="flex flex-col items-center justify-center py-24 text-center">
        <p class="text-lg font-medium mb-1">No data yet</p>
        <p class="text-sm text-muted-foreground">Add some expenses to see your dashboard.</p>
      </div>
    </template>

    <template v-else>
      <!-- Stat cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <StatCard label="All Time" :value="fmt(store.totalAllTime)" />
        <StatCard label="This Month" :value="fmt(store.thisMonth)" />
        <StatCard
          label="Last Month"
          :value="fmt(store.lastMonth)"
          :trend="store.momChange"
          sub="vs last month"
        />
        <StatCard label="Avg / Day" :value="fmt(store.avgPerDay)" sub="this month" />
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div v-if="store.monthly.length" class="bg-card border border-border rounded-lg p-4">
          <BarChart :data="store.monthly" />
        </div>
        <div v-if="store.byCategory.length" class="bg-card border border-border rounded-lg p-4">
          <DoughnutChart :data="store.byCategory" />
        </div>
      </div>

      <div v-if="store.monthly.length" class="bg-card border border-border rounded-lg p-4">
        <LineChart :data="store.monthly" />
      </div>
    </template>
  </div>
</template>
