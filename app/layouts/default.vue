<script setup lang="ts">
import Sidebar from '~/components/layout/Sidebar.vue'
import Navbar from '~/components/layout/Navbar.vue'
import { useLayout } from '~/composables/useLayout'

const { isCollapsed } = useLayout()
</script>

<template>
  <div class="min-h-screen bg-background">
    <Sidebar />
    
    <div 
      :class="[
        'transition-all duration-300 ease-in-out',
        isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
      ]"
    >
      <Navbar />
      
      <main class="p-4 md:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Any layout specific styles */
</style>
