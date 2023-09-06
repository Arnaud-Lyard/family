<template>
  <div class="blog">
    <h2>News</h2>
    <div v-for="article in articlesList" :key="article.id" class="blogElement">
      <router-link :to="{ name: 'article', params: { id: article.id } }">
        <h3>{{ article.title }}</h3>
        <p class="blogParagraph" v-html="article.content"></p>
      </router-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useGetAllArticlesQuery } from '../graphql/generated/schema';
interface ArticleRegistered {
  id: number;
  title: string;
  content: string;
  username: string;

}
const articlesList = ref<ArticleRegistered[]>([]);
const { onResult } = useGetAllArticlesQuery()
onResult(({ data }) => {
  if (data.getAllArticles) {
    articlesList.value = data.getAllArticles.map((article) => {
      return {
        id: article.id,
        title: article.title,
        content: article.content.substring(0, 500) + "...",
        username: article.user.username
      }
    })
  }
})
</script>
