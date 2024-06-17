<template>
  <table class="table border">
    <thead>
      <tr>
        <!-- pour personnaliser éventuellement l'entête du tableau, on pourra utiliser le slot thead avec <template #thead></template>
-->
        <slot name="thead">
          <th>Date</th>
          <th>Description</th>
          <th>Client</th>
          <th>Prix HT</th>
          <th>Prix TTC</th>
          <th>Actions</th>
        </slot>
      </tr>
    </thead>
    <tbody>
      <!-- affichage des lignes de tableau -->
      <slot name="tbody" />
    </tbody>
  </table>
</template>

<script>
export default {}
</script>

<style scoped></style>
