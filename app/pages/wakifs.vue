<script setup lang="ts">
import { 
  Users, 
  Plus, 
  Search, 
  MoreVertical,
  Calendar,
  Briefcase,
  Fingerprint,
  MapPin,
  Eye
} from 'lucide-vue-next'
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

// --- Mock Data ---
const wakifs = ref([
  {
    id: 1,
    nama: 'Haji Ahmad Subagja',
    tipe: 'Personal',
    nik: '3216012345670001',
    ttl: 'Depok, 12-05-1975',
    pekerjaan: 'Pengusaha Retail',
    alamat: 'Jl. Margonda Raya No. 45, Beji, Depok',
  },
  {
    id: 2,
    nama: 'Majelis Ta\'lim Al-Ikhlas',
    tipe: 'Kolektif',
    nik: '0102030405060708',
    ttl: 'Bekasi, 20-02-2010',
    pekerjaan: 'Lembaga Keagamaan',
    alamat: 'Perumahan Galaxy Blok B3, Bekasi Selatan',
  },
  {
    id: 3,
    nama: 'Siti Aminah',
    tipe: 'Personal',
    nik: '3276056712340003',
    ttl: 'Jakarta, 03-09-1988',
    pekerjaan: 'Dosen',
    alamat: 'Tebet Dalam IV No. 12, Jakarta Selatan',
  },
  {
    id: 4,
    nama: 'Komunitas Pemuda Hijrah',
    tipe: 'Kolektif',
    nik: '0908070605040302',
    ttl: 'Bandung, 15-08-2015',
    pekerjaan: 'Komunitas Sosial',
    alamat: 'Dago Atas No. 88, Bandung',
  },
])

const searchQuery = ref('')
const filteredWakifs = computed(() => {
  if (!searchQuery.value) return wakifs.value
  const query = searchQuery.value.toLowerCase()
  return wakifs.value.filter(w => 
    w.nama.toLowerCase().includes(query) || 
    w.nik.includes(query) ||
    w.alamat.toLowerCase().includes(query)
  )
})
</script>

<template>
  <div class="space-y-8 animate-in slide-in-from-bottom-6 duration-700">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="space-y-1">
        <h1 class="text-4xl font-extrabold tracking-tight text-foreground">Daftar Wakif</h1>
        <p class="text-muted-foreground text-sm font-medium">Kelola data wakif secara terpusat dan sistematis.</p>
      </div>
      <Button class="gap-2 px-6 py-6 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
        <Plus class="h-5 w-5" />
        <span class="font-bold uppercase tracking-widest text-[10px]">Tambah Wakif Baru</span>
      </Button>
    </div>

    <!-- Main Card -->
    <Card class="rounded-[2rem] border-none shadow-2xl shadow-slate-200/50 overflow-hidden bg-white/50 backdrop-blur-sm">
      <CardHeader class="pb-6 p-8 bg-muted/20">
        <div class="flex flex-col md:flex-row md:items-center gap-6">
          <div class="relative flex-1 max-w-md group">
            <Search class="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input 
              v-model="searchQuery"
              placeholder="Cari nama, NIK, atau alamat wakif..." 
              class="pl-12 h-12 rounded-2xl border-none bg-background shadow-inner text-base focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
            />
          </div>
          <div class="flex gap-4 items-center ml-auto">
             <div class="px-4 py-2 rounded-xl bg-emerald-100/50 border border-emerald-200/50 h-12 flex items-center gap-3">
               <span class="text-[10px] font-black uppercase tracking-widest text-emerald-600/70">Total Wakif</span>
               <span class="text-lg font-black text-emerald-700 leading-none">{{ wakifs.length }}</span>
             </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent class="p-8">
        <div class="rounded-3xl border border-muted/50 overflow-hidden bg-background">
          <Table>
            <TableHeader>
              <TableRow class="bg-muted/30 hover:bg-muted/30 border-none h-14">
                <TableHead class="pl-8 font-bold text-xs uppercase tracking-widest text-muted-foreground">Tipe</TableHead>
                <TableHead class="font-bold text-xs uppercase tracking-widest text-muted-foreground">Profil Wakif</TableHead>
                <TableHead class="font-bold text-xs uppercase tracking-widest text-muted-foreground">Identitas</TableHead>
                <TableHead class="font-bold text-xs uppercase tracking-widest text-muted-foreground">Pekerjaan</TableHead>
                <TableHead class="font-bold text-xs uppercase tracking-widest text-muted-foreground">Domisili</TableHead>
                <TableHead class="pr-8 text-right font-bold text-xs uppercase tracking-widest text-muted-foreground">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="wakif in filteredWakifs" :key="wakif.id" class="h-24 hover:bg-primary/[0.02] border-muted/30 transition-colors duration-300">
                <!-- Tipe -->
                <TableCell class="pl-8">
                  <Badge 
                    :class="[
                      'rounded-full px-4 py-1.5 font-bold text-[10px] uppercase tracking-tight border-none shadow-sm',
                      wakif.tipe === 'Personal' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                    ]"
                  >
                    {{ wakif.tipe }}
                  </Badge>
                </TableCell>
                
                <!-- Profil -->
                <TableCell>
                  <div class="flex flex-col gap-1">
                    <span class="text-base font-bold text-foreground">{{ wakif.nama }}</span>
                    <div class="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      <Calendar class="h-3 w-3" />
                      {{ wakif.ttl }}
                    </div>
                  </div>
                </TableCell>

                <!-- Identitas -->
                <TableCell>
                   <div class="flex items-center gap-2">
                    <Fingerprint class="h-4 w-4 text-primary/40" />
                    <code class="text-xs font-mono font-black text-primary/70">{{ wakif.nik }}</code>
                  </div>
                </TableCell>

                <!-- Pekerjaan -->
                <TableCell>
                   <div class="flex items-center gap-2.5">
                    <Briefcase class="h-4 w-4 text-muted-foreground/40" />
                    <span class="text-sm font-bold text-muted-foreground">{{ wakif.pekerjaan }}</span>
                  </div>
                </TableCell>

                <!-- Domisili -->
                <TableCell class="max-w-[200px]">
                  <div class="flex items-start gap-2">
                    <MapPin class="h-4 w-4 text-primary/50 shrink-0 mt-0.5" />
                    <span class="text-xs font-medium text-muted-foreground leading-relaxed line-clamp-2">
                      {{ wakif.alamat }}
                    </span>
                  </div>
                </TableCell>

                <!-- Actions -->
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

        <!-- Empty State -->
        <div v-if="filteredWakifs.length === 0" class="py-32 text-center animate-in fade-in zoom-in duration-500">
           <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-[2rem] bg-primary/5 shadow-inner">
             <Search class="h-10 w-10 text-primary/30" />
           </div>
           <h3 class="mt-8 text-xl font-black text-foreground">Wakif tidak ditemukan</h3>
           <p class="text-muted-foreground mt-2 max-w-xs mx-auto font-medium">Coba sesuaikan kata kunci pencarian Anda.</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
