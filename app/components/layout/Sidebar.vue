<script setup lang="ts">
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  X
} from 'lucide-vue-next'
import { useLayout } from '~/composables/useLayout'

const { isCollapsed, isMobileOpen, toggleSidebar, closeMobileSidebar } = useLayout()

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Wakif', icon: Users, path: '/wakifs' },
  { name: 'Mauquf', icon: Package, path: '/assets' },
  { name: 'Mauquf Alaih', icon: Users, path: '/mauqufalaih' },
]

const bottomItems = [
  { name: 'Settings', icon: Settings, path: '/settings' },
]
</script>

<template>
  <!-- Mobile Overlay -->
  <div 
    v-if="isMobileOpen" 
    class="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
    @click="closeMobileSidebar"
  />

  <aside 
    :class="[
      'fixed left-0 top-0 z-50 h-screen transition-all duration-300 ease-in-out border-r bg-card/80 backdrop-blur-xl',
      'lg:translate-x-0',
      isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0',
      isCollapsed ? 'lg:w-20' : 'lg:w-64'
    ]"
  >
    <div class="flex h-full flex-col">
      <!-- Logo & Close button (mobile) -->
      <div class="flex h-20 items-center justify-between px-6">
        <div class="flex items-center gap-3 overflow-hidden">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <span class="font-bold text-lg">W</span>
          </div>
          <div v-if="!isCollapsed || isMobileOpen" class="flex flex-col whitespace-nowrap overflow-hidden">
            <span class="font-bold text-lg tracking-tight text-foreground leading-none">Wakaf</span>
            <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">Bilistiwa</span>
          </div>
        </div>
        
        <button 
          @click="closeMobileSidebar"
          class="lg:hidden p-2 rounded-xl text-muted-foreground hover:bg-accent"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 space-y-1.5 px-3 py-6 overflow-y-auto">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          @click="closeMobileSidebar"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground transition-all duration-200 hover:bg-primary/5 hover:text-primary group"
          active-class="bg-primary/10 text-primary !font-semibold shadow-sm"
        >
          <component :is="item.icon" class="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
          <span v-if="!isCollapsed || isMobileOpen" class="text-sm font-medium">{{ item.name }}</span>
        </NuxtLink>
      </nav>

      <!-- Bottom Actions -->
      <div class="border-t border-dashed p-3 space-y-1.5">
        <NuxtLink
          v-for="item in bottomItems"
          :key="item.path"
          :to="item.path"
          @click="closeMobileSidebar"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground transition-all hover:bg-primary/5 hover:text-primary"
          active-class="bg-primary/10 text-primary !font-semibold"
        >
          <component :is="item.icon" class="h-5 w-5 shrink-0" />
          <span v-if="!isCollapsed || isMobileOpen" class="text-sm font-medium">{{ item.name }}</span>
        </NuxtLink>
        
        <button 
          @click="toggleSidebar"
          class="hidden lg:flex w-full items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
        >
          <component :is="isCollapsed ? ChevronRight : ChevronLeft" class="h-5 w-5 shrink-0" />
          <span v-if="!isCollapsed" class="text-sm font-medium">Sembunyikan</span>
        </button>
      </div>

      <!-- User Profile -->
      <div class="p-4 mt-auto">
        <div :class="['flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-border/50', (isCollapsed && !isMobileOpen) ? 'justify-center' : '']">
          <div class="h-10 w-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" class="w-8 h-8" />
          </div>
          <div v-if="!isCollapsed || isMobileOpen" class="flex flex-col min-w-0 flex-1">
            <span class="text-sm font-bold truncate text-foreground">Yasir Maulana</span>
            <span class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Super Admin</span>
          </div>
          <button v-if="!isCollapsed || isMobileOpen" class="ml-auto p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
            <LogOut class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

