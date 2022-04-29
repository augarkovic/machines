<template>
  <div class="min-h-full">
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <NuxtLink :to="`/`" class="m-2 opacity-50 hover:opacity-100 cursor-pointer inline-block">Home </NuxtLink>
        <p class="font-bold inline-block">/</p>
        <NuxtLink :to="`/machines`" class="m-2 opacity-50 hover:opacity-100 cursor-pointer inline-block">Machines </NuxtLink>
        <p class="font-bold inline-block">/</p>
        <p class="m-2 font-bold inline-block">Machine page</p>
        <div v-if="machine" class="px-4 py-6 sm:px-0">
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-100 p-4 flex flex-row">
              <div style="flex-basis: 50%" class="p-4">
                  <img class="object-cover shadow rounded shadow-xl border" :src="machine.image" alt="Machine">
              </div>
              <div style="flex-basis: 50%" class="p-4">
                <form @submit="update" class="flex flex-col">
                    <div class="mb-6">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                        <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="machineDetails.name" required>
                    </div>
                    <div class="mb-6">
                        <label for="desc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                        <textarea id="desc" name="desc" rows="4" cols="50" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="machineDetails.description" required></textarea>
                    </div>
                    <div class="mb-6">
                        <label for="state" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">State</label>
                        <input type="radio" id="one" v-bind:value="'in use'" v-model="machineDetails.state" :checked="machineDetails.state === 'in use'">
                        <label for="one">In Use</label>
                        <br>
                        <input type="radio" id="two" v-bind:value="'maintenance required'" v-model="machineDetails.state" :checked="machineDetails.state === 'maintenance required'">
                        <label for="two">Maintenance Required</label>
                        <br>
                        <input type="radio" id="three" v-bind:value="'disused'" v-model="machineDetails.state" :checked="machineDetails.state === 'disused'">
                        <label for="three">Disused</label>
                        <br>
                    </div>
                    <button type="submit" class="button mt-auto">Update</button>
                </form>
              </div>
          </div>
          <p class="mt-2 text-right" v-if="$auth.user.role.name === 'admin'">Last updated on <span class="font-medium">{{ mostRecentUpdateDate }}</span></p>
          <p class="mt-2 text-right" v-if="$auth.user.role.name === 'admin'"><span class="font-medium">( {{ mostRecentUpdater }} )</span></p>
        </div>

        <div v-else class="px-4 py-6 sm:px-0">
          <form @submit="create">
            <div class="border-4 border-dashed border-gray-200 rounded-lg h-100 p-4 flex flex-row">
              <div style="flex-basis: 50%" class="p-4">
                <img class="object-cover shadow rounded shadow-xl border mb-6" :src="machineDetails.image" :alt="`${machineDetails.image}`">
                <label for="source" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Image source</label>
                <input type="text" id="source" @change="addImage" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              </div>
              <div style="flex-basis: 50%" class="p-4 flex flex-col">
                  <div class="mb-6">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                      <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="machineDetails.name" required>
                  </div>
                  <div class="mb-6">
                      <label for="desc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                      <textarea id="desc" name="desc" rows="4" cols="50" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="machineDetails.description" required></textarea>
                  </div>
                  <div class="mb-6">
                      <label for="state" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">State</label>
                      <input type="radio" id="one" name="state" v-bind:value="'in use'" v-model="machineDetails.state" :checked="machineDetails.state === 'in use'" required>
                      <label for="one">In Use</label>
                      <br>
                      <input type="radio" id="two" name="state" v-bind:value="'maintenance required'" v-model="machineDetails.state" :checked="machineDetails.state === 'maintenance required'">
                      <label for="two">Maintenance Required</label>
                      <br>
                      <input type="radio" id="three" name="state" v-bind:value="'disused'" v-model="machineDetails.state" :checked="machineDetails.state === 'disused'">
                      <label for="three">Disused</label>
                      <br>
                  </div>
                  <button type="submit" class="button mt-auto">Create</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
          machineDetails: {
            image: require(`~/assets/images/placeholder.jpg`)
          },
          mostRecentUpdateDate: '',
          mostRecentUpdater: ''
        }
    },
    computed: {
      machine() {
        const machine = this.$store.getters['getMachineById'](this.$route.params.id)
        if (machine) this.machineDetails = { ...machine }
        return machine
      }      
    },
    async fetch() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      
      await this.$axios.get('/api/logs/mostRecentLog/' + this.$route.params.id)
        .then(response => {
            const { data } = { ...response.data }
            
            this.mostRecentUpdateDate = new Date(data.created_at).toLocaleDateString('en-US', options)
            this.mostRecentUpdater = data.user.username
        })
        .catch(error => {
          console.error('Unable to fetch the most recent machine log!', error)
          this.mostRecentUpdateDate = new Date(this.machineDetails.created_at).toLocaleDateString('en-US', options)          
        });
    },
    methods: {
        update(e : any) {
            e.preventDefault()
            this.$store.dispatch('updateMachine', this.machineDetails)
            alert("Machine updated successfully")
            this.$router.push({ path: '/machines' })
        },
        create(e : any) {
          e.preventDefault()
          this.$store.dispatch('createMachine', this.machineDetails)
          alert("Machine successfully created")
          this.$router.push({ path: '/machines' })
        },
        addImage(e : any) {
          this.machineDetails.image = e.target.value
        }
    },
    middleware: ['auth']
}
</script>