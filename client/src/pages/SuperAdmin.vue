<template>
  <div class="container flex flex-direction-column flex-align-center" :class="drawerActive">
    <div class="superadmin">
      <li v-for="user in usersList" :key="user.id">
        {{ user.username }}
        <label class="switch">
          <input type="checkbox" v-model="user.isAdmin" @click="toggleUserRole(user)">
          <span class="slider"></span>
        </label>
      </li>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useGetAllAdminUsersQuery } from '../graphql/generated/schema';
import { useToggleAdminRoleMutation } from '../graphql/generated/schema';
import { useDrawerActive } from '../composables/drawerActive';
interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

const usersList = ref<User[]>([]);
const { onResult, refetch: sendGetAllAdminUsersQuery } = useGetAllAdminUsersQuery();
onResult(({ data }) => {
  if (data?.getAllAdminUsers) {
    usersList.value = data.getAllAdminUsers.map((user) => {
      return {
        id: user.id,
        username: user.username,
        isAdmin: user.roles.includes('admin') ? true : false,
      };
    }).sort((a, b) => a.isAdmin === b.isAdmin ? 0 : a.isAdmin ? -1 : 1)
  }
});

function toggleUserRole(user: User) {
  const { mutate: sendToggleAdminRoleMutation, onDone: onToggleAdminRoleMutationDone } = useToggleAdminRoleMutation({
    variables: {
      data: {
        id: user.id,
        isAdmin: !user.isAdmin,
      }
    },
  });
  sendToggleAdminRoleMutation();
  onToggleAdminRoleMutationDone(() => {
    sendGetAllAdminUsersQuery();
  });
}

const { drawerActive } = useDrawerActive();
</script>