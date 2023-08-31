<template>
    <div class="container flex flex-center">
        Superadmin
    </div>
</template>
<script setup lang="ts">
import { useGetAllUsersQuery } from '../graphql/generated/schema';

const { onResult } = useGetAllUsersQuery();
onResult(({ data }) => {
    console.log(data);
});
</script>