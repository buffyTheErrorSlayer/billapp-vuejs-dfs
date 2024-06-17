<template>
  <tr>
    <td> {{ bill.date }}</td>
    <td>{{ bill.description }} / Facture n° {{ bill.billnum }}</td>
    <td>{{ clientName }}</td>
    <td>{{ bill.totalHT }} € </td>
    <td class="fw-bold">{{ bill.totalTTC }} € </td>
    <td>
      <button @click="onDelete()" class="btn btn-outline-danger me-1"> <i class="fa-solid fa-trash"></i>
        Supprimer</button>

      <button @click="onEdit()" class="btn btn-outline-primary"> <i class="fa-solid fa-pen"></i>
        Editer</button>
    </td>
  </tr>

</template>

<script>
export default {
  props: {
    bill: {
      type: Object,
      required: true
    }
  },
  emits: ['delete', 'edit'],
  computed: {
    clientName() {
      return this.bill.client.firstName + ' ' + this.bill.client.lastName
    }
  },
  methods: {
    onDelete() {
      this.$emit('delete', this.bill)
    },
    onEdit() {
      this.$emit('edit', this.bill)
    }
  }
}
</script>

<style scoped></style>
