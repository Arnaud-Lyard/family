<template>
  <div class="container flex flex-center">
    <div class="side-form login-background"></div>
    <form @submit.prevent="submitForm()" class="login">
      <label for="username">Nom d'utilisateur :</label>
      <input @keyup="validateUsername()" @blue="validateUsername()" v-model.trim="username" type="text" name="email"
        id="username" required>
      <div class="error regular">{{ errorUsername }}</div>
      <label for="email">Adresse email :</label>
      <input @keyup="validateEmail()" @blue="validateEmail()" v-model.trim="email" type="email" name="email" id="email"
        required>
      <div class="error regular">{{ errorEmail }}</div>
      <label for="password">Mot de passe :</label>
      <input @keyup="validatePassword(); validatePasswordConfirm()" @blue="validatePassword(); validatePasswordConfirm()"
        v-model.trim="password" type="password" name="password" id="password" required>
      <div class="error regular">{{ errorPassword }}</div>
      <label for="password">Confirmer mot de passe :</label>
      <input @keyup="validatePasswordConfirm()" @blue="validatePasswordConfirm()" v-model.trim="passwordConfirm"
        type="password" name="passwordConfirm" id="passwordConfirm" required>
      <div class="error regular">{{ errorPasswordConfirm }}</div>
      <button type="submit" class="button">Inscription</button>
      <div class="error regular">{{ errorRegister }}</div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '../store';
import { useRouter } from 'vue-router';
import { useRegisterMutation } from '../graphql/generated/schema';

const userStore = useUserStore();
const router = useRouter();

const username = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const passwordConfirm = ref<string>("");
const errorPassword = ref<string>("");
const errorEmail = ref<string>("");
const errorPasswordConfirm = ref<string>("");
const errorUsername = ref<string>("");
const errorRegister = ref<string>("");

const validateEmail = () => {
  errorEmail.value = email.value === "" ? "Le champ est requis." : "";
  let re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  errorEmail.value = !re.test(email.value)
    ? `L'adresse ${email.value} n'est pas une adresse email valide.`
    : "";
};

const validatePassword = () => {
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  errorPassword.value = !regex.test(password.value)
    ? "Le mot de passe doit contenir au moins 8 caractères dont une majuscule et un chiffre."
    : "";
};

const validatePasswordConfirm = () => {
  if (passwordConfirm.value.length > 0) {
    errorPasswordConfirm.value =
      password.value !== passwordConfirm.value
        ? "Les mots de passe ne correspondent pas."
        : "";
  }
};

const validateUsername = () => {
  errorUsername.value = username.value.length < 3 ? "Le nom d'utilisateur doit contenir au moins 3 caractères." : "";
}
const submitForm = async () => {
  if (!errorEmail.value && !errorPassword.value && !errorPasswordConfirm.value && !errorUsername.value) {
    const { mutate: sendRegister, onDone } = useRegisterMutation({
      variables: {
        data: {
          username: username.value,
          email: email.value,
          password: password.value,
        },
      },
    });
    sendRegister();
    username.value = "";
    password.value = "";
    passwordConfirm.value = "";
    email.value = "";
    onDone(({ errors }) => {
      if (errors && errors[0].message === "USERNAME_ALREADY_EXISTS") {
        errorRegister.value = "Nom d'utilisateur déjà utilisé.";
      } else if (errors && errors[0].message.length > 0) {
        errorRegister.value = "Une erreur est survenue."
      } else {
        userStore.userProfile();
        router.push({ name: "dashboard" });
      }
    })
  }
};

</script>
