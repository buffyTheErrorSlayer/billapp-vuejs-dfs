<template>
    <tr>
      <td> {{ client.firstName }}</td>
      <td>{{ client.lastName }} </td>
      <td>{{ client.companyName }}</td>
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
      client: {
        type: Object,
        required: true
      }
    },
    emits: ['delete', 'edit'],

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
  