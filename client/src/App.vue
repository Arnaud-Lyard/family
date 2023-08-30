<template>
  <Header :class="scssMode" />
  <Preference :class="scssMode" @light-mode="enableLightScss()" @dark-mode="enableDarkScss()" />
  <router-view :class="scssMode"></router-view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Header from "./components/Header.vue";
import Preference from "./components/Preference.vue";

const isLightThemeActive = ref(true);
const isDarkThemeActive = ref(false);
const enableLightScss = () => {
  isLightThemeActive.value = true;
  isDarkThemeActive.value = false;
};
const enableDarkScss = () => {
  isLightThemeActive.value = false;
  isDarkThemeActive.value = true;
};
const scssMode = computed(() => ({
  'dark-theme': isDarkThemeActive.value,
  'light-theme': isLightThemeActive.value,
}))
</script>
