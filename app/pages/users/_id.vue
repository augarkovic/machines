<template>
  <div class="min-h-full">
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <NuxtLink :to="`/`" class="m-2 opacity-50 hover:opacity-100 cursor-pointer inline-block">Home </NuxtLink>
        <p class="font-bold inline-block">/</p>
        <NuxtLink :to="`/users`" class="m-2 opacity-50 hover:opacity-100 cursor-pointer inline-block">Users </NuxtLink>
        <p class="font-bold inline-block">/</p>
        <p class="m-2 font-bold inline-block">User page</p>
        <div v-if="user" class="px-4 py-6 sm:px-0">
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-100 p-4 flex flex-col lg:flex-row justify-center">
              <div style="flex-basis: 25%" class="p-4">
                  <label for="name" class="block mb-6 text-lg font-medium text-gray-900 dark:text-gray-300">{{ userDetails.full_name }}</label>
                  <img class="object-cover shadow rounded shadow-xl border" src="~/assets/images/profile-placeholder.png" alt="User">
              </div>
              <div style="flex-basis: 25%" class="p-4">
                <form @submit="update" class="flex flex-col">
                    <div class="mb-6">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
                        <input type="text" id="name" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="userDetails.username" required>
                    </div>
                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                        <input type="text" id="email" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="userDetails.email" required>
                    </div>
                    <div class="mb-6">
                        <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Role</label>
                        <input type="radio" id="one" v-bind:value="1" v-model="userDetails.role_id" :checked="userDetails.role_id === 1">
                        <label for="one">Basic User</label>
                        <br>
                        <input type="radio" id="two" v-bind:value="2" v-model="userDetails.role_id" :checked="userDetails.role_id === 2">
                        <label for="two">Admin</label>
                        <br>
                    </div>
                    <button type="submit" class="button mt-auto">Update</button>
                </form>
              </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<script lang="ts">
export default {
    data() {
        return {
          userDetails: {},
        }
    },
    computed: {
      user() {
        const user = this.$store.getters['getUserById'](this.$route.params.id)
        if (user) this.userDetails = { ...user }
        return user
      }      
    },
    methods: {
        update(e : any) {
            e.preventDefault()
            this.$store.dispatch('updateUser', this.userDetails)
            alert("User updated successfully")
            this.$router.push({ path: '/users' })
        }
    },
    middleware: ['auth', 'admin-auth'],
}
</script>