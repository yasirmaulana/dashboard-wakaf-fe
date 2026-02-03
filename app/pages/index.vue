<script setup lang="ts">
import { ShieldCheck, ArrowRight } from 'lucide-vue-next'

definePageMeta({
  layout: false
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans antialiased">
    <div class="max-w-md w-full text-center space-y-10 animate-in fade-in zoom-in duration-700">
      <!-- Icon Container -->
      <div class="flex justify-center">
        <div class="relative group">
          <div class="absolute -inset-4 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-all duration-500"></div>
          <div class="relative w-24 h-24 bg-emerald-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-emerald-600/20 transform group-hover:scale-105 transition-transform duration-500">
            <ShieldCheck class="w-12 h-12 text-white" :stroke-width="2.5" />
          </div>
        </div>
      </div>

      <!-- Text Content -->
      <div class="space-y-4">
        <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight">Dashboard Wakaf</h1>
        <div class="space-y-2">
          <p class="text-slate-500 font-medium text-lg leading-relaxed">
            Platform tata kelola dan transparansi aset wakaf untuk Nadzir.
          </p>
          <p class="text-slate-400 font-medium">
            Amanah, rapi, dan terpercaya.
          </p>
        </div>
      </div>

      <!-- Action Button -->
      <div class="pt-4 px-4">
        <NuxtLink 
          to="/jenis-wakaf"
          class="group relative inline-flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/40 hover:-translate-y-1 active:translate-y-0 overflow-hidden"
        >
          <span class="relative z-10 flex items-center text-lg">
            Masuk ke Dashboard
            <ArrowRight class="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </NuxtLink>
      </div>

      <!-- Footer -->
      <div class="pt-8">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/80 backdrop-blur-sm border border-slate-200/50">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Versi MVP 1.0</span>
          <span class="w-1 h-1 rounded-full bg-slate-300"></span>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Konteks Demo</span>
        </div>
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

