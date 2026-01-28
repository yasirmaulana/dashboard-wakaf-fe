<script setup lang="ts">
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  User, 
  ShieldCheck,
  History,
  ExternalLink,
  ChevronRight
} from 'lucide-vue-next'
import { useAssets } from '~/composables/useAssets'
import Button from '~/components/ui/button/index.ts'
import Badge from '~/components/ui/badge/Badge.vue'
import Card from '~/components/ui/card/Card.vue'
import CardHeader from '~/components/ui/card/CardHeader.vue'
import CardContent from '~/components/ui/card/CardContent.vue'

const route = useRoute()
const { assets, formatCurrency } = useAssets()

const asset = computed(() => {
  return assets.value.find(a => a.id === route.params.id) || assets.value[0]
})

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Berfungsi': return 'success'
    case 'Dirawat': return 'warning'
    case 'Rusak': return 'destructive'
    default: return 'secondary'
  }
}
</script>

<template>
  <div class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
    <!-- Breadcrumbs -->
    <nav class="flex items-center gap-2 text-sm text-muted-foreground">
      <NuxtLink to="/assets" class="hover:text-foreground">Mauquf</NuxtLink>
      <ChevronRight class="h-4 w-4" />
      <span class="text-foreground font-medium">{{ asset.id }}</span>
    </nav>

    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <NuxtLink to="/assets">
          <Button variant="outline" size="icon" class="rounded-full">
            <ArrowLeft class="h-4 w-4" />
          </Button>
        </NuxtLink>
        <div>
          <h1 class="text-3xl font-bold tracking-tight">{{ asset.name }}</h1>
          <div class="flex items-center gap-2 mt-1">
            <Badge :variant="getStatusVariant(asset.status)">{{ asset.status }}</Badge>
            <span class="text-sm text-muted-foreground">Kode: {{ asset.id }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline">Edit Mauquf</Button>
        <Button class="bg-emerald-600 hover:bg-emerald-700">Cetak Sertifikat</Button>
      </div>
    </div>

    <div class="grid gap-6 md:grid-cols-3">
      <!-- Image & Quick Info -->
      <div class="md:col-span-2 space-y-6">
        <Card class="overflow-hidden border-none shadow-lg">
          <div class="aspect-video relative bg-muted flex items-center justify-center group">
             <img 
               src="https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=800&auto=format&fit=crop" 
               alt="Asset" 
               class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
             />
             <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
             <div class="absolute bottom-6 left-6 text-white">
                <p class="text-sm font-medium opacity-80">{{ asset.category }}</p>
                <h2 class="text-2xl font-bold">{{ asset.name }}</h2>
             </div>
          </div>
        </Card>

        <div class="grid gap-6 md:grid-cols-2">
           <Card>
             <CardHeader>
               <h3 class="text-lg font-semibold">Spesifikasi & Detail</h3>
             </CardHeader>
             <CardContent class="space-y-4">
               <div class="flex justify-between items-center py-2 border-b border-dashed">
                 <span class="text-sm text-muted-foreground flex items-center gap-2">
                   <ShieldCheck class="h-4 w-4" /> Kondisi
                 </span>
                 <span class="text-sm font-medium">{{ asset.condition }}</span>
               </div>
               <div class="flex justify-between items-center py-2 border-b border-dashed">
                 <span class="text-sm text-muted-foreground flex items-center gap-2">
                   <MapPin class="h-4 w-4" /> Lokasi
                 </span>
                 <span class="text-sm font-medium">{{ asset.location }}</span>
               </div>
               <div class="flex justify-between items-center py-2 border-b border-dashed">
                 <span class="text-sm text-muted-foreground flex items-center gap-2">
                   <Calendar class="h-4 w-4" /> Terdata Sejak
                 </span>
                 <span class="text-sm font-medium">{{ asset.lastUpdate }}</span>
               </div>
               <div class="flex justify-between items-center py-2">
                 <span class="text-sm text-muted-foreground flex items-center gap-2">
                   <TrendingUp class="h-4 w-4" /> Estimasi Nilai
                 </span>
                 <span class="text-sm font-bold text-emerald-600">{{ formatCurrency(asset.value) }}</span>
               </div>
             </CardContent>
           </Card>

           <Card>
             <CardHeader>
               <h3 class="text-lg font-semibold">Informasi Wakif</h3>
             </CardHeader>
             <CardContent class="flex flex-col items-center justify-center p-8 text-center space-y-4">
               <div class="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/20">
                 <User class="h-10 w-10" />
               </div>
               <div>
                 <p class="font-bold text-lg leading-tight">{{ asset.wakif }}</p>
                 <p class="text-sm text-muted-foreground">Pemberi Wakaf</p>
               </div>
               <Button variant="outline" size="sm" class="gap-2">
                 Profil Wakif
                 <ExternalLink class="h-3 w-3" />
               </Button>
             </CardContent>
           </Card>
        </div>
      </div>

      <!-- History & docs -->
      <div class="space-y-6">
        <Card>
          <CardHeader>
            <div class="flex items-center gap-2">
              <History class="h-4 w-4 text-muted-foreground" />
              <h3 class="text-lg font-semibold">Riwayat Terakhir</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div v-for="i in 3" :key="i" class="flex gap-3 pb-4 border-b last:border-0">
                <div class="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <Calendar class="h-4 w-4 text-muted-foreground" />
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium">Pemeriksaan Rutin</span>
                  <span class="text-xs text-muted-foreground">24 Jan 2024 • Oleh Admin</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card class="bg-primary text-primary-foreground">
          <CardHeader>
             <h3 class="text-lg font-semibold">Sertifikasi & Akad</h3>
          </CardHeader>
          <CardContent class="space-y-4">
            <p class="text-xs opacity-90 leading-relaxed">
              Seluruh dokumen kepemilikan dan akad wakaf telah diverifikasi oleh tim legal Bilistiwa.
            </p>
            <Button variant="secondary" class="w-full gap-2">
               Download Dokumentasi
               <Download class="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
