<template>

  <div class="container" v-if="bill">
    <SectionTitle>
      <template #title>Modifier une facture</template>
      <template #buttons>
        <button @click="deleteBill(bill)" class="btn btn-outline-danger me-1"> <i class="fa-solid fa-trash"></i>
          Supprimer</button>
        <BackButton />
      </template>
    </SectionTitle>

    <div class="border rounded p-2">
      <div class="row d-flex align-items-center">
        <div class="col-1">
          <div>Facture N°</div>
        </div>
        <div class="col-3">
          <input type="text" class="form-control" v-model="bill.billnum">
        </div>
        <div class="col-1"></div>
        <div class="col-1">
          Description
        </div>
        <div class="col-6">
          <input type="text" class="form-control" v-model="bill.description">
        </div>
      </div>
      <div class="row mt-3 d-flex align-items-center">
        <div class="col-1">
          <div>Emise le</div>
        </div>
        <div class="col-3">
          <input type="date" class="form-control" format="yyyy-MM-dd" v-model="bill.date">
        </div>

      </div>
      <div class="row mt-3 d-flex align-items-center">
        <div class="col-1">
          <div>Client</div>
        </div>
        <div class="col-3">
          <!-- <input type="text" class="form-control" v-model="bill.client.companyName">-->
          <select name="client" id="client" class="form-control" v-model="bill.client">
            <option v-for="client in clients" :key="client.idclient" :value="client">
              {{ client.firstName }} {{ client.lastName }}
            </option>
          </select>

        </div>
      </div>


      <TableList class="mt-5">

        <template #thead>
          <th>Actions</th>
          <th>Prestation</th>
          <th>Quantité</th>
          <th>Montant unitaire</th>
          <th>Montant total</th>
        </template>

        <template #tbody>
          <tr v-for="(presta, index ) in bill.prestations" :key="presta + '-' + index">
            <td class="text-center align-middle">
              <button @click="onAddPrestation(index)" class=" btn">
                <i style="color:gray" class="fa-solid fa-circle-plus"></i>
              </button>
              <button @click="onRemovePrestation(index)" class="btn m-0"> <i style="color:red"
                  class="fa-solid fa-trash"></i></button>
            </td>
            <td>
              <input type="text" :name="'description' + index" :id="'description' + index" class="form-control"
                v-model="presta.description">
            </td>
            <td>
              <input type="text" :name="'quantity' + index" :id="'quantity' + index" class="form-control"
                v-model="presta.qty">
            </td>
            <td>
              <input type="text" :name="'price' + index" :id="'price' + index" class="form-control"
                v-model="presta.price">
            </td>
            <td>

              <input disabled type="text" :name="'price' + index" :id="'price' + index" class="form-control"
                :value="totalRow(index)">
            </td>
          </tr>

          <tr>
            <td colspan="3"></td>
            <td>Remise</td>
            <td>
              <input type="text" class="form-control" v-model="bill.discount">
            </td>
          </tr>

          <tr>
            <td colspan="3"></td>
            <td>Déjà payé</td>
            <td>
              <input type="text" class="form-control" v-model="bill.paid">
            </td>
          </tr>
          <tr>
            <td colspan="3"></td>
            <td>Total HT</td>
            <td>
              <input type="number" class="form-control" disabled v-model="bill.totalHT">
              </input>
            </td>
          </tr>
          <tr>
            <td colspan="3"></td>
            <td>TVA (20%)</td>
            <td>
              <input class="form-control" disabled v-model="bill.tva" />
            </td>
          </tr>
          <tr>
            <td colspan="3"></td>
            <td class="total">
              Montant TTC</td>
            <td>
              <input type="text" class="form-control" v-model="bill.totalTTC">
            </td>
          </tr>



        </template>

      </TableList>

      <button @click="onSaveBill(bill)" :disabled="formInvalid" class="btn btn-outline-dark align">Enregistrer</button>

    </div>


  </div>

</template>

<script>
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useBillsStore } from '@/stores/bill.js'
import { clients } from '@/datas/clients.js'
import SectionTitle from '@/components/SectionTitle.vue'
import BackButton from '@/components/Buttons/BackButton.vue'
import TableList from '@/components/TableList/TableList.vue'

const prestationInterface = {
  description: '',
  price: 0,
  qty: 1
}

export default {
  components: {
    SectionTitle,
    BackButton,
    TableList
  },

  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },

  data() {
    return {
      clients,
    }
  },

  computed: {
    ...mapWritableState(useBillsStore, ['bill']),

    formInvalid() {
      return !this.bill.client || !this.bill.billnum || !this.bill.date || !this.bill.description
    },
    totalRow() {
      return (index) => {
        if (this.bill) {
          const prestation = this.bill.prestations[index]
          return prestation.qty * prestation.price
        }
      }
    }
  },
  mounted() {
    this.setBill(this.id)
  },

  methods: {
    ...mapActions(useBillsStore, ['onDeleteBill', 'onUpdateBill', 'setBill']),

    onAddPrestation(index) {
      // ajout d'une prestation sous l'élément courant dans le tableau
      this.bill.prestations.splice(index, 0, { ...prestationInterface })
    },
    onRemovePrestation(index) {
      // suppression d'une prestation
      this.bill.prestations.splice(index, 1)
    },
    updateTotal() {
      if (this.bill) {
        this.bill.totalHT = 0
        for (const prestation of this.bill.prestations) {
          this.bill.totalHT += prestation.qty * prestation.price
        }
        this.bill.totalTTC =
          this.bill.totalHT +
          (this.bill.totalHT * this.bill.tva) / 100 -
          this.bill.discount -
          this.bill.paid
      }
    },

    onSaveBill() {
      this.onUpdateBill(this.bill)
      this.$router.push({ name: 'bills' })
    },

    deleteBill(bill) {
      this.onDeleteBill(bill)
      this.$router.push({ name: 'bills' })
    }
  },

  watch: {
    'bill.prestations': {
      handler() {
        this.updateTotal()
      },
      deep: true
    },
    'bill.discount'() {
      this.updateTotal()
    },
    'bill.paid'() {
      this.updateTotal()
    }
  }




}

</script>

<style scoped>
th {
  color: gray !important
}

.fixed {
  background-color: lightgray;
}
</style>