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
      </ul>
      <ul class="usernavigation">
        <li v-if="isLoggedIn">
          <span>Settings</span>
          <label class="switch">
            <input type="checkbox" @click="togglePreference()">
            <span class="slider"></span>
          </label>
        </li>
        <li v-if="!isLoggedIn">
          <RouterLink :to="{ name: 'login' }">Login</RouterLink>
        </li>
        <li v-if="!isLoggedIn">
          <RouterLink :to="{ name: 'register' }">Register</RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink to="/profil">Profile</RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <a><button @click="logout()">Logout</button></a>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useLogoutMutation } from '../graphql/generated/schema'
import { useUserStore } from '../store';
import { useDrawerActive } from '../composables/drawerActive';

const userStore = useUserStore();
const isLoggedIn = computed(() => {
  return userStore.isLoggedIn;
})

const { mutate: sendLogoutMutation } = useLogoutMutation();
const logout = () => {
  sendLogoutMutation();
  userStore.logout();
}

const { togglePreference } = useDrawerActive();
</script>