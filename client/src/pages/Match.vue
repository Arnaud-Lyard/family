<template>
  <div :class="drawerActive" class="container flex flex-justify-center">
    <WaitingMatch />
    <LeaderBoard />
  </div>
</template>
<script setup lang="ts">
import { useDrawerActive } from '../composables/drawerActive';
import LeaderBoard from '../components/LeaderBoard.vue';
import WaitingMatch from '../components/WaitingMatch.vue';

const { drawerActive } = useDrawerActive();
</script>