<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeft, Building2, MapPin, ChevronDown } from 'lucide-vue-next'

definePageMeta({
  layout: false
})

// TypeScript interfaces
interface ChildEntity {
  id: string
  name: string
  location?: string
}

interface SocialEntity {
  id: string
  name: string
  label: string
  icon: any
  children?: ChildEntity[]
  isExpanded?: boolean
}

// State
const entities = ref<SocialEntity[]>([
  {
    id: 'maf',
    name: 'MAF',
    label: 'YAYASAN',
    icon: Building2,
    isExpanded: false,
    children: [
      {
        id: 'maf-situ-daun',
        name: 'MAF Situ Daun'
      },
      {
        id: 'maf-poncokusumo',
        name: 'MAF Poncokusumo'
      }
    ]
  },
  {
    id: 'kaf',
    name: 'KAF',
    label: 'YAYASAN',
    icon: Building2,
    isExpanded: false,
    children: [
      {
        id: 'kaf-pusat',
        name: 'KAF Pusat'
      },
      {
        id: 'kaf-beji',
        name: 'KAF Beji'
      },
      {
        id: 'kaf-bogor',
        name: 'KAF Bogor'
      }
    ]
  }
])

// Methods
const toggleExpand = (entityId: string) => {
  const entity = entities.value.find(e => e.id === entityId)
  if (entity && entity.children && entity.children.length > 0) {
    entity.isExpanded = !entity.isExpanded
  }
}

const navigateToEntity = (entityId: string) => {
  const entity = entities.value.find(e => e.id === entityId)
  
  // If entity has children, toggle expand instead of navigating
  if (entity && entity.children && entity.children.length > 0) {
    toggleExpand(entityId)
  } else {
    // Navigate to dashboard
    navigateTo('/dashboard')
  }
}

const navigateToChild = () => {
  navigateTo('/dashboard')
}

const goBack = () => {
  navigateTo('/jenis-wakaf')
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col p-6 font-sans antialiased">
    <div class="max-w-3xl w-full mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <!-- Header with Back Button -->
      <div class="space-y-6">
        <button 
          @click="goBack"
          class="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
        >
          <ChevronLeft class="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span class="text-sm font-semibold">Ganti Tipe Wakaf</span>
        </button>

        <div class="text-center space-y-2">
          <h1 class="text-3xl font-extrabold text-[#0F172A] tracking-tight">Pilih Entitas Sosial</h1>
        </div>
      </div>

      <!-- Entity Cards -->
      <div class="space-y-4">
        <div 
          v-for="entity in entities" 
          :key="entity.id"
          class="bg-white rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/50 overflow-hidden transition-all duration-300"
        >
          <!-- Parent Entity Card -->
          <div 
            @click="navigateToEntity(entity.id)"
            class="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors group"
          >
            <div class="flex items-center gap-4">
              <!-- Icon -->
              <div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                <component :is="entity.icon" class="w-7 h-7 text-slate-700" :stroke-width="2" />
              </div>

              <!-- Entity Info -->
              <div class="flex flex-col">
                <h3 class="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {{ entity.name }}
                </h3>
                <span class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {{ entity.label }}
                </span>
              </div>
            </div>

            <!-- Chevron Icon (only show if has children) -->
            <ChevronDown 
              v-if="entity.children && entity.children.length > 0"
              :class="[
                'h-5 w-5 text-slate-400 transition-transform duration-300',
                entity.isExpanded ? 'rotate-180' : ''
              ]"
            />
            <ChevronDown 
              v-else
              class="h-5 w-5 text-slate-400 rotate-[-90deg]"
            />
          </div>

          <!-- Children Entities (Collapsible) -->
          <transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-96 opacity-100"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="max-h-96 opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div 
              v-if="entity.isExpanded && entity.children && entity.children.length > 0"
              class="border-t border-slate-200/60 bg-slate-50/50 overflow-hidden"
            >
              <div 
                v-for="child in entity.children" 
                :key="child.id"
                @click.stop="navigateToChild"
                class="flex items-center justify-between p-5 pl-20 hover:bg-white cursor-pointer transition-colors group border-b border-slate-100 last:border-b-0"
              >
                <div class="flex flex-col">
                  <h4 class="text-base font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                    {{ child.name }}
                  </h4>
                  <div v-if="child.location" class="flex items-center gap-1.5 mt-1">
                    <MapPin class="h-3.5 w-3.5 text-slate-400" />
                    <span class="text-xs text-slate-500 font-medium">{{ child.location }}</span>
                  </div>
                </div>
                <ChevronDown class="h-5 w-5 text-slate-300 rotate-[-90deg] group-hover:text-emerald-500 transition-colors" />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in-from-bottom-4 {
  from { transform: translateY(1rem); }
  to { transform: translateY(0); }
}

.animate-in {
  animation-fill-mode: forwards;
}

.fade-in {
  animation-name: fade-in;
}

.slide-in-from-bottom-4 {
  animation-name: slide-in-from-bottom-4;
}

/* Smooth max-height transition */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
