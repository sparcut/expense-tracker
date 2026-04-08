<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components'
import { useTheme } from '../../composables/useTheme'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, TitleComponent])

const props = defineProps<{ data: { month: string; total: number }[] }>()
const { isDark } = useTheme()

const option = computed(() => ({
  title: { text: 'Monthly Spend', textStyle: { fontSize: 13, fontWeight: 600 } },
  tooltip: { trigger: 'axis', valueFormatter: (v: number) => `$${v.toFixed(2)}` },
  xAxis: {
    type: 'category',
    data: [...props.data].reverse().map(d => d.month),
    axisLabel: { fontSize: 11 },
  },
  yAxis: { type: 'value', axisLabel: { formatter: (v: number) => `$${v}`, fontSize: 11 } },
  series: [{
    type: 'bar',
    data: [...props.data].reverse().map(d => d.total),
    itemStyle: { borderRadius: [4, 4, 0, 0] },
    color: '#6366f1',
  }],
  grid: { left: 50, right: 16, top: 48, bottom: 32 },
}))
</script>

<template>
  <VChart :option="option" :theme="isDark() ? 'dark' : undefined" autoresize style="height: 280px" />
</template>
