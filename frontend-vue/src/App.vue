<template>
  <div class="container">
    <header>
        
      <PageHeader />

      <pre>
      </pre>
        
    </header>


    <RouterView />

  </div>

</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'

export default {
  components : {
    RouterLink, 
    RouterView,
    PageHeader
  },

}

</script>

<style scoped>

</style>
