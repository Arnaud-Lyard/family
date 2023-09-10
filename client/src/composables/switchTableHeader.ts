import { computed, ref } from "vue";

const arrowrank = ref({
  isArrowNotSelected: false,
  isArrowDown: true,
});
const arrowbattletag = ref({
  isArrowNotSelected: true,
  isArrowDown: false,
});
const arrowRankDirection = computed(() => ({
  down: arrowrank.value.isArrowDown,
  up: !arrowrank.value.isArrowDown,
  none: arrowrank.value.isArrowNotSelected,
}));
const arrowBattletagDirection = computed(() => ({
  down: arrowbattletag.value.isArrowDown,
  up: !arrowbattletag.value.isArrowDown,
  none: arrowbattletag.value.isArrowNotSelected,
}));
export function useSwitchTableHeader() {
  function switchTableHeader(tableHeaderName: string) {
    switch (tableHeaderName) {
      case "rank":
        arrowrank.value.isArrowNotSelected = false;
        arrowbattletag.value.isArrowNotSelected = true;
        arrowrank.value.isArrowDown = !arrowrank.value.isArrowDown;
        break;

      case "battletag":
        arrowbattletag.value.isArrowNotSelected = false;
        arrowrank.value.isArrowNotSelected = true;
        arrowbattletag.value.isArrowDown = !arrowbattletag.value.isArrowDown;
        break;

      default:
        break;
    }
  }
  return {
    arrowRankDirection,
    arrowBattletagDirection,
    switchTableHeader,
  };
}
