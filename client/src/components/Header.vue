<template>
  <header>
    <nav>
      <ul class="navigation">
        <li>
          <img src="/images/vue-js.png" alt="Logo">
        </li>
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/123">Services</RouterLink>
        </li>
        <li>
          <RouterLink to="/dashboard">Dashboard</RouterLink>
        </li>
      </ul>
      <ul class="usernavigation">
        <li>
          <RouterLink :to="{ name: 'login' }" v-if="!isLoggedIn">Connexion</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'register' }" v-if="!isLoggedIn">Inscription</RouterLink>
        </li>
        <li>
          <a v-if="isLoggedIn"><button @click="logout()">Déconnexion</button></a>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useLogoutMutation } from '../graphql/generated/schema'
import { useUserStore } from '../store';

const userStore = useUserStore();

const isLoggedIn = computed(() => {
  return userStore.isLoggedIn;
})

const { mutate: sendLogoutMutation } = useLogoutMutation();

const logout = () => {
  sendLogoutMutation();
  userStore.logout();
}
</script>