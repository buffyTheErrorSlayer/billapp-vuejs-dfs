import { bills } from '@/datas/bills.js'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
export const useBillsStore = defineStore('bill', {
    state: () => ({
        bills,
        bill: null
    }),
    getters: {},
    actions: {
        // récupère les données depuis l'API : fonction asynchrone
        async getAllBills() {
            const response = await this.$http.get('/bills')
            this.bills = response.data
            console.log(this.bills)
        },

        async setBill(id) {
            const response = await this.$http.get('/bills/' + id)
            this.bill = response.data
        },
        
        async onDeleteBill(bill) {
            const response = await this.$http.delete('/bills/' + bill.id)
            await this.getAllBills()
        },

        async onUpdateBill(bill) {
            const response = await this.$http.patch('/bills/' + bill.id, bill)
            this.bill = null
            await this.getAllBills()
        },

        async onCreateBill(bill) {
            const response = await this.$http.post('/bills', bill)
            this.bill = null
            await this.getAllBills()
        }
    }
})
