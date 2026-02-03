<script setup lang="ts">
import { School, Building2 } from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const options = [
  {
    id: 'penggunaan',
    title: 'Wakaf Penggunaan',
    description: 'Aset sosial seperti Sekolah, Masjid, Panti Asuhan, dan fasilitas umum lainnya.',
    icon: School,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    route: '/dashboard'
  },
  {
    id: 'produktif',
    title: 'Wakaf Produktif',
    description: 'Aset komersial seperti Ruko, Tanah Pertanian, Saham, dan Unit Bisnis.',
    icon: Building2,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    route: '#' // Placeholder for now
  }
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans antialiased">
    <div class="max-w-5xl w-full space-y-16 animate-in fade-in zoom-in duration-700">
      
      <!-- Header -->
      <div class="text-center space-y-4">
        <h1 class="text-3xl font-extrabold text-[#0F172A] tracking-tight">Pilih Jenis Wakaf</h1>
        <p class="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl mx-auto">
          Silakan pilih konteks pengelolaan wakaf yang ingin Anda tinjau saat ini.
        </p>
      </div>

      <!-- Options Grid -->
      <div class="grid md:grid-cols-2 gap-8 px-4">
        <NuxtLink 
          v-for="option in options" 
          :key="option.id"
          :to="option.route"
          class="group relative flex flex-col items-center text-center p-12 bg-white rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 active:translate-y-0 overflow-hidden"
        >
          <!-- Icon Container -->
          <div :class="['w-20 h-20 rounded-full flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110', option.bg]">
            <component :is="option.icon" :class="['w-10 h-10', option.color]" :stroke-width="2.5" />
          </div>

          <!-- Text Content -->
          <div class="space-y-4">
            <h2 class="text-2xl font-black text-slate-900 tracking-tight transition-colors group-hover:text-emerald-600">
              {{ option.title }}
            </h2>
            <p class="text-slate-500 font-medium leading-relaxed px-4">
              {{ option.description }}
            </p>
          </div>

          <!-- Hover Indicator (Subtle) -->
          <div class="absolute bottom-0 left-0 w-full h-1.5 bg-emerald-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.font-sans {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes zoom-in {
  from { transform: scale(0.95); }
  to { transform: scale(1); }
}

.animate-in {
  animation-fill-mode: forwards;
}

.fade-in {
  animation-name: fade-in;
}

.zoom-in {
  animation-name: zoom-in;
}
</style>
