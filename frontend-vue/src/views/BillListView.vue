<template>


  <SectionTitle>
    <template #title>Liste des factures</template>
    <template #buttons>
      <button @click="onCreateBill()" class="btn btn-primary"><i class="fa-solid fa-circle-plus me-2"></i>Créer une
        facture</button>
    </template>
  </SectionTitle>

  <TableList>
    <!-- exemple pour personnaliser les th du tableau TableList : -->
    <!-- <template #thead>
          <th>...</th>
      </template> -->
    <template #tbody>
      <BillTableRow v-for="bill in bills" :key="bill.id" :bill="bill" @edit="onEditBill($event)"
        @delete="onDeleteBill($event)" />
    </template>
  </TableList>

  <pre>{{ bills }}</pre>

</template>

<script>
// import { bills } from '@/datas/bills.js'
import { mapState, mapActions } from 'pinia'
import { useBillsStore } from '@/stores/bill.js';
import SectionTitle from '@/components/SectionTitle.vue'
import TableList from '@/components/TableList/TableList.vue'
import BillTableRow from '@/components/TableList/BillTableRow.vue'


export default {

  components: {
    SectionTitle,
    TableList,
    BillTableRow,
  },

  computed: {
    ...mapState(useBillsStore, ['bills'])
  },
  methods: {

    onCreateBill() {
      this.$router.push({ name: 'create-bill' })
    },

    onEditBill(bill) {
      this.$router.push({ name: 'edit-bill', params: { id: bill.id } })

      //Alternative :
      // this.$router.push({ path: `/edit-bill/${bill.id}` })
    },
    ...mapActions(useBillsStore, ['onDeleteBill']),

  }
}

</script>

<style scoped>
td {
  vertical-align: middle;
}
</style>