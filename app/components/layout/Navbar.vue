<script setup lang="ts">
import { Search, Bell, Settings, Menu } from 'lucide-vue-next'
import { useLayout } from '~/composables/useLayout'

const { toggleMobileSidebar } = useLayout()
</script>

<template>
  <header class="sticky top-0 z-30 flex h-20 items-center gap-4 border-b bg-background/60 px-4 md:px-8 backdrop-blur-xl">
    <!-- Hamburger Menu (Mobile) -->
    <button 
      @click="toggleMobileSidebar"
      class="lg:hidden p-2 rounded-xl text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all"
    >
      <Menu class="h-6 w-6" />
    </button>

    <!-- Search Bar -->
    <div class="flex flex-1 items-center max-w-md">
      <div class="relative w-full group">
        <Search class="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
        <input
          type="search"
          placeholder="Cari..."
          class="w-full rounded-xl border bg-muted/30 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
        />
      </div>
    </div>

    <!-- Right Side Actions -->
    <div class="flex items-center gap-2 md:gap-3 ml-auto">
      <button class="relative rounded-xl p-2 md:p-2.5 text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200">
        <Bell class="h-5 w-5" />
        <span class="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-destructive border-2 border-background"></span>
      </button>

      <button class="hidden sm:block rounded-xl p-2 md:p-2.5 text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200">
        <Settings class="h-5 w-5" />
      </button>

      <div class="h-8 w-px bg-border/50 mx-1 md:mx-2"></div>

      <div class="flex items-center gap-3 pl-1 md:pl-2">
        <div class="hidden md:flex flex-col items-end">
          <span class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</span>
          <span class="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Online
          </span>
        </div>
      </div>
    </div>
  </header>
</template>
