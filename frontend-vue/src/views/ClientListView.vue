<template>
    <div class="container">

        <SectionTitle>
            <template #title><i class="fa-solid fa-users"></i> Clients</template>
            <template #buttons>
                <button @click="onCreateClient()" class="btn btn-primary"><i class="fa-solid fa-circle-plus me-2"></i>Créer un client</button>
            </template>
        </SectionTitle>

        <TableList>
            <template #thead>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Company Name</th>
                <th>Actions</th>
            </template>

            <template #tbody>
                <ClientTableRow v-for="client in clients" :key="client.idclient"  :client="client"/>
            </template>
        </TableList>
        
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useClientsStore } from '@/stores/client.js';
import SectionTitle from '@/components/SectionTitle.vue'
import TableList from '@/components/TableList/TableList.vue'
import ClientTableRow from '@/components/TableList/ClientTableRow.vue'


export default {
    components: {
    SectionTitle,
    TableList,
    ClientTableRow,
  
  },
  computed: {
    ...mapState(useClientsStore, ['clients'])
  },

  methods: {
    ...mapActions(useClientsStore, [ 'getAllClients']),

  },

  async mounted() {
    // récupère les données de l'API
    await this.getAllClients()
  },

}
</script>

<style scoped></style>