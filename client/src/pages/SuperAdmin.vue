<template>
  <div class="container flex flex-direction-column flex-align-center superadmin">
    <li v-for="user in usersList" :key="user.id">
      {{ user.username }}
      <label class="switch">
        <input type="checkbox" v-model="user.isAdmin" @click="promoteUser(user.id)">
        <span class="slider"></span>
      </label>
    </li>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useGetAllAdminUsersQuery } from '../graphql/generated/schema';
import { usePromoteUserMutation } from '../graphql/generated/schema';
interface User {
  id: number;
  username: string;
  isAdmin: boolean;
}

const usersList = ref<User[]>([]);
const { onResult, refetch: sendGetAllAdminUsersQuery } = useGetAllAdminUsersQuery();
onResult(({ data }) => {
  if (data?.getAllAdminUsers) {
    usersList.value = data.getAllAdminUsers.sort((a, b) => a.role.localeCompare(b.role)).map((user) => {
      return {
        id: user.id,
        username: user.username,
        isAdmin: user.role === 'admin' || user.role === 'superadmin' ? true : false,
      };
    })
  }
});

function promoteUser(userId: number) {
  const { mutate: sendPromoteUserMutation } = usePromoteUserMutation({
    variables: {
      data: {
        id: userId,
      }
    },
  });
  sendPromoteUserMutation();
  sendGetAllAdminUsersQuery();
}

</script>