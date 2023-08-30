<template >
  <nav class="preference" v-if="isLoggedIn && isPreferenceActive">
    <ul>
      <li @click="$emit('lightMode'), selectMode('light')">
        <i :class="activePreference">
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


const userStore = useUserStore();
const isLoggedIn = computed(() => {
  return userStore.isLoggedIn;
})

const { isPreferenceActive } = useDrawerActive();

const emit = defineEmits(['lightMode', 'darkMode'])

const isLightModeActive = ref(true);
const isDarkModeActive = ref(false);
const activePreference = computed(() => ({
  'light-active': isLightModeActive.value
}))
const activeDarkPreference = computed(() => ({
  'dark-active': isDarkModeActive.value
}))
function selectMode(mode: string) {
  if (mode === 'light') {
    isLightModeActive.value = true;
    isDarkModeActive.value = false;
  } else if (mode === 'dark') {
    isLightModeActive.value = false;
    isDarkModeActive.value = true;
  }
}
</script>
