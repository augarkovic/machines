<template>
  <div class="min-h-full">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Registration page</h1>
      </div>
    </header>
    <main>
      <div class="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-100 p-4">

            <AuthenticationForm class="mb-7" text="Register" :isRegister="true"/>

            <div class="flex flex-col items-center">
                <p>Already have an account? </p>
                <NuxtLink :to="`/login`" class="m-2 opacity-80 hover:opacity-100 cursor-pointer inline-block underline">Log in</NuxtLink>
            </div>

          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import AuthenticationForm from '@/components/AuthenticationForm.vue'

export default {
    components: {
        AuthenticationForm
    },
}
</script>

<style>

</style>