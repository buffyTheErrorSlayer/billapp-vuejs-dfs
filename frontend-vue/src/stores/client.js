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
            
        },
        
        async getClient(id) {
            const response = await this.$http.get('/clients/' + id)
            this.client = response.data
            console.log(this.client)
        },

        async onDeleteClient(client) {
            const response = await this.$http.delete('/clients/' + client.idclient)
            await this.getAllClients()
        },

        async onUpdateClient(client) {
            const response = await this.$http.patch('/clients/' + client.idclient, client)
            this.client = null
            await this.getAllClients()
        },

    }
})
