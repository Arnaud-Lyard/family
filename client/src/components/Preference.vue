<template >
  <nav class="preference" v-if="isPreferenceActive">
    <ul>
      <li @click="$emit('lightMode'), selectMode('light')">
        <i :class="activeLightPreference">
          <font-awesome-icon icon="fa-solid fa-lightbulb" />
        </i>
      </li>
      <li @click="$emit('darkMode'), selectMode('dark')">
        <i :class="activeDarkPreference">
          <font-awesome-icon icon="fa-solid fa-bolt-lightning" />
        </i>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useUserStore } from '../store';
import { useDrawerActive } from '../composables/drawerActive';
import { usePreferenceActive } from '../composables/preferenceActive';

const userStore = useUserStore();
const isLoggedIn = computed(() => {
  return userStore.isLoggedIn;
})

const { isPreferenceActive } = useDrawerActive();
const { isLightTheme, isDarkTheme, activeLightPreference, activeDarkPreference } = usePreferenceActive();
const emit = defineEmits(['lightMode', 'darkMode'])


function selectMode(mode: string) {
  if (mode === 'light') {
    isLightTheme.value = true;
    isDarkTheme.value = false;
  } else if (mode === 'dark') {
    isLightTheme.value = false;
    isDarkTheme.value = true;
  }
}
</script>
