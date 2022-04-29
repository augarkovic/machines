<template>
  <form @submit.prevent @submit="submit(isRegister)" class="flex flex-col">
        <div class="mb-6" v-if="isRegister">
            <label for="fullName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full Name</label>
            <input type="text" id="fullName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="userDetails.fullName" required>
        </div>
        <div class="mb-6" v-if="isRegister">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
            <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="userDetails.email" required>
        </div>
        <div class="mb-6">
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
            <input type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="userDetails.username" required>
        </div>
        <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
            <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="userDetails.password" required>
        </div>
        <button type="submit" class="button mt-auto">{{ text }}</button>
  </form>
</template>

<script lang="ts">
export default {
    name: 'AuthenticationForm',
    props: {
        text: String,
        isRegister: Boolean
    },
    data() {
        return {
          userDetails: { fullName: '', email: '', username: '', password: ''}
        }
    },
    methods: {
        async submit(isRegister : Boolean) {
            if (isRegister) {
                await this.$axios.post('api/register', { ...this.userDetails })
                    .then(response => {
                        const { data } = { ...response } 
                        this.$toast.success(data.message)
                        this.$router.push({ path: '/login' })
                    })
                    .catch((error : any) => {
                        this.$toast.error(error.response.data.message)
                    });
            }
            else {
                const { username, password } = { ...this.userDetails }

                try {
                    this.$auth.loginWith('local', {
                        data: {
                            username: username,
                            password: password
                        }
                    }).then(() => this.$toast.success('Log in successful!'))
                    .catch((error : any) => this.$toast.error(error.response.data.message))

                } catch (error : any) {
                    console.log("neuspjelo");
                }
            }
        }
    }
}
</script>