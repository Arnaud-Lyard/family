import { computed, ref } from "vue";

const arrowrank = ref({
  isArrowNotSelected: false,
  isArrowDown: true,
});
const arrowbattletag = ref({
  isArrowNotSelected: true,
  isArrowDown: false,
});
const arrowVictory = ref({
  isArrowNotSelected: true,
  isArrowDown: false,
});
const arrowDefeat = ref({
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
const arrowVictoryDirection = computed(() => ({
  down: arrowVictory.value.isArrowDown,
  up: !arrowVictory.value.isArrowDown,
  none: arrowVictory.value.isArrowNotSelected,
}));
const arrowDefeatDirection = computed(() => ({
  down: arrowDefeat.value.isArrowDown,
  up: !arrowDefeat.value.isArrowDown,
  none: arrowDefeat.value.isArrowNotSelected,
}));
export function useSwitchTableHeader() {
  function switchTableHeader(tableHeaderName: string) {
    switch (tableHeaderName) {
      case "rank":
        arrowrank.value.isArrowNotSelected = false;
        arrowbattletag.value.isArrowNotSelected = true;
        arrowVictory.value.isArrowNotSelected = true;
        arrowDefeat.value.isArrowNotSelected = true;
        arrowrank.value.isArrowDown = !arrowrank.value.isArrowDown;
        break;

      case "battletag":
        arrowbattletag.value.isArrowNotSelected = false;
        arrowrank.value.isArrowNotSelected = true;
        arrowVictory.value.isArrowNotSelected = true;
        arrowDefeat.value.isArrowNotSelected = true;
        arrowbattletag.value.isArrowDown = !arrowbattletag.value.isArrowDown;
        break;

      case "victory":
        arrowVictory.value.isArrowNotSelected = false;
        arrowrank.value.isArrowNotSelected = true;
        arrowbattletag.value.isArrowNotSelected = true;
        arrowDefeat.value.isArrowNotSelected = true;
        arrowVictory.value.isArrowDown = !arrowVictory.value.isArrowDown;
        break;

      case "defeat":
        arrowDefeat.value.isArrowNotSelected = false;
        arrowrank.value.isArrowNotSelected = true;
        arrowbattletag.value.isArrowNotSelected = true;
        arrowVictory.value.isArrowNotSelected = true;
        arrowDefeat.value.isArrowDown = !arrowDefeat.value.isArrowDown;
        break;

      default:
        break;
    }
  }

  return {
    arrowRankDirection,
    arrowBattletagDirection,
    arrowVictoryDirection,
    arrowDefeatDirection,
    switchTableHeader,
  };
}
