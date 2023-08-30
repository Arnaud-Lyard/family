<template>
    <div :class="drawerActive" class="container flex flex-center">
        <Blog />
        <LeaderBoard />
    </div>
</template>
<script setup lang="ts">
import { useDrawerActive } from '../composables/drawerActive';
import Blog from '../components/Blog.vue';
import LeaderBoard from '../components/LeaderBoard.vue';

const { drawerActive } = useDrawerActive();
</script>