<template>
    <div class="container" v-if="client">
        <SectionTitle>
            <template v-if="isNewClient" #title>Créer un client</template>
            <template v-if="!isNewClient" #title>Editer un client</template>
            <template #buttons>
                <button v-if="!isNewClient" @click="onDeleteClient(client)" class="btn btn-outline-danger me-1"> <i class="fa-solid fa-trash"></i>
                    Supprimer</button>
                <BackButton />
            </template>
        </SectionTitle>

        <div class="border rounded p-2">
            <div class="row">
                <div class="col-9">
                    <h2 class="fs-5">Contact :</h2>

                    <div class="row">
                        <div class="col-6">
                        <label for="firstName" class="form-label">Prénom:</label>
                        <input type="text" name="firstName" id="firstName" v-model="client.firstName"
                            class="form-control" placeholder="Prénom" :class="{ 'is-invalid': !client.firstName }" />
                        </div>

                        <div class="col-6">
                            <label for="lastName" class="form-label">Nom:</label>
                            <input type="text" name="lastName" id="lastName" v-model="client.lastName"
                            class="form-control" placeholder="Nom" :class="{ 'is-invalid': !client.lastName }" />
                        </div>
                        
                    </div>

                    <div class="row mt-3">
                        <div class="col-6">
                            <label for="fonction" class="form-label">Fonction:</label>
                            <input type="text" name="fonction" id="fonction" v-model="client.fonction"
                                class="form-control" placeholder="Directeur"
                                :class="{ 'is-invalid': !client.fonction }" />
                        </div>
                        <div class="col-6">
                            <label for="phone" class="form-label">Téléphone:</label>
                            <input type="text" name="phone" id="phone" v-model="client.telephone" class="form-control"
                                placeholder="+33 6 02 03 04 05" :class="{ 'is-invalid': !client.telephone }" />
                        </div>
                        
                    </div>
                    <div class="row mt-3">
                        <div class="col-12">
                            <label for="email" class="form-label">Email:</label>
                            <input type="text" name="email" id="email" v-model="client.email"
                                class="form-control" placeholder="test@test.fr"
                                :class="{ 'is-invalid': !client.email }" />
                        </div>

                    </div>
                    <div class="row mt-3">
                        <div class="col-12">
                            <label for="companyName" class="form-label">Entreprise:</label>
                            <input type="text" name="companyName" id="companyName" v-model="client.companyName"
                                class="form-control" placeholder="Orange"
                                :class="{ 'is-invalid': !client.companyName }" />
                        </div>

                    </div>

                    <h2 class="fs-5 mt-4">Coordonnées :</h2>

                    <div class="row mt-3">
                        <div class="col-12">
                            <label for="adresse1" class="form-label">Adresse 1:</label>
                            <input type="text" name="adresse1" id="adresse1" v-model="client.adresse.adresse1"
                                class="form-control" placeholder="adresse1"
                                :class="{ 'is-invalid': !client.adresse.adresse1 }" />
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-12">
                            <label for="adresse2" class="form-label">Adresse 2:</label>
                            <input type="text" name="adresse2" id="adresse2" v-model="client.adresse.adresse2"
                                class="form-control"/>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-6">
                            <label for="codePostal" class="form-label">Code Postal:</label>
                            <input type="text" name="codePostal" id="codePostal" v-model="client.adresse.codePostal"
                                class="form-control" placeholder="5700"
                                :class="{ 'is-invalid': !client.adresse.codePostal }" />
                        </div>
                        <div class="col-6">
                            <label for="ville" class="form-label">Téléphone:</label>
                            <input type="text" name="ville" id="ville" v-model="client.adresse.ville" class="form-control"
                                placeholder="+33 6 02 03 04 05" :class="{ 'is-invalid': !client.adresse.ville }" />
                        </div>
                        
                    </div>
                    <div class="row mt-3">
                        <div class="col-6">
                            <label for="pays" class="form-label">Pays:</label>
                            <input type="text" name="pays" id="pays" v-model="client.adresse.pays"
                                class="form-control" placeholder="5700"
                                :class="{ 'is-invalid': !client.adresse.pays }" />
                        </div>

                    </div>


                </div>

                <div class="col form-date-ajout">
                    <label class="form-label" for="dateAjout">Date d'ajout :</label>
                    <input type="date" v-model="client.dateAjout" name="dateAjout" id="dateAjout"
                        class="form-control" :class="{ 'is-invalid': !client.dateAjout}" />

                </div>
            </div>





            <button @click="saveClient(client)" :disabled="formInvalid" class="btn btn-outline-dark align mt-4">Enregistrer</button>

        </div>

    </div>
</template>

<script>
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useClientsStore } from '@/stores/client.js';
import SectionTitle from '@/components/SectionTitle.vue'
import TableList from '@/components/TableList/TableList.vue'
import ClientTableRow from '@/components/TableList/ClientTableRow.vue'
import BackButton from '@/components/Buttons/BackButton.vue'


export default {
    components: {
        SectionTitle,
        TableList,
        ClientTableRow,
        BackButton,

    },

    props: {
        id: {
            type: [String, Number],
            required: true
        }
    },
    computed: {
        ...mapWritableState(useClientsStore, ['client']),

        isNewClient(){
            return this.id == '-1'
        },

        formInvalid() {
            return!this.client.firstName ||!this.client.lastName ||!this.client.telephone ||!this.client.email ||!this.client.companyName ||!this.client.adresse.adresse1 ||!this.client.adresse.codePostal ||!this.client.adresse.ville ||!this.client.adresse.pays;
        }
    },

    mounted() {
        this.getClient(this.id)
    },
    methods: {
        ...mapActions(useClientsStore, ['getClient', 'onAddClient' , 'onUpdateClient', 'onDeleteClient']),

        saveClient(client) {
            if (this.isNewClient) {
                this.onAddClient(client)
            } else {
                this.onUpdateClient(client)
            }

            this.$router.push({path: '/clients'})
        },
    }



}



</script>

<style scoped>
    .form-date-ajout{
        padding-top: 32px;
    }
</style>