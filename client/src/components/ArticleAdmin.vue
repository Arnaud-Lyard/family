<template>
  <div class="articleAdmin">
    <li v-for="article in props.articlesList" key="article.id">
      {{ article.title }} <i><font-awesome-icon icon="fa-solid fa-pen" @click="$emit('selectArticle', article.id)" /></i>
      <i><font-awesome-icon icon="fa-solid fa-floppy-disk" @click="$emit('updateArticle', article)" /></i>
      <hr>
    </li>
  </div>
</template>
<script lang="ts" setup>
interface ArticleRegistered {
  id: string;
  title: string;
  content: string;
}

const props = defineProps<{
  articlesList: ArticleRegistered[]
}>()
const emit = defineEmits<{
  selectArticle: [id: string],
  updateArticle: [article: ArticleRegistered]
}>()
</script>