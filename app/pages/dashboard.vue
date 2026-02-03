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
import Button from '~/components/ui/button/Button.vue'
import AnalyticsChart from '~/components/dashboard/AnalyticsChart.vue'
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

// --- Analytics Data ---
const sebaranData = [
  { label: 'Kendaraan', percent: 40, color: 'bg-primary', hex: '#3b82f6' },
  { label: 'Elektronik', percent: 30, color: 'bg-emerald-500', hex: '#10b981' },
  { label: 'Properti', percent: 30, color: 'bg-amber-500', hex: '#f59e0b' },
]

const kondisiData = [
  { label: 'Berfungsi', percent: 75, color: 'bg-primary', hex: '#3b82f6' },
  { label: 'Rusak', percent: 15, color: 'bg-destructive', hex: '#ef4444' },
  { label: 'Belum Diketahui', percent: 10, color: 'bg-slate-300', hex: '#cbd5e1' },
]

const pemeliharaanData = [
  { label: 'Rutin', percent: 50, color: 'bg-primary', hex: '#3b82f6' },
  { label: 'Jarang', percent: 25, color: 'bg-amber-500', hex: '#f59e0b' },
  { label: 'Tidak Pernah', percent: 15, color: 'bg-destructive', hex: '#ef4444' },
  { label: 'Belum Diketahui', percent: 10, color: 'bg-slate-300', hex: '#cbd5e1' },
]

const pengelolaanData = [
  { label: 'Belum Dimanfaatkan', percent: 15, color: 'bg-slate-300', hex: '#cbd5e1' },
  { label: 'Dalam Perbaikan', percent: 10, color: 'bg-orange-400', hex: '#fb923c' },
  { label: 'Dibagikan Mustahik', percent: 20, color: 'bg-primary', hex: '#3b82f6' },
  { label: 'Badan Usaha Wakaf', percent: 10, color: 'bg-blue-500', hex: '#3b82f6' },
  { label: 'Program Sosial', percent: 20, color: 'bg-emerald-500', hex: '#10b981' },
  { label: 'Pembiayaan Program', percent: 5, color: 'bg-purple-500', hex: '#a855f7' },
  { label: 'Dikelola Investasi', percent: 15, color: 'bg-amber-500', hex: '#f59e0b' },
  { label: 'Rencana Pengembangan', percent: 5, color: 'bg-indigo-400', hex: '#818cf8' },
]
</script>

<template>
  <div class="space-y-10 animate-in slide-in-from-bottom-6 duration-700">
    <!-- Welcome Header -->
    <div class="flex flex-col gap-2">
      <h1 class="text-4xl font-extrabold tracking-tight text-foreground">Dashboard Overview</h1>
      <p class="text-muted-foreground font-medium line-clamp-1">Monitor dan kelola inventaris wakaf Bilistiwa secara real-time.</p>
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

    <!-- Analytics Charts Section -->
    <div class="grid gap-8 grid-cols-1 lg:grid-cols-2">
      <AnalyticsChart 
        title="Sebaran" 
        subtitle="Asset Distribution" 
        totalValue="152" 
        totalLabel="Units" 
        :data="sebaranData" 
      />
      <AnalyticsChart 
        title="Kondisi" 
        subtitle="Current Condition" 
        totalValue="85%" 
        totalLabel="Ready" 
        :data="kondisiData" 
      />
      <AnalyticsChart 
        title="Pemeliharaan" 
        subtitle="Maintenance Status" 
        totalValue="120" 
        totalLabel="Checked" 
        :data="pemeliharaanData" 
      />
      <AnalyticsChart 
        title="Pengelolaan" 
        subtitle="Management Flow" 
        totalValue="Active" 
        totalLabel="Status" 
        :data="pengelolaanData" 
        :columns="2"
      />
    </div>

    <!-- Recent Activity -->
    <div class="grid gap-8">
      <Card class="rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/50 bg-white/50 backdrop-blur-sm overflow-hidden flex flex-col">
        <CardHeader class="p-10 pb-6 bg-muted/20">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Clock class="h-5 w-5" />
            </div>
            <h3 class="text-xl font-black text-foreground tracking-tight">Aktivitas Terbaru</h3>
          </div>
        </CardHeader>
        <CardContent class="p-10 pt-8 flex-1">
          <div class="grid md:grid-cols-2 gap-10">
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
            <div class="flex flex-col justify-center gap-6">
              <div class="p-8 rounded-[2rem] bg-primary/5 border border-primary/10">
                <h4 class="text-sm font-black uppercase tracking-widest text-primary mb-2">Sistem Insights</h4>
                <p class="text-sm font-medium text-muted-foreground leading-relaxed">
                  Aktivitas pemeliharaan meningkat 12% dalam seminggu terakhir. Pastikan semua aset strategis tetap dalam kondisi "Berfungsi".
                </p>
              </div>
              <button class="w-full flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest py-4 px-6 rounded-2xl border-2 border-primary/10 text-primary hover:bg-primary hover:text-white transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/5">
                Full Activity Logs
                <ArrowUpRight class="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
