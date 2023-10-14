<template>
  <header class="header">
    <nav>
      <ul class="navigation">
        <li>
          <img src="/images/relaxing-hippoquests.jpeg" alt="Logo">
        </li>
        <li>
          <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        </li>
      </ul>
      <ul class="usernavigation">
        <li>
          <span>Settings</span>
          <label for="settings" class="switch">
            <input type="checkbox" id="settings" name="settings" @click="togglePreference()">
            <span class="slider"></span>
          </label>
        </li>
        <li v-if="isLoggedIn && isSuperAdmin">
          <RouterLink :to="{ name: 'superadmin' }">Super Admin</RouterLink>
        </li>
        <li v-if="isLoggedIn && isAdmin || isLoggedIn && isSuperAdmin">
          <RouterLink :to="{ name: 'admin' }">Admin</RouterLink>
        </li>
        <li v-if="!isLoggedIn">
          <RouterLink :to="{ name: 'login' }">Login</RouterLink>
        </li>
        <li v-if="!isLoggedIn">
          <RouterLink :to="{ name: 'register' }">Register</RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'profile' }">Profile</RouterLink>
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