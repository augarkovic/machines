<template>
  <div class="min-h-full">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">All Machines</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="flex flex-row">
          <div>
            <NuxtLink :to="`/`" class="m-2 opacity-50 hover:opacity-100 cursor-pointer inline-block">Home </NuxtLink>
            <p class="font-bold inline-block">/</p>
            <p class="m-2 font-bold inline-block">Machines</p>
          </div>
          <NuxtLink :to="`/machines/create`" class="m-2 mr-0 cursor-pointer inline-block ml-auto button">Create New Machine</NuxtLink>
        </div>
        <div class="px-4 py-6 sm:px-0">
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-100 p-4">

            <Card v-for="machine in machines"
                  :key="machine.id"
                  :item="machine"
            />

          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '@/components/Card.vue'

export default Vue.extend({
  middleware: ['auth'],
  computed: {
    machines() {
      return this.$store.getters['getMachines']
    }
  }
})
</script>