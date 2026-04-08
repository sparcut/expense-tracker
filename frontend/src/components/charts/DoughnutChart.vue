<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import { useTheme } from '../../composables/useTheme'
import { getCategoryColor } from '../../types/categories'
import { resolveColor } from '../../utils/color'
import { formatCurrency } from '../../utils/currency'

use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent, TitleComponent])

const props = defineProps<{ data: { category: string; _sum: { amount: number } }[] }>()
const { isDark } = useTheme()

const option = computed(() => {
  const dark = isDark()
  return {
  title: { text: 'By Category', textStyle: { fontSize: 13, fontWeight: 600 } },
  tooltip: { trigger: 'item', valueFormatter: (v: number) => formatCurrency(v) },
  legend: { orient: 'vertical', right: 0, top: 'middle', textStyle: { fontSize: 11 } },
  series: [{
    type: 'pie',
    radius: ['40%', '70%'],
    center: ['40%', '55%'],
    data: props.data.map(d => ({
      name: d.category,
      value: d._sum.amount ?? 0,
      itemStyle: { color: resolveColor(getCategoryColor(d.category)) },
    })),
    label: { show: false },
    emphasis: { label: { show: true, fontSize: 12, fontWeight: 'bold' } },
  }],
  }
})
</script>

<template>
  <VChart :option="option" :theme="isDark() ? 'dark' : undefined" autoresize style="height: 280px" />
</template>
