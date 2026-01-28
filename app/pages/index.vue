<script setup lang="ts">
import { 
  TrendingUp, 
  Package, 
  Users, 
  CheckCircle2,
  Clock,
  ArrowUpRight
} from 'lucide-vue-next'
import Card from '~/components/ui/card/Card.vue'
import CardHeader from '~/components/ui/card/CardHeader.vue'
import CardContent from '~/components/ui/card/CardContent.vue'
import { useAssets } from '~/composables/useAssets'

const { stats, formatCurrency } = useAssets()

const metrics = [
  { 
    label: 'Total Aset', 
    value: stats.value.totalAssets.toString(), 
    icon: Package, 
    color: 'text-blue-500', 
    bg: 'bg-blue-50',
    desc: 'Total item terdata'
  },
  { 
    label: 'Nilai Estimasi', 
    value: formatCurrency(stats.value.totalValue), 
    icon: TrendingUp, 
    color: 'text-emerald-500', 
    bg: 'bg-emerald-50',
    desc: 'Total valuasi saat ini'
  },
  { 
    label: 'Kondisi Baik', 
    value: `${stats.value.goodConditionPercent}%`, 
    icon: CheckCircle2, 
    color: 'text-amber-500', 
    bg: 'bg-amber-50',
    desc: 'Aset berfungsi optimal'
  },
  { 
    label: 'Wakif Aktif', 
    value: stats.value.activeWakifCount.toString(), 
    icon: Users, 
    color: 'text-purple-500', 
    bg: 'bg-purple-50',
    desc: 'Jumlah donatur aktif'
  },
]

const recentActivities = [
  { type: 'Update', title: 'Update Status Mitsubishi Pajero', time: '2 jam yang lalu', user: 'Admin' },
  { type: 'Entry', title: 'Aset Baru: Samsung Tablet S6', time: '5 jam yang lalu', user: 'Sistem' },
  { type: 'Maintenance', title: 'Servis Kawasaki KLX 150', time: '1 hari yang lalu', user: 'Zaid' },
]
</script>

<template>
  <div class="space-y-10 animate-in slide-in-from-bottom-6 duration-700">
    <!-- Welcome Header -->
    <div class="flex flex-col gap-2">
      <h1 class="text-4xl font-extrabold tracking-tight text-foreground">Dashboard Overview</h1>
      <p class="text-muted-foreground font-medium">Monitor dan kelola inventaris wakaf Bilistiwa secara real-time.</p>
    </div>

    <!-- Metrics Grid -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="item in metrics" :key="item.label" class="group rounded-[2rem] border-none shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden bg-white/50 backdrop-blur-sm">
        <CardContent class="p-8">
          <div class="flex items-center justify-between pb-4">
            <p class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{{ item.label }}</p>
            <div :class="['p-3 rounded-2xl shadow-sm transition-transform group-hover:scale-110 duration-500', item.bg]">
              <component :is="item.icon" :class="['h-5 w-5', item.color]" />
            </div>
          </div>
          <div class="space-y-1">
            <div class="text-3xl font-black text-foreground tracking-tighter">{{ item.value }}</div>
            <p class="text-[11px] font-bold text-muted-foreground/80 flex items-center gap-1">
              <ArrowUpRight class="h-3 w-3 text-emerald-500" />
              {{ item.desc }}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Charts & Activity -->
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
      <Card class="md:col-span-4 rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/50 overflow-hidden bg-white/50 backdrop-blur-sm relative group">
        <div class="absolute top-0 right-0 p-8">
           <Button variant="ghost" size="icon" class="rounded-2xl hover:bg-primary/5 hover:text-primary transition-all">
             <ArrowUpRight class="h-5 w-5" />
           </Button>
        </div>
        <CardHeader class="p-10 pb-0">
          <div class="space-y-1">
            <h3 class="text-2xl font-black text-foreground">Sebaran Aset</h3>
            <p class="text-xs font-bold text-muted-foreground uppercase tracking-widest">Growth Analytics</p>
          </div>
        </CardHeader>
        <CardContent class="p-10 h-[350px] flex items-center justify-center">
          <!-- Premium Circular Chart Representation -->
          <div class="relative h-56 w-56 rounded-full border-[24px] border-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
            <div class="absolute inset-0 rounded-full border-[24px] border-transparent border-t-primary border-r-emerald-500 border-b-amber-500 rotate-12 shadow-inner"></div>
            <div class="text-center">
              <span class="text-4xl font-black text-foreground tracking-tighter">152</span>
              <p class="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Units</p>
            </div>
          </div>
          <div class="ml-16 space-y-5">
             <div class="flex items-center gap-3">
               <div class="w-4 h-4 rounded-lg bg-primary shadow-lg shadow-primary/20"></div>
               <span class="text-sm font-bold text-foreground/80">Kendaraan (40%)</span>
             </div>
             <div class="flex items-center gap-3">
               <div class="w-4 h-4 rounded-lg bg-emerald-500 shadow-lg shadow-emerald-200"></div>
               <span class="text-sm font-bold text-foreground/80">Elektronik (30%)</span>
             </div>
             <div class="flex items-center gap-3">
               <div class="w-4 h-4 rounded-lg bg-amber-500 shadow-lg shadow-amber-200"></div>
               <span class="text-sm font-bold text-foreground/80">Properti (30%)</span>
             </div>
          </div>
        </CardContent>
      </Card>

      <Card class="md:col-span-3 rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/50 bg-white/50 backdrop-blur-sm overflow-hidden flex flex-col">
        <CardHeader class="p-10 pb-6 bg-muted/20">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Clock class="h-5 w-5" />
            </div>
            <h3 class="text-xl font-black text-foreground tracking-tight">Aktivitas Terbaru</h3>
          </div>
        </CardHeader>
        <CardContent class="p-10 pt-8 flex-1">
          <div class="space-y-8 relative">
            <div class="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary/50 via-muted/50 to-transparent border-none"></div>
            <div v-for="(activity, i) in recentActivities" :key="activity.title" class="flex gap-6 relative group">
              <div :class="['h-4 w-4 rounded-full mt-1 shrink-0 z-10 border-4 border-background transition-transform duration-300 group-hover:scale-125', i === 0 ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-muted-foreground/30']"></div>
              <div class="flex flex-col space-y-1.5 min-w-0">
                <p class="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{{ activity.title }}</p>
                <div class="flex items-center gap-3">
                  <span class="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest">{{ activity.time }}</span>
                  <span class="text-[9px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-lg tracking-widest uppercase">{{ activity.user }}</span>
                </div>
              </div>
            </div>
          </div>
          <button class="w-full mt-10 flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest py-4 px-6 rounded-2xl border-2 border-primary/10 text-primary hover:bg-primary hover:text-white transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/5">
            Full Activity Logs
            <ArrowUpRight class="h-4 w-4" />
          </button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

