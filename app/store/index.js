import axios from 'axios'

export const storeState = () => ({
    machines: [],
    users: []
})

export const actions = {
    async nuxtServerInit ({ commit }) {
        await this.$axios.get('/api/machines')
            .then(response => {
                const { data } = { ...response.data } 
                commit('setMachines', data)
            })
            .catch(error => {
                console.error('Unable to fetch machines!', error)
            });

        await this.$axios.get('/api/users')
            .then(response => {
                const { data } = { ...response.data } 
                commit('setUsers', data)
            })
            .catch(error => {
                console.error('Unable to fetch users!', error)
            });
    },

    async updateMachine ({ commit }, machine) {
        const { id } = { ...machine }

        await this.$axios.put('api/machines/' + id, { ...machine })
            .then(response => {
                const { data } = { ...response.data } 
                commit('updateMachine', data)                
            })
            .catch(error => {
                console.error('Unable to update machine!', error);
            });
    },

    async createMachine ({ commit }, machine) {
        await this.$axios.post('api/machines', { ...machine })
            .then(response => {
                const { data } = { ...response.data } 
                commit('createMachine', data)
            })
            .catch(error => {
                console.error('Unable to create machine!', error)
            });
    },

    async deleteMachine ({ commit }, id) {
        await this.$axios.delete('api/machines/' + id)
            .then(response => {
                const { data } = { ...response.data } 
                commit('deleteMachine', data)
            })
            .catch(error => {
                console.error('Unable to delete machine!', error)
            });
    },
}

export const mutations = {
    setMachines(storeState, machines) {
        storeState.machines = machines
    },

    updateMachine(storeState, machine) {
        const { id, name, description, state, updated_at } = { ...machine }
        const machineForUpdate = storeState.machines.find(machine => machine.id == id)

        machineForUpdate.name = name
        machineForUpdate.description = description
        machineForUpdate.state = state
        machineForUpdate.updated_at = updated_at
    },

    createMachine(storeState, machine) {
        storeState.machines.push(machine)
    },

    deleteMachine(storeState, id) {
        const machine = storeState.machines.find(machine => machine.id == id)
        const index = storeState.machines.indexOf(machine)
        index === -1 ? alert("Error while updating the state") : storeState.machines.splice(index, 1)
    },

    setUsers(storeState, users) {
        storeState.users = users
    },
}

export const getters = {
    getMachines: (storeState) => {
        return storeState.machines
    },
    
    getMachineById: (storeState) => (id) => {
        return storeState.machines.find(machine => machine.id == id)
    },

    getUsers: (storeState) => {
        return storeState.users
    },
}