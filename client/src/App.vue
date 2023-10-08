<template>
  <Header :class="scssMode" @logout="logout()" />
  <Preference :class="scssMode" @light-mode="enableLightTheme()" @dark-mode="enableDarkTheme()" />
  <router-view :class="scssMode"></router-view>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import Preference from "./components/Preference.vue";
import { useLogoutMutation } from "./graphql/generated/schema";
import { useUserStore } from "./store";
import { usePreferenceActive } from './composables/preferenceActive';
const userStore = useUserStore();

const { enableLightTheme, enableDarkTheme, scssMode } = usePreferenceActive();

const { mutate: sendLogoutMutation } = useLogoutMutation();
const logout = () => {
  sendLogoutMutation();
  userStore.logout();
}
</script>
