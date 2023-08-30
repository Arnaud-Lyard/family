<template>
  <div class="container-center flex flex-center-align">
    <div class="side-form login-background"></div>
    <form @submit.prevent="submitForm()" class="login">
      <label for="username">Username :</label>
      <input @keyup="validateUsername()" @blue="validateUsername()" v-model.trim="username" type="text" name="email"
        id="username" required>
      <div class="error regular">{{ errorUsername }}</div>
      <label for="email">Email address :</label>
      <input @keyup="validateEmail()" @blue="validateEmail()" v-model.trim="email" type="email" name="email" id="email"
        required>
      <div class="error regular">{{ errorEmail }}</div>
      <label for="password">Password :</label>
      <input @keyup="validatePassword(); validatePasswordConfirm()" @blue="validatePassword(); validatePasswordConfirm()"
        v-model.trim="password" type="password" name="password" id="password" required>
      <div class="error regular">{{ errorPassword }}</div>
      <label for="password">Password confirm :</label>
      <input @keyup="validatePasswordConfirm()" @blue="validatePasswordConfirm()" v-model.trim="passwordConfirm"
        type="password" name="passwordConfirm" id="passwordConfirm" required>
      <div class="error regular">{{ errorPasswordConfirm }}</div>
      <button type="submit" class="button">Registration</button>
      <div class="error regular">{{ errorRegister }}</div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRegisterMutation } from '../graphql/generated/schema';

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
  errorEmail.value = email.value === "" ? "The field is required." : "";
  let re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  errorEmail.value = !re.test(email.value)
    ? `Email address ${email.value} is not a valid email address.`
    : "";
};

const validatePassword = () => {
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  errorPassword.value = !regex.test(password.value)
    ? "The password must contain at least 8 characters including a capital letter and a number."
    : "";
};

const validatePasswordConfirm = () => {
  if (passwordConfirm.value.length > 0) {
    errorPasswordConfirm.value =
      password.value !== passwordConfirm.value
        ? "Passwords do not match."
        : "";
  }
};

const validateUsername = () => {
  errorUsername.value = username.value.length < 3 ? "Username must contain at least 3 characters." : "";
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
        errorRegister.value = "Username already in use.";
      } else if (errors && errors[0].message.length > 0) {
        errorRegister.value = "Error, please try again later."
      } else {
        router.push({ name: "login" });
      }
    })
  }
};

</script>
