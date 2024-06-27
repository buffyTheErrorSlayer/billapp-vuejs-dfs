<template>
  <main class="container">
    <SectionTitle>
      <template #title>Dashboard</template>
      <template #buttons>
        <button @click="onCreateClient()" class="btn btn-outline-primary me-1"> <i
            class="fa-solid fa-circle-plus me-2"></i>
          Créer un client
        </button>
        <button @click="onCreateBill()" class="btn btn-outline-primary me-1"> <i
            class="fa-solid fa-circle-plus me-2"></i>
          Créer une facture
        </button>
      </template>
    </SectionTitle>

    <div class="row">
      <div class="col-4">
          <Chart/>
      </div>
      <div class="col">
        <TableList>
          <template #thead>
            <th>N°</th>
            <th>Client</th>
            <th>Montant HT</th>
            <th>Montant TTC</th>
            <th></th>
          </template>

          <template #tbody>
            <tr v-for="bill in bills" :key="bill.id">
              <td>{{ bill.billnum }}</td>
              <td>{{ bill.client.firstName }} {{ bill.client.lastName }}</td>
              <td>{{ bill.totalHT.toFixed(2) }} € </td>
              <td>{{ bill.totalTTC.toFixed(2) }} €</td>
              <td><button @click="onEditBill()" class="btn btn-outline-primary"> <i class="fa-solid fa-pen"></i>
                  Editer</button></td>

            </tr>
          </template>
        </TableList>

        <TableList>
          <template #thead>
            <th>Nom</th>
            <th>Entreprise</th>
            <th>Date ajout</th>
            <th></th>
          </template>

          <template #tbody>
            <tr v-for="client in clients" :key="client.idclient" >
              <td>{{ client.firstName }} {{client.lastName}}</td>
              <td>{{client.companyName}}</td>
              <td>{{client.dateAjout}}</td>
              <td>
                <td><button @click="onEditClient(client)" class="btn btn-outline-primary"> <i class="fa-solid fa-pen"></i>
                  Editer</button></td>
              </td>
            </tr>
            
          </template>
        </TableList>
      </div>
    </div>
    <!-- contiendra le dashboard-->
  </main>
</template>

<script>
import SectionTitle from '@/components/SectionTitle.vue'
import Chart from '@/components/Chart.vue';
import TableList from '@/components/TableList/TableList.vue'
import { mapState, mapActions } from 'pinia'
import { useBillsStore } from '@/stores/bill.js';
import { useClientsStore } from '@/stores/client.js';




export default {
  components: {
    SectionTitle,
    TableList,
    Chart
  },

  computed: {
    ...mapState(useBillsStore, ['bills']),
    ...mapState(useClientsStore, ['clients']),

  },

  methods: {
    ...mapActions(useBillsStore, ['getAllBills']),
    ...mapActions(useClientsStore, [ 'getAllClients']),

    onCreateBill() {
      this.$router.push({ path: 'create-bill' })
    },
    onCreateClient() {
      this.$router.push({ path: '/edit-client/-1' })
    },

    onEditBill(bill) {
      this.$router.push({ name: 'edit-bill', params: { id: bill.id } })
    },
    
    onEditClient(client) {
      this.$router.push({ name: 'edit-client', params: { id: client.idclient } })
    },
  },


  async mounted() {
    // récupère les données de l'API
    await this.getAllBills()
    await this.getAllClients()
  },
}

</script>

