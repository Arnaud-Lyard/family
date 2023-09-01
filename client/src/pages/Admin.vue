<template>
  <div class="container flex flex-justify-center">
    <div class="editor-bloc">
      <Editor v-model="content" />
      <button class="button button-center" :class="drawerActive" @click="test()">Save</button>
    </div>
    <ArticleAdmin />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Editor from "../components/Editor.vue"
import ArticleAdmin from "../components/ArticleAdmin.vue"
import { useDrawerActive } from "../composables/drawerActive";
const content = ref("")

const test = () => {
  console.log(content.value)
}

const { drawerActive } = useDrawerActive();

</script>