<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <RouterLink class="navbar-brand" to="/">BILL APP</RouterLink>

                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink class="nav-link" aria-current="page" to="/">
                            <i class="fa-solid fa-house"></i> Home
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" aria-current="page" to="/bills">
                            <i class="fa-solid fa-file-lines"></i> Factures
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" aria-current="page" to="/clients">
                            <i class="fa-solid fa-users"></i> Clients
                        </RouterLink>
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