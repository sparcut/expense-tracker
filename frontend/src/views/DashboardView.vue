<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardStore } from '../stores/dashboard'
import StatCard from '../components/StatCard.vue'
import BarChart from '../components/charts/BarChart.vue'
import DoughnutChart from '../components/charts/DoughnutChart.vue'
import LineChart from '../components/charts/LineChart.vue'

const store = useDashboardStore()

onMounted(() => store.fetchSummary())

function fmt(n: number) {
  return `$${n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold mb-6">Dashboard</h1>

    <p v-if="store.loading" class="text-muted-foreground">Loading...</p>
    <p v-else-if="store.error" class="text-destructive">{{ store.error }}</p>

    <template v-else>
      <!-- Stat cards -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        <StatCard label="All Time" :value="fmt(store.totalAllTime)" />
        <StatCard label="This Month" :value="fmt(store.thisMonth)" />
        <StatCard
          label="Last Month"
          :value="fmt(store.lastMonth)"
          :trend="store.momChange"
          sub="vs last month"
        />
        <StatCard label="Top Category" :value="store.topCategory" />
        <StatCard label="Categories" :value="String(store.byCategory.length)" />
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div class="bg-card border border-border rounded-lg p-4">
          <BarChart :data="store.monthly" />
        </div>
        <div class="bg-card border border-border rounded-lg p-4">
          <DoughnutChart :data="store.byCategory" />
        </div>
      </div>

      <div class="bg-card border border-border rounded-lg p-4">
        <LineChart :data="store.monthly" />
      </div>
    </template>
  </div>
</template>
