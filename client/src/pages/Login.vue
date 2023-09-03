<template>
  <div class="container flex flex-justify-center flex-align-center">
    <div class="side-form login-background full-height"></div>
    <form @submit.prevent="submitForm()" class="form">
      <label for="email">Email address :</label>
      <input v-model.trim="email" type="email" name="email" id="email" required>
      <label for="password">Password :</label>
      <input v-model.trim="password" type="password" name="password" id="password" required>
      <button type="submit" class="button">Connection</button>
      <div class="error regular">{{ errorLogin }}</div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useLoginMutation } from '../graphql/generated/schema';
import { useUserStore } from '../store';

const userStore = useUserStore();

const password = ref<string>("");
const email = ref<string>("");
const errorLogin = ref<string>("");

const submitForm = () => {
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
      errorLogin.value = "Invalid credentials.";
    } else if (errors && errors[0].message.length > 0) {
      errorLogin.value = "Error, please try again later."
    } else {
      userStore.login()
    }
  })
};

</script>
