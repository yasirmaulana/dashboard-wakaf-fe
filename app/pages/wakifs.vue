<script setup lang="ts">
import { Users, Plus } from 'lucide-vue-next'
import Card from '~/components/ui/card/Card.vue'
import CardHeader from '~/components/ui/card/CardHeader.vue'
import CardContent from '~/components/ui/card/CardContent.vue'
import Button from '~/components/ui/button/Button.vue'
</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold tracking-tight">Daftar Wakif</h1>
        <p class="text-muted-foreground">Kelola data donatur dan pemberi wakaf Bilistiwa.</p>
      </div>
      <Button class="w-fit">
        <Plus class="mr-2 h-4 w-4" />
        Tambah Wakif
      </Button>
    </div>

    <Card>
      <CardContent>
        <div class="flex flex-col items-center justify-center p-12 text-center bg-muted/20 rounded-lg border-2 border-dashed">
          <Users class="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
          <h3 class="text-lg font-semibold">Data Wakif Kosong</h3>
          <p class="text-muted-foreground max-w-xs mx-auto">Daftar wakif yang berkontribusi akan muncul di bagian ini.</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
