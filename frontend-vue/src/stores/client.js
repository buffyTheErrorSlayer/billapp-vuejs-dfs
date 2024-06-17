import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
export const useClientsStore = defineStore('client', {
    state: () => ({
        clients : [],
        client: null
    }),
    getters: {},
    actions: {
        // récupère les données depuis l'API : fonction asynchrone
        async getAllClients() {
            const response = await this.$http.get('/clients')
            this.clients = response.data
            console.log(this.clients)
        },

    }
})
