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
        <li>
          <span>Settings</span>
          <label class="switch">
            <input type="checkbox" @click="togglePreference()">
            <span class="slider"></span>
          </label>
        </li>
        <li v-if="isLoggedIn && isSuperAdmin">
          <RouterLink to="/superadmin">Super Admin</RouterLink>
        </li>
        <li v-if="isLoggedIn && isAdmin || isLoggedIn && isSuperAdmin">
          <RouterLink to="/admin">Admin</RouterLink>
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
          <a><button @click="$emit('logout')">Logout</button></a>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../store';
import { useDrawerActive } from '../composables/drawerActive';

const emit = defineEmits(['logout'])

const userStore = useUserStore();
const isLoggedIn = computed(() => {
  return userStore.isLoggedIn;
})
const isAdmin = computed(() => {
  return userStore.getIsAdmin;
})
const isSuperAdmin = computed(() => {
  return userStore.getIsSuperAdmin;
})

const { togglePreference } = useDrawerActive();
</script>