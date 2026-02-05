<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import Card from '~/components/ui/card/Card.vue'
import CardHeader from '~/components/ui/card/CardHeader.vue'
import CardContent from '~/components/ui/card/CardContent.vue'
import { Button } from '~/components/ui/button'

interface ChartDataItem {
  label: string
  percent: number
  color: string // Tailwind color class or HEX
  hex?: string   // Explicit HEX for SVG
}

const props = defineProps<{
  title: string
  subtitle: string
  totalValue: string | number
  totalLabel: string
  data: ChartDataItem[]
  columns?: number
}>()

// SVG constants
const radius = 50
const circumference = 2 * Math.PI * radius

// Calculate offsets for segments to stack them
const segments = computed(() => {
  let accumulatedPercent = 0
  return props.data.map(item => {
    const dashOffset = circumference * (1 - (accumulatedPercent / 100))
    const dashArray = `${(item.percent / 100) * circumference} ${circumference}`
    accumulatedPercent += item.percent
    
    return {
      ...item,
      dashOffset,
      dashArray
    }
  })
})
</script>

<template>
  <Card class="rounded-[1.5rem] sm:rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/50 overflow-hidden bg-white/50 backdrop-blur-sm relative group h-full">
    <div class="absolute top-0 right-0 p-4 sm:p-8">
       <Button variant="ghost" size="icon" class="h-8 w-8 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl hover:bg-primary/5 hover:text-primary transition-all">
         <ArrowUpRight class="h-4 w-4 sm:h-5 sm:w-5" />
       </Button>
    </div>
    <CardHeader class="p-6 sm:p-10 pb-0">
      <div class="space-y-1">
        <h3 class="text-lg sm:text-2xl font-black text-foreground">{{ title }}</h3>
        <p class="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest">{{ subtitle }}</p>
      </div>
    </CardHeader>
    <CardContent class="p-6 sm:p-10 flex flex-col items-center justify-center lg:flex-row h-full">
      <!-- Premium SVG Pie Chart -->
      <div class="relative h-40 w-40 sm:h-52 sm:w-52 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
        <svg viewBox="0 0 200 200" class="w-full h-full -rotate-90">
          <!-- Background track -->
          <circle 
            cx="100" 
            cy="100" 
            :r="radius / 2" 
            fill="transparent" 
            stroke="currentColor" 
            :stroke-width="radius" 
            class="text-slate-100/50"
          />
          <!-- Data Segments -->
          <circle 
            v-for="segment in segments" 
            :key="segment.label"
            cx="100" 
            cy="100" 
            :r="radius / 2" 
            fill="transparent" 
            :stroke="segment.hex || 'currentColor'"
            :class="[(segment.hex || !segment.color) ? '' : segment.color.replace('bg-', 'text-')]"
            :stroke-width="radius"
            :stroke-dasharray="segment.dashArray.split(' ').map(v => parseFloat(v)/2).join(' ')"
            :stroke-dashoffset="parseFloat(segment.dashOffset)/2"
            class="transition-all duration-1000 ease-out"
          />
        </svg>
      </div>

      <!-- Legend Grid -->
      <div :class="['mt-6 sm:mt-10 lg:mt-0 lg:ml-12 grid gap-y-3 sm:gap-y-4 w-full', columns === 2 ? 'grid-cols-2 gap-x-4 sm:gap-x-8' : 'grid-cols-1']">
         <div v-for="item in data" :key="item.label" class="flex items-center gap-3">
           <div 
             :class="['w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-md sm:rounded-lg shadow-sm shrink-0', !item.hex ? item.color : '']"
             :style="{ backgroundColor: item.hex }"
            ></div>
           <div class="flex flex-col min-w-0">
             <span class="text-xs sm:text-[13px] font-bold text-foreground/80 truncate leading-tight">{{ item.label }}</span>
             <span class="text-[9px] sm:text-[10px] font-black text-muted-foreground/50 tracking-widest">{{ item.percent }}%</span>
           </div>
         </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>
/* Custom animations if needed */
</style>
