<script setup lang="ts">
import { 
  Plus, 
  Search, 
  Eye, 
  MoreVertical 
} from 'lucide-vue-next'
import { useAssets } from '~/composables/useAssets'
import { Button } from '~/components/ui/button'
import Input from '~/components/ui/input/Input.vue'
import Badge from '~/components/ui/badge/Badge.vue'
import Card from '~/components/ui/card/Card.vue'
import CardHeader from '~/components/ui/card/CardHeader.vue'
import CardContent from '~/components/ui/card/CardContent.vue'
import Table from '~/components/ui/table/Table.vue'
import TableHeader from '~/components/ui/table/TableHeader.vue'
import TableBody from '~/components/ui/table/TableBody.vue'
import TableRow from '~/components/ui/table/TableRow.vue'
import TableHead from '~/components/ui/table/TableHead.vue'
import TableCell from '~/components/ui/table/TableCell.vue'

const { assets } = useAssets()
const searchQuery = ref('')
const selectedLocation = ref('Semua Lokasi')

const filteredAssets = computed(() => {
  return assets.value.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                         asset.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         asset.wakif.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesLocation = selectedLocation.value === 'Semua Lokasi' || asset.location === selectedLocation.value
    
    return matchesSearch && matchesLocation
  })
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
  <div class="space-y-8 animate-in slide-in-from-bottom-6 duration-700">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="space-y-1">
        <h1 class="text-4xl font-extrabold tracking-tight text-foreground">Daftar Mauquf</h1>
        <p class="text-muted-foreground text-sm font-medium">Kelola dan pantau seluruh mauquf Bilistiwa.</p>
      </div>
      <NuxtLink to="/assets/create">
        <Button class="gap-2 px-6 py-6 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
          <Plus class="h-5 w-5" />
          <span class="font-bold">Tambah Mauquf Baru</span>
        </Button>
      </NuxtLink>
    </div>

    <Card class="rounded-[2rem] border-none shadow-2xl shadow-slate-200/50 overflow-hidden bg-card/50 backdrop-blur-sm">
      <CardHeader class="pb-6 p-8 bg-muted/20">
        <div class="flex flex-col md:flex-row md:items-center gap-6">
          <div class="relative flex-1 max-w-md group">
            <Search class="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              v-model="searchQuery"
              placeholder="Cari mauquf atau kode..."
              class="pl-12 h-12 rounded-2xl border-none bg-background shadow-inner text-base focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
            />
          </div>
          <select 
            v-model="selectedLocation"
            class="h-12 rounded-2xl border-none bg-background px-6 text-sm font-bold shadow-sm focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer hover:bg-muted/50 transition-all"
          >
            <option>Semua Lokasi</option>
            <option>Depok</option>
            <option>Situdaun</option>
          </select>
        </div>
      </CardHeader>
      <CardContent class="p-8">
        <div class="rounded-3xl border border-muted/50 overflow-hidden bg-background">
          <Table>
            <TableHeader>
              <TableRow class="bg-muted/30 hover:bg-muted/30 border-none h-14">
                <TableHead class="pl-8 font-bold text-xs uppercase tracking-widest text-muted-foreground">Kode Inventaris</TableHead>
                <TableHead class="font-bold text-xs uppercase tracking-widest text-muted-foreground">Nama Mauquf</TableHead>
                <TableHead class="font-bold text-xs uppercase tracking-widest text-muted-foreground">Wakif</TableHead>
                <TableHead class="font-bold text-xs uppercase tracking-widest text-muted-foreground">Status</TableHead>
                <TableHead class="pr-8 text-right font-bold text-xs uppercase tracking-widest text-muted-foreground">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="asset in filteredAssets" :key="asset.id" class="h-20 hover:bg-primary/[0.02] border-muted/30 transition-colors duration-300">
                <TableCell class="pl-8 font-mono text-xs font-black text-primary/70">{{ asset.id }}</TableCell>
                <TableCell class="font-bold text-foreground">{{ asset.name }}</TableCell>
                <TableCell class="text-sm font-medium text-muted-foreground">{{ asset.wakif }}</TableCell>
                <TableCell>
                  <Badge :variant="getStatusVariant(asset.status)" class="px-4 py-1.5 rounded-full font-bold tracking-tight text-[10px] uppercase">
                    {{ asset.status }}
                  </Badge>
                </TableCell>
                <TableCell class="pr-8 text-right">
                  <div class="flex items-center justify-end gap-3">
                    <Button variant="outline" size="sm" class="rounded-xl border-primary/20 bg-primary/[0.03] text-primary hover:bg-primary font-bold hover:text-white transition-all transform hover:scale-105">Lihat</Button>
                    <Button variant="ghost" size="icon" class="rounded-xl text-muted-foreground hover:text-primary transition-all">
                      <MoreVertical class="h-5 w-5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <div v-if="filteredAssets.length === 0" class="py-32 text-center animate-in fade-in zoom-in duration-500">
           <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-[2rem] bg-primary/5 shadow-inner">
             <Search class="h-10 w-10 text-primary/30" />
           </div>
           <h3 class="mt-8 text-xl font-black text-foreground">Tidak ada mauquf ditemukan</h3>
           <p class="text-muted-foreground mt-2 max-w-xs mx-auto font-medium line-clamp-2">Coba sesuaikan kata kunci atau filter kamu untuk menemukan apa yang kamu cari.</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>


