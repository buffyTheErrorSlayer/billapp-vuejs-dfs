<template>
    <button @click="onBackToPreviousPage()" class="btn btn-outline-primary">
        <i class="fa-solid fa-chevron-left"></i> Retour
    </button>
</template>

<script>
export default {
    methods: {
        onBackToPreviousPage() {
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped></style>