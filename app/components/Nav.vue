<template>
  <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <NuxtLink :to="`/`">
                <font-awesome-icon class="h-8 w-8 text-white" :icon="['fas', 'gear']" size="lg" />
              </NuxtLink>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <NuxtLink v-if="$auth.loggedIn" :to="`/machines`" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Machines</NuxtLink>
                <NuxtLink v-if="$auth.loggedIn && $auth.user.role.name === 'admin'" :to="`/users`" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Users</NuxtLink>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <p v-if="$auth.loggedIn" class="text-white block px-6 py-2 rounded-md text-base font-medium">{{ $auth.user.username }}</p>
              <button v-on:click="logout" v-if="$auth.loggedIn" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Log out</button>
            </div>
          </div>
          
        </div>
      </div>
      
    </nav>
</template>

<script>
    export default {
        name: 'Nav',
        methods: {
          logout() {
            this.$auth.logout();
            this.$toast.success('Log out successful!')
          }
        }
    }
</script>