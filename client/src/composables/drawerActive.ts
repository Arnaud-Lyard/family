import { computed, ref } from "vue";

const isPreferenceActive = ref(false);
export function useDrawerActive() {
  function togglePreference() {
    isPreferenceActive.value = !isPreferenceActive.value;
  }
  const drawerActive = computed(() => ({
    "drawer-active": isPreferenceActive.value,
  }));
  return { isPreferenceActive, drawerActive, togglePreference };
}
