<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components'
import { useTheme } from '../../composables/useTheme'
import { resolveColor } from '../../utils/color'

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, TitleComponent])

const props = defineProps<{ data: { month: string; total: number }[] }>()
const { isDark } = useTheme()

const option = computed(() => {
  const dark = isDark()
  const sorted = [...props.data].reverse()
  let running = 0
  const cumulative = sorted.map(d => {
    running += d.total
    return parseFloat(running.toFixed(2))
  })

  return {
    title: { text: 'Cumulative Spend', textStyle: { fontSize: 13, fontWeight: 600 } },
    tooltip: { trigger: 'axis', valueFormatter: (v: number) => `$${v.toFixed(2)}` },
    xAxis: { type: 'category', data: sorted.map(d => d.month), axisLabel: { fontSize: 11 } },
    yAxis: { type: 'value', axisLabel: { formatter: (v: number) => `$${v}`, fontSize: 11 } },
    series: [{
      type: 'line',
      data: cumulative,
      smooth: true,
      color: resolveColor('var(--primary)'),
      areaStyle: { opacity: 0.15 },
    }],
    grid: { left: 50, right: 16, top: 48, bottom: 32 },
  }
})
</script>

<template>
  <VChart :option="option" :theme="isDark() ? 'dark' : undefined" autoresize style="height: 280px" />
</template>
