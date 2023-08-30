<template>
    <div :class="drawerActive" class="container">
        <p class="bold xxl">Home</p>
        <h1>Titre</h1>
        <h2>Titre</h2>
        <h3>Titre</h3>
        <h4>Titre</h4>
        <h5>titre</h5>
        <h6>titre</h6>
    </div>
</template>
<script setup lang="ts">
import { useDrawerActive } from '../composables/drawerActive';
import { computed, ref } from 'vue';

const { drawerActive } = useDrawerActive();
</script>