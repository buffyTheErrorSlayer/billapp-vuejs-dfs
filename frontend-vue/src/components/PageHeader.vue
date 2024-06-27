<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <RouterLink class="navbar-brand" to="/">
                    <img class="logo" :src="logo" alt="bill app logo">
                </RouterLink>

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
import logo from "@/assets/BILLAPP.png"

export default {
    components: {
        RouterLink,
        RouterView,
    },

    data(){
        return {
            logo : logo
        }
    }
}

</script>

<style >

.logo{
    height: 100px;
    width: auto;
    margin-right: 20px;
}

.navbar{
    padding: 0;
    margin-top: 10px;
    background-color: white !important;
    /* border: 1px solid #597ccf; */
    /* box-shadow: 3px 3px 0px 0px #597ccf; */
}

.nav-link{
    color: #597ccf;
    font-weight: bold;
}

</style>