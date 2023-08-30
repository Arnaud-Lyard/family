<template>
    <div :class="drawerActive">
        Dashboard
    </div>
</template>
<script setup lang="ts">
import { useDrawerActive } from '../composables/drawerActive';

const { drawerActive, isPreferenceActive } = useDrawerActive();

</script>