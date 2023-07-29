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
          <RouterLink to="3">Services</RouterLink>
        </li>
        <li>
          <RouterLink to="/dashboard">Dashboard</RouterLink>
        </li>
      </ul>
      <ul class="usernavigation">
        <li>
          <RouterLink :to="{ name: 'login' }">Login</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'register' }">Register</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">
</script>