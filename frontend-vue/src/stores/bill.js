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
        setBill(id) {
            this.bill = this.bills.find((b) => b.id == id)
        },
        onDeleteBill(bill) {
            // on recherche l'index de la facture à supprimer, et on retourne un nouveau tableau de bills sans celle-ci
            this.bills = this.bills.filter((b) => b.id !== bill.id)
        },
        onUpdateBill(bill) {
            const i = this.bills.findIndex((b) => b.id === bill.id)
            // je mets à jout les données dans le store bills
            this.bills[i] = { ...bill }
            // je vidange la donnée d'édition d'une bill
            this.bill = null
        },

        onCreateBill(bill) {
            bill.id = uuidv4()
            this.bills.push(bill)
        }
    }
})
