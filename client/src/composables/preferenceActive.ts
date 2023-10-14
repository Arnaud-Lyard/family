import { computed, ref } from "vue";
import { useUserStore } from "../store";

export function usePreferenceActive() {
  const userStore = useUserStore();
  const isLightTheme = ref(
    userStore.getIsLightTheme ? true : userStore.getIsDarkTheme ? false : true
  );
  const isDarkTheme = ref(userStore.getIsDarkTheme ? true : false);

  function enableLightTheme() {
    userStore.enableLightTheme();
    isLightTheme.value = true;
    isDarkTheme.value = false;
  }
  function enableDarkTheme() {
    userStore.enableDarkTheme();
    isLightTheme.value = false;
    isDarkTheme.value = true;
  }
  const scssMode = computed(() => ({
    "light-theme": isLightTheme.value,
    "dark-theme": isDarkTheme.value,
  }));
  const activeLightPreference = computed(() => ({
    "light-active": isLightTheme.value,
  }));
  const activeDarkPreference = computed(() => ({
    "dark-active": isDarkTheme.value,
  }));
  return {
    activeLightPreference,
    activeDarkPreference,
    isLightTheme,
    isDarkTheme,
    scssMode,
    enableLightTheme,
    enableDarkTheme,
  };
}
