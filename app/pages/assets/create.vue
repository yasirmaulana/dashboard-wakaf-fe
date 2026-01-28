<script setup lang="ts">
import { 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Package, 
  Info, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import Card from '~/components/ui/card/Card.vue'
import CardHeader from '~/components/ui/card/CardHeader.vue'
import CardContent from '~/components/ui/card/CardContent.vue'
import Input from '~/components/ui/input/Input.vue'

const router = useRouter()

// --- Form State ---
const currentStep = ref(1)
const steps = [
  { id: 1, title: 'Kategori', description: 'Pilih jenis & lokasi mauquf', icon: Package },
  { id: 2, title: 'Detail', description: 'Informasi mauquf & wakif', icon: Info },
  { id: 3, title: 'Media', description: 'Upload foto pendukung', icon: ImageIcon },
]

const form = reactive({
  // Step 1: Code Generation parts
  location: '01',
  harta: '02',
  jenis: '01',
  nama: '01',
  semester: '01',
  tahun: '25',
  urut: '003', // Demo next sequence

  // Step 2: Details
  namaBarang: '',
  wakif: '',
  penerimaManfaat: '',
  kondisi: 'Masih Berfungsi',
  nilai: 0,
})

// --- Options Data ---
const options = {
  locations: [
    { value: '01', label: 'Sukmajaya Kota Depok' },
    { value: '02', label: 'Purwakarta' },
    { value: '03', label: 'Jakarta Timur' },
  ],
  harta: [
    { value: '02', label: 'Harta Bergerak' },
    { value: '03', label: 'Harta Tidak Bergerak' },
  ],
  jenis: [
    { value: '01', label: 'Kendaraan' },
    { value: '02', label: 'Sarana & Prasarana' },
  ],
  namaProduk: [
    { value: '01', label: 'Mobil' },
    { value: '02', label: 'Motor' },
    { value: '03', label: 'Peralatan Elektronik' },
  ],
  semester: [
    { value: '01', label: 'Jan - Jun' },
    { value: '02', label: 'Jul - Des' },
  ],
  kondisi: ['Masih Berfungsi', 'Jarang Dirawat', 'Rusak']
}

// --- Live Code Generation ---
const generatedCode = computed(() => {
  return `${form.location}.${form.harta}.${form.jenis}.${form.nama}.${form.urut}/${form.semester}/${form.tahun}`
})

// --- Step Navigation ---
const nextStep = () => {
  if (currentStep.value < 3) currentStep.value++
}
const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
}

const isSubmitting = ref(false)
const saveAsset = async () => {
  isSubmitting.value = true
  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  isSubmitting.value = false
  router.push('/assets')
}
</script>

<template>
  <div class="space-y-10 max-w-4xl mx-auto animate-in slide-in-from-bottom-6 duration-700 pb-32">
    <!-- Header -->
    <div class="flex items-center gap-6">
      <Button variant="ghost" size="icon" @click="router.back()" class="h-12 w-12 rounded-2xl bg-card border shadow-sm hover:text-primary transition-all">
        <ChevronLeft class="h-6 w-6" />
      </Button>
      <div class="space-y-1">
        <h1 class="text-4xl font-extrabold tracking-tight text-foreground">Tambah Mauquf Baru</h1>
        <p class="text-muted-foreground font-medium">Lengkapi informasi untuk mendaftarkan mauquf baru.</p>
      </div>
    </div>

    <!-- Stepper Indicator -->
    <div class="grid grid-cols-3 gap-4 md:gap-8">
      <div 
        v-for="step in steps" 
        :key="step.id"
        :class="[
          'relative p-5 rounded-[2rem] border transition-all duration-500',
          currentStep === step.id ? 'border-primary/30 bg-primary/[0.03] shadow-lg shadow-primary/5' : 'border-muted/50 bg-card'
        ]"
      >
        <div class="flex items-center gap-4">
          <div :class="[
            'h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm',
            currentStep >= step.id ? 'bg-primary text-primary-foreground rotate-0' : 'bg-muted text-muted-foreground -rotate-6'
          ]">
            <component :is="step.icon" class="h-6 w-6" />
          </div>
          <div class="hidden md:block overflow-hidden">
            <p class="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Step {{ step.id }}</p>
            <p class="text-sm font-bold truncate">{{ step.title }}</p>
          </div>
          <div v-if="currentStep > step.id" class="ml-auto h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
             <CheckCircle2 class="text-white h-4 w-4" />
          </div>
        </div>
      </div>
    </div>

    <!-- Live Preview Code -->
    <Card class="rounded-[2.5rem] border-none bg-gradient-to-br from-primary to-emerald-800 shadow-2xl shadow-primary/20 overflow-hidden relative group">
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
      <CardContent class="p-10 relative z-10">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div class="space-y-3">
            <div class="flex items-center gap-2">
               <span class="h-2 w-2 rounded-full bg-emerald-300 animate-pulse"></span>
               <span class="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-100/70">Live Inventory Identifier</span>
            </div>
            <div class="text-3xl md:text-5xl font-mono font-black tracking-tighter text-white drop-shadow-lg">
              {{ generatedCode }}
            </div>
          </div>
          <div class="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl text-white text-xs font-black uppercase tracking-widest">
            Generated Real-time
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Form Content -->
    <div class="bg-card/50 backdrop-blur-sm rounded-[3rem] p-4 md:p-10 border border-muted/50 shadow-xl shadow-slate-200/50">
      <transition 
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="transform translate-y-8 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-8 opacity-0"
        mode="out-in"
      >
        <div :key="currentStep" class="grid gap-8">
          <!-- STEP 1: Categories -->
          <div v-if="currentStep === 1" class="grid gap-8 md:grid-cols-2 animate-in fade-in duration-700">
            <div class="space-y-3">
              <label class="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Lokasi Bilistiwa</label>
              <select v-model="form.location" class="w-full h-14 rounded-2xl border bg-background px-4 text-sm font-bold focus:ring-4 focus:ring-primary/10 hover:border-primary/30 transition-all outline-none appearance-none">
                <option v-for="opt in options.locations" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="space-y-3">
              <label class="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Macam Harta Wakaf</label>
              <select v-model="form.harta" class="w-full h-14 rounded-2xl border bg-background px-4 text-sm font-bold focus:ring-4 focus:ring-primary/10 hover:border-primary/30 transition-all outline-none appearance-none">
                <option v-for="opt in options.harta" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="space-y-3">
              <label class="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Jenis Mauquf</label>
              <select v-model="form.jenis" class="w-full h-14 rounded-2xl border bg-background px-4 text-sm font-bold focus:ring-4 focus:ring-primary/10 hover:border-primary/30 transition-all outline-none appearance-none">
                <option v-for="opt in options.jenis" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="space-y-3">
              <label class="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Nama Mauquf</label>
              <select v-model="form.nama" class="w-full h-14 rounded-2xl border bg-background px-4 text-sm font-bold focus:ring-4 focus:ring-primary/10 hover:border-primary/30 transition-all outline-none appearance-none">
                <option v-for="opt in options.namaProduk" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
          </div>

          <!-- STEP 2: Details -->
          <div v-if="currentStep === 2" class="space-y-10 animate-in fade-in duration-700">
            <div class="grid gap-8 md:grid-cols-3">
              <div class="space-y-3">
                <label class="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Semester</label>
                <select v-model="form.semester" class="w-full h-14 rounded-2xl border bg-background px-4 text-sm font-bold focus:ring-4 focus:ring-primary/10 outline-none">
                  <option v-for="opt in options.semester" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>
              <div class="space-y-3">
                <label class="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Tahun (2 Digit)</label>
                <Input v-model="form.tahun" placeholder="25" class="h-14 rounded-2xl text-center font-black text-lg" />
              </div>
              <div class="space-y-3">
                <label class="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Nomor Urut</label>
                <Input v-model="form.urut" readonly class="h-14 rounded-2xl bg-muted/50 border-none text-center font-black text-lg text-primary" />
              </div>
            </div>

            <div class="h-px bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent"></div>

            <div class="grid gap-8 md:grid-cols-2">
               <div class="space-y-3">
                 <label class="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Nama Barang/Mauquf</label>
                 <Input v-model="form.namaBarang" placeholder="Deskripsi lengkap mauquf" class="h-14 rounded-2xl px-6 font-bold" />
               </div>
               <div class="space-y-3">
                 <label class="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Nama Wakif</label>
                 <Input v-model="form.wakif" placeholder="Pemberi wakaf" class="h-14 rounded-2xl px-6 font-bold" />
               </div>
               <div class="space-y-3">
                 <label class="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Penerima Manfaat</label>
                 <Input v-model="form.penerimaManfaat" placeholder="Instansi / Lembaga" class="h-14 rounded-2xl px-6 font-bold" />
               </div>
               <div class="space-y-3">
                <label class="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Kondisi Mauquf</label>
                <select v-model="form.kondisi" class="w-full h-14 rounded-2xl border bg-background px-6 text-sm font-bold focus:ring-4 focus:ring-primary/10 outline-none appearance-none">
                  <option v-for="opt in options.kondisi" :key="opt" :value="opt">{{ opt }}</option>
                </select>
              </div>
              <div class="space-y-3 md:col-span-2">
                 <label class="text-sm font-black uppercase tracking-widest text-muted-foreground ml-1">Estimasi Nilai (IDR)</label>
                 <Input type="number" v-model="form.nilai" placeholder="0" class="h-16 rounded-3xl px-8 font-black text-2xl text-emerald-600 bg-emerald-50/30 border-emerald-100" />
               </div>
            </div>
          </div>

          <!-- STEP 3: Media -->
          <div v-if="currentStep === 3" class="space-y-8 animate-in fade-in duration-700">
            <div class="group relative border-4 border-dashed border-muted/50 rounded-[3rem] p-20 text-center bg-muted/10 hover:bg-primary/[0.02] hover:border-primary/20 transition-all duration-500 overflow-hidden">
              <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="relative z-10">
                <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-[2rem] bg-background shadow-xl mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <ImageIcon class="h-10 w-10 text-primary" />
                </div>
                <h3 class="text-2xl font-black text-foreground">Upload Media</h3>
                <p class="text-muted-foreground font-medium mt-2 mb-10 max-w-xs mx-auto">Pilih foto mauquf atau dokumentasi pendukung untuk verifikasi.</p>
                <Button variant="outline" class="px-10 h-14 rounded-2xl border-2 font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-primary/30">Pilih File</Button>
              </div>
            </div>
            
            <div class="bg-amber-100/30 border border-amber-200/50 rounded-3xl p-6 flex gap-4 text-amber-900 shadow-sm shadow-amber-950/5">
               <div class="h-10 w-10 shrink-0 bg-amber-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-amber-200/50">
                 <Info class="h-5 w-5" />
               </div>
               <div class="space-y-1">
                 <p class="font-bold">Tips Fotografi</p>
                 <p class="text-sm font-medium opacity-80 leading-relaxed text-amber-900/80">Pastikan pencahayaan cukup dan foto memperlihatkan nomor seri atau ciri khas mauquf untuk validitas data.</p>
               </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex items-center justify-between border-t border-dashed pt-10">
      <Button 
        variant="outline" 
        @click="prevStep" 
        :disabled="currentStep === 1"
        class="h-14 px-8 rounded-2xl border-2 font-bold shadow-sm disabled:opacity-30 group"
      >
        <ChevronLeft class="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Kembali
      </Button>

      <div class="flex gap-4">
        <Button 
          v-if="currentStep < 3"
          @click="nextStep"
          class="h-14 px-10 rounded-2xl font-bold shadow-xl shadow-primary/20 transition-all active:scale-95 group"
        >
          Lanjut
          <ChevronRight class="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        <Button 
          v-else
          @click="saveAsset"
          :disabled="isSubmitting"
          class="h-14 px-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-xl shadow-emerald-200/50 transition-all active:scale-95 uppercase tracking-widest text-xs"
        >
          <Save v-if="!isSubmitting" class="h-5 w-5 mr-3" />
          <div v-else class="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
          {{ isSubmitting ? 'Processing...' : 'Simpan Mauquf' }}
        </Button>
      </div>
    </div>
  </div>
</template>

