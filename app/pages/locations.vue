<script setup lang="ts">
import { MapPin, Plus } from 'lucide-vue-next'
import Card from '~/components/ui/card/Card.vue'
import CardHeader from '~/components/ui/card/CardHeader.vue'
import CardContent from '~/components/ui/card/CardContent.vue'
import Button from '~/components/ui/button/Button.vue'
</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold tracking-tight">Lokasi Mauquf</h1>
        <p class="text-muted-foreground">Daftar lokasi pendistribusian dan penyimpanan mauquf.</p>
      </div>
      <Button class="w-fit">
        <Plus class="mr-2 h-4 w-4" />
        Tambah Lokasi
      </Button>
    </div>

    <Card>
      <CardContent class="p-0">
        <div class="flex flex-col items-center justify-center p-12 text-center bg-muted/20 min-h-[400px]">
          <MapPin class="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
          <h3 class="text-lg font-semibold">Peta Lokasi Belum Tersedia</h3>
          <p class="text-muted-foreground max-w-xs mx-auto">Data lokasi akan ditampilkan di sini sebagai daftar atau tampilan peta.</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
