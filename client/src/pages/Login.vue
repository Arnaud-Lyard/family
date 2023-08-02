<template>
  <div class="container flex flex-center">
    <div class="side-form login-background"></div>
    <form @submit.prevent="submitForm()" class="login">
      <label for="email">Adresse email :</label>
      <input @keyup="validateEmail()" @blue="validateEmail()" v-model.trim="email" type="email" name="email" id="email"
        required>
      <div class="error regular">{{ errorEmail }}</div>
      <label for="password">Mot de passe :</label>
      <input v-model.trim="password" type="password" name="password" id="password" required>
      <div class="error regular">{{ errorPassword }}</div>
      <button type="submit" class="button">Connexion</button>
      <div class="error regular">{{ errorLogin }}</div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useLoginMutation } from '../graphql/generated/schema';
import { useUserStore } from '../store';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const password = ref<string>("");
const email = ref<string>("");
const errorPassword = ref<string>("");
const errorEmail = ref<string>("");
const errorLogin = ref<string>("");

const validateEmail = () => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  errorEmail.value = !regex.test(email.value)
    ? `L'adresse ${email.value} n'est pas une adresse email valide.`
    : "";
};

const submitForm = () => {
  if (!errorEmail.value && !errorPassword.value) {
    const { mutate: sendLogin, onDone } = useLoginMutation({
      variables: {
        data: {
          email: email.value,
          password: password.value,
        },
      },
    });
    sendLogin();
    password.value = "";
    email.value = "";
    onDone(({ errors }) => {
      if (errors && errors[0].message === "INVALID_CREDENTIALS") {
        errorLogin.value = "Identifiants invalides.";
      } else if (errors && errors[0].message.length > 0) {
        errorLogin.value = "Une erreur est survenue."
      } else {
        userStore.userProfile();
        router.push({ name: "dashboard" });
      }
    })
  }
};

</script>
