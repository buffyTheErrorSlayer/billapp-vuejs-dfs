<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <RouterLink class="navbar-brand" to="/">BILL APP</RouterLink>

                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink class="nav-link" aria-current="page" to="/">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" aria-current="page" to="/bills">Factures</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" aria-current="page" to="/create-bill">Créér</RouterLink>
                    </li>

                </ul>
            </div>
        </nav>
    </header>
</template>

<script>

import { RouterLink, RouterView } from 'vue-router'

export default {
    components: {
        RouterLink,
        RouterView,
    }
}

</script>

<style scoped></style>