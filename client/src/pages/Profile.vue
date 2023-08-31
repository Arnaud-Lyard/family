<template>
    <div class="container flex flex-justify-center flex-align-center">
        <form @submit.prevent="submitForm()" class="login">
            <label for="email">Nom d'utilisateur :</label>
            <input v-model.trim="username" type="text" name="username" id="username" disabled required>
            <label for="email">Adresse email :</label>
            <input v-model.trim="email" type="email" name="email" id="email" disabled required>
            <button type="submit" class="button">Enregistrer</button>
            <div class="error regular">{{ errorUpdatePersonnalInformations }}</div>
        </form>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { usePersonnalInformationsQuery } from '../graphql/generated/schema';

const username = ref<string>("");
const email = ref<string>("");
const errorUpdatePersonnalInformations = ref<string>("");

const { onResult } = usePersonnalInformationsQuery();
onResult(({ data }) => {
    username.value = data.personnalInformations.username;
    email.value = data.personnalInformations.email;
})


const submitForm = () => {
};


</script>