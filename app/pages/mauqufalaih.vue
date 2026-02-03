<script setup lang="ts">
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Building2, 
  User,
  Phone,
  Mail,
  MapPin,
  Loader2,
  Trash2,
  Edit2
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

// --- Types ---
interface Beneficiary {
  id: number;
  name: string;
  type: string;
  contactBeneficiary: string;
  phone: string;
  category: string;
}

// --- Mock Data ---
const beneficiaries = ref<Beneficiary[]>([
  {
    id: 1,
    name: 'Yayasan Pemberdayaan Umat',
    type: 'Lembaga',
    contactBeneficiary: 'info@pemberdayaan.org',
    phone: '021-77889900',
    category: 'Pendidikan',
  },
  {
    id: 2,
    name: 'Bapak Salman Aristo',
    type: 'Personal',
    contactBeneficiary: 'salman.aristo@email.com',
    phone: '0812-3456-7890',
    category: 'Sosial',
  },
  {
    id: 3,
    name: 'Pesantren Al-Hikmah',
    type: 'Lembaga',
    contactBeneficiary: 'admin@alhikmah.edu',
    phone: '0251-123456',
    category: 'Keagamaan',
  },
  {
    id: 4,
    name: 'Ibu Ratna Sari',
    type: 'Personal',
    contactBeneficiary: 'ratna.sari@email.com',
    phone: '0856-9988-7766',
    category: 'Kesehatan',
  },
])

// --- Search & UI Logic ---
const searchQuery = ref('')
const isLoading = ref(false)
const showForm = ref(false)
const isEditing = ref(false)
const formData = ref<Partial<Beneficiary>>({
  name: '',
  type: 'Personal',
  category: '',
  contactBeneficiary: '',
  phone: ''
})

const filteredBeneficiaries = computed(() => {
  if (!searchQuery.value) return beneficiaries.value
  const query = searchQuery.value.toLowerCase()
  return beneficiaries.value.filter(b => 
    b.name.toLowerCase().includes(query) || 
    b.contactBeneficiary.toLowerCase().includes(query) ||
    b.phone.includes(query) ||
    b.category.toLowerCase().includes(query)
  )
})

// --- CRUD Actions ---
const openAddForm = () => {
  isEditing.value = false
  formData.value = { name: '', type: 'Personal', category: '', contactBeneficiary: '', phone: '' }
  showForm.value = true
}

const setEditRow = (item: Beneficiary) => {
  isEditing.value = true
  formData.value = { ...item }
  showForm.value = true
}

const saveRow = async () => {
  isLoading.value = true
  // Mock delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  if (isEditing.value) {
    const idx = beneficiaries.value.findIndex(b => b.id === formData.value.id)
    if (idx !== -1) beneficiaries.value[idx] = formData.value as Beneficiary
  } else {
    const newId = beneficiaries.value.length > 0 ? Math.max(...beneficiaries.value.map(b => b.id)) + 1 : 1
    beneficiaries.value.push({
      ...formData.value,
      id: newId
    } as Beneficiary)
  }
  
  showForm.value = false
  isLoading.value = false
}

const deleteRow = async (id: number) => {
  if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 500))
    beneficiaries.value = beneficiaries.value.filter(b => b.id !== id)
    isLoading.value = false
  }
}
</script>

<template>
  <div class="space-y-8 animate-in slide-in-from-bottom-6 duration-700">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="space-y-1">
        <h1 class="text-4xl font-extrabold tracking-tight text-foreground">Mauquf Alaih</h1>
        <p class="text-muted-foreground text-sm font-medium">Kelola data penerima manfaat dari aset wakaf yang dikelola.</p>
      </div>
      <Button 
        class="gap-2 px-6 py-6 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
        @click="openAddForm"
        v-if="!showForm"
      >
        <Plus class="h-5 w-5" />
        <span class="font-bold uppercase tracking-widest text-[10px]">Tambah Penerima Baru</span>
      </Button>
    </div>

    <!-- Main Card & Search -->
    <div class="space-y-6">
        <Card v-if="!showForm" class="rounded-[2rem] border-none shadow-2xl shadow-slate-200/50 overflow-hidden bg-white/50 backdrop-blur-sm">
            <CardHeader class="pb-6 p-8 bg-muted/20">
                <div class="flex flex-col md:flex-row md:items-center gap-6">
                    <div class="relative flex-1 max-w-md group">
                        <Search class="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                        <Input 
                            v-model="searchQuery"
                            placeholder="Cari nama atau kontak penerima..." 
                            class="pl-12 h-12 rounded-2xl border-none bg-background shadow-inner text-base focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                        />
                    </div>
                    <div class="flex gap-4 items-center ml-auto">
                        <div class="px-4 py-2 rounded-xl bg-primary/5 border border-primary/10 h-12 flex items-center gap-3">
                            <span class="text-[10px] font-black uppercase tracking-widest text-primary/70">Total Penerima</span>
                            <span class="text-lg font-black text-primary leading-none">{{ beneficiaries.length }}</span>
                        </div>
                    </div>
                </div>
            </CardHeader>
            
            <CardContent class="p-0">
                <template v-if="isLoading">
                    <div class="py-24 flex flex-col items-center justify-center text-muted-foreground">
                        <Loader2 class="h-10 w-10 animate-spin mb-4 text-primary/40" />
                        <p class="font-bold uppercase tracking-widest text-[10px]">Memproses data...</p>
                    </div>
                </template>
                <template v-else>
                    <div class="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow class="bg-muted/30 hover:bg-muted/30 border-none h-14">
                                    <TableHead class="pl-8 font-bold text-xs uppercase tracking-widest text-muted-foreground">Tipe</TableHead>
                                    <TableHead class="font-bold text-xs uppercase tracking-widest text-muted-foreground">Nama Penerima</TableHead>
                                    <TableHead class="font-bold text-xs uppercase tracking-widest text-muted-foreground">Kontak Manfaat</TableHead>
                                    <TableHead class="pr-8 text-right font-bold text-xs uppercase tracking-widest text-muted-foreground">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow v-for="item in filteredBeneficiaries" :key="item.id" class="h-24 hover:bg-primary/[0.02] border-muted/30 transition-colors duration-300">
                                    <!-- Tipe -->
                                    <TableCell class="pl-8 whitespace-nowrap">
                                        <Badge 
                                            :class="[
                                                'rounded-full px-4 py-1.5 font-bold text-[10px] uppercase tracking-tight border-none shadow-sm',
                                                item.type === 'Personal' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                            ]"
                                        >
                                            <component :is="item.type === 'Personal' ? User : Building2" class="h-3 w-3 mr-1.5 inline-block" />
                                            {{ item.type }}
                                        </Badge>
                                    </TableCell>
                                    
                                    <!-- Nama -->
                                    <TableCell>
                                        <div class="flex flex-col gap-1">
                                            <span class="text-base font-bold text-foreground">{{ item.name }}</span>
                                            <span class="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">{{ item.category }}</span>
                                        </div>
                                    </TableCell>

                                    <!-- Kontak -->
                                    <TableCell>
                                        <div class="flex flex-col gap-1.5">
                                            <div class="flex items-center gap-2 text-[13px] font-bold text-slate-600">
                                                <Mail class="h-3 w-3 text-primary/60" />
                                                {{ item.contactBeneficiary }}
                                            </div>
                                            <div class="flex items-center gap-2 text-[13px] font-bold text-slate-600">
                                                <Phone class="h-3 w-3 text-primary/60" />
                                                {{ item.phone }}
                                            </div>
                                        </div>
                                    </TableCell>

                                    <!-- Actions -->
                                    <TableCell class="pr-8 text-right">
                                        <div class="flex items-center justify-end gap-3">
                                            <Button @click="setEditRow(item)" variant="outline" size="sm" class="rounded-xl border-primary/20 bg-primary/[0.03] text-primary hover:bg-primary font-bold hover:text-white transition-all transform hover:scale-105">
                                                <Edit2 class="h-4 w-4 mr-2" />
                                                Edit
                                            </Button>
                                            <Button @click="deleteRow(item.id)" variant="ghost" size="icon" class="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 transition-all">
                                                <Trash2 class="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <!-- Empty State -->
                    <div v-if="filteredBeneficiaries.length === 0" class="py-32 text-center animate-in fade-in zoom-in duration-500">
                        <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-[2rem] bg-primary/5 shadow-inner">
                            <MapPin class="h-10 w-10 text-primary/30" />
                        </div>
                        <h3 class="mt-8 text-xl font-black text-foreground">Data tidak ditemukan</h3>
                        <p class="text-muted-foreground mt-2 max-w-xs mx-auto font-medium">Coba sesuaikan kata kunci pencarian Anda.</p>
                    </div>
                </template>
            </CardContent>
        </Card>

        <!-- Dynamic Form (Add/Edit) -->
        <Card v-if="showForm" class="mt-8 rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/50 overflow-hidden bg-white/50 backdrop-blur-sm">
            <CardHeader class="p-8 pb-4">
                <h3 class="text-xl font-black text-foreground">{{ isEditing ? 'Edit Penerima' : 'Tambah Penerima Baru' }}</h3>
            </CardHeader>
            <CardContent class="p-8 pt-0">
                <form @submit.prevent="saveRow" class="space-y-6">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label class="text-xs font-black uppercase tracking-widest text-muted-foreground">Nama Penerima</label>
                            <Input v-model="formData.name" required placeholder="Masukkan nama..." class="rounded-xl border-none bg-muted/30 h-12" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-xs font-black uppercase tracking-widest text-muted-foreground">Tipe</label>
                            <select v-model="formData.type" class="w-full h-12 px-4 rounded-xl border-none bg-muted/30 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                                <option value="Personal">Personal</option>
                                <option value="Lembaga">Lembaga</option>
                            </select>
                        </div>
                        <div class="space-y-2">
                            <label class="text-xs font-black uppercase tracking-widest text-muted-foreground">Kategori</label>
                            <Input v-model="formData.category" required placeholder="Pendidikan, Sosial, dsb..." class="rounded-xl border-none bg-muted/30 h-12" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-xs font-black uppercase tracking-widest text-muted-foreground">Email / Kontak</label>
                            <Input v-model="formData.contactBeneficiary" required placeholder="email@example.com" class="rounded-xl border-none bg-muted/30 h-12" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-xs font-black uppercase tracking-widest text-muted-foreground">Telepon</label>
                            <Input v-model="formData.phone" required placeholder="08..." class="rounded-xl border-none bg-muted/30 h-12" />
                        </div>
                    </div>
                    <div class="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="ghost" @click="showForm = false" class="rounded-xl font-bold">Batal</Button>
                        <Button type="submit" class="rounded-xl font-bold px-8 h-12 shadow-lg shadow-primary/20">
                            <Loader2 v-if="isLoading" class="h-4 w-4 animate-spin mr-2" />
                            {{ isEditing ? 'Simpan Perubahan' : 'Tambah Penerima' }}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
  </div>
</template>
