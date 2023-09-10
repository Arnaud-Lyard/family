<template>
  <div :class="drawerActive" class="container flex flex-justify-center flex-align-center">
    <form @submit.prevent="submitForm()" class="form">
      <label for="email">Nom d'utilisateur :</label>
      <input v-model.trim="user.username" type="text" name="username" id="username" required>
      <label for="email">Adresse email :</label>
      <input v-model.trim="user.email" type="email" name="email" id="email" required>
      <div>
        <span>Do you want to register for tournament ?</span>
        <label class="switch">
          <input type="checkbox" v-model="user.isPlayer" @click="showModal(user.isPlayer)">
          <span class=" slider"></span>
        </label>
      </div>
      <label v-if="user.isPlayer" for="battletag">Battletag :</label>
      <input v-if="user.isPlayer" v-model.trim="user.battletag" type="text" name="firstname" id="firstname" required>
      <button type="submit" class="button">Save</button>
      <div class="error regular">{{ errorUpdatePersonnalInformations }}</div>
      <div class="success regular">{{ successUpdateProfile }}</div>
    </form>
    <Modal v-show="isModalVisible" @confirm="confirmModal" @close="closeModal">
      <template v-slot:header>Unregister tournament</template>
      <template v-slot:body> If you unregister for tournament, your actual rank will be lost. Are you sure ?
      </template>
      <template v-slot:buttonOne> Accept </template>
      <template v-slot:buttonTwo> Cancel </template>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { usePersonnalInformationsQuery } from '../graphql/generated/schema';
import { useDrawerActive } from '../composables/drawerActive';
import { useUpdateProfileMutation } from '../graphql/generated/schema';
import Modal from "../components/Modal.vue";

interface User {
  id: number;
  username: string;
  battletag: string;
  email: string;
  isPlayer: boolean;
}
const isModalVisible = ref<boolean>(false);
const user = reactive<User>({
  id: 0,
  username: "",
  battletag: "",
  email: "",
  isPlayer: false,
});
const errorUpdatePersonnalInformations = ref<string>("");
const successUpdateProfile = ref<string>("");

const { onResult } = usePersonnalInformationsQuery();
onResult(({ data }) => {
  user.username = data.personnalInformations.username;
  user.email = data.personnalInformations.email;
  user.battletag = data.personnalInformations.profile.battletag;
  user.isPlayer = data.personnalInformations.profile.isPlayer;
})

const submitForm = () => {
  const { mutate: sendUpdateProfileMutation, onDone } = useUpdateProfileMutation({
    variables: {
      data: {
        username: user.username,
        battletag: user.battletag,
        email: user.email,
        isPlayer: user.isPlayer,
      }
    },
  })
  sendUpdateProfileMutation();
  onDone(({ errors }) => {
    if (errors && errors[0].message === "USERNAME_ALREADY_USED") {
      errorUpdatePersonnalInformations.value = "Username already in use.";
    } else if (errors && errors[0].message === "EMAIL_ALREADY_USED") {
      errorUpdatePersonnalInformations.value = "Email already in use.";
    } else if (errors && errors[0].message.length > 0) {
      errorUpdatePersonnalInformations.value = "Error, please contact admin."
    } else {
      successUpdateProfile.value = "Profile updated successfully."
    }
  })
}
function showModal(isPlayer: boolean) {
  isPlayer === false ? isModalVisible.value = false : isModalVisible.value = true;
}
function confirmModal() {
  isModalVisible.value = false;
}
function closeModal() {
  user.isPlayer = true;
  isModalVisible.value = false;
}
const { drawerActive } = useDrawerActive();

</script>