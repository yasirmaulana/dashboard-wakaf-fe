<script setup lang="ts">
import { Settings, Save } from 'lucide-vue-next'
import Card from '~/components/ui/card/Card.vue'
import CardHeader from '~/components/ui/card/CardHeader.vue'
import CardContent from '~/components/ui/card/CardContent.vue'
import Button from '~/components/ui/button/Button.vue'
</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <div class="flex flex-col gap-1">
      <h1 class="text-3xl font-bold tracking-tight">Pengaturan</h1>
      <p class="text-muted-foreground">Konfigurasi akun dan sistem dashboard wakaf.</p>
    </div>

    <div class="grid gap-6 max-w-2xl">
      <Card>
        <CardHeader>
          <h3 class="text-lg font-semibold">Informasi Dashboard</h3>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Nama Dashboard</label>
            <input 
              type="text" 
              value="Wakaf Bilistiwa" 
              class="w-full rounded-md border p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Email Notifikasi</label>
            <input 
              type="email" 
              value="admin@bilistiwa.id" 
              class="w-full rounded-md border p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <Button class="mt-4">
            <Save class="mr-2 h-4 w-4" />
            Simpan Perubahan
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
