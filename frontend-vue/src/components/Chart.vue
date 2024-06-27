<template>
    <div>
        <canvas id="billsChart"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { useBillsStore } from '@/stores/bill.js';
import { mapState, mapActions } from 'pinia'





export default {

    computed: {
        ...mapState(useBillsStore, ['bills']),

        statusPaid() {
            return this.bills.map(bill => bill.paid).reduce((a, b) => a + b, 0);
        },

        statusUnpaid() {
            return this.bills.map(bill => bill.totalTTC - bill.paid).reduce((a, b) => a + b, 0);
        },

        numberOfPaidBills() {
            return this.bills.filter(bill => bill.paid > 0).length;
        },

        numberOfUnpaidBills() {
            return this.bills.filter(bill => bill.paid <= 0).length;
        },

        totalBilled(){
            return this.bills.map(bill => bill.totalTTC).reduce((a, b) => a + b, 0);
        }

    },

    methods: {
        ...mapActions(useBillsStore, ['getAllBills']),




    },

    async mounted() {
        await this.getAllBills();

        // Préparer les données pour le graphique
        const totals = this.bills.map(bill => bill.totalTTC);

        const ctx = document.getElementById('billsChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [`Montant payé : ${this.statusPaid}`, `Montant non payé : ${this.statusUnpaid}`],
                datasets: [{
                    label: 'Total factures',
                    data: [this.numberOfPaidBills, this.numberOfUnpaidBills],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 99, 132, 0.7)'
                        
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)'
                        
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: `${this.bills.length} Factures - ${this.totalBilled} € facturés`,
                        font: {
                            size: 16
                        }
                    }
                }
            }
        });
    }


}


</script>

<style scoped></style>