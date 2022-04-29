<template>
  <div class="card" :class="getStateClass(isUser ? item.role_id : item.state)">
        <div class="md:flex">
            <div class="md:flex-shrink-0">
                <img class="h-48 w-full object-cover md:w-48" v-if="isUser" src="~/assets/images/profile-placeholder.png" alt="User">
                <img class="h-48 w-full object-cover md:w-48" v-else :src="item.image" alt="Machine">
            </div>
            <div class="p-8 pt-4 pb-4 flex flex-col">
                <h3 class="tracking-wide font-semibold font-medium" v-if="isUser">{{ item.full_name }}</h3>
                <h3 class="uppercase tracking-wide text-indigo-500 font-semibold" v-else>{{ item.name }}</h3>

                <p class="block mt-4 text-lg leading-tight text-black" v-if="isUser">Username: {{ item.username }}</p>
                <p class="block mt-1 text-lg leading-tight font-medium text-black" v-else>{{ item.description }}</p>

                <p class="block mt-1 text-lg leading-tight text-black" v-if="isUser">Email: {{ item.email }}</p>

                <p class="capitalize font-semibold mt-auto" v-if="isUser">Role: {{ getUserRole(item.role_id) }}</p>
                <p class="capitalize font-semibold mt-auto" v-else>State: {{ item.state }}</p>
            </div>
            <div class="ml-auto mt-4">
                <NuxtLink v-if="isUser" :to="`/users/${item.id}`" class="m-2 opacity-50 hover:opacity-100 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'pencil']" size="lg" />
                </NuxtLink>
                <NuxtLink v-else :to="`/machines/${item.id}`" @click="updateMachine(item.id)" class="m-2 opacity-50 hover:opacity-100 cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'pencil']" size="lg" />
                </NuxtLink>
                <a @click="deleteMachine(item.id)" class="m-2 opacity-50 hover:opacity-100 cursor-pointer"><font-awesome-icon :icon="['fas', 'trash']" size="lg" /></a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    name: 'Card',
    props: {
        item: Object,
        isUser: Boolean
    },
    methods: {
        getStateClass(property : string) {
            if (property === 'disused') return 'bg-red-100'
            if (property === 'maintenance required') return 'bg-yellow-100'
            if (property == '1') return 'bg-gray-200'
            if (property == '2') return 'bg-blue-200'
            return 'bg-green-100'
        },
        getUserRole(property : number) {
            if (property === 1) {
                return 'Basic user'
            }
            return 'Admin'
        },
        deleteMachine(id: number) {
            if(confirm("Are you sure?")) {
                this.$store.dispatch('deleteMachine', id)
                alert("Machine successfully deleted")
            }
        }
    }
}
</script>