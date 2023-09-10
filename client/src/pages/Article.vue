<template>
  <div :class="drawerActive" class="container flex flex-justify-center">
    <div class="article">
      <h2>{{ article.title }}</h2>
      <div class="articleContent" v-html="article.content"></div>
    </div>
    <LeaderBoard />
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import LeaderBoard from '../components/LeaderBoard.vue';
import { useDrawerActive } from '../composables/drawerActive';
import { reactive, ref, watch } from 'vue';
import { useGetOneArticleQuery } from '../graphql/generated/schema';

const { drawerActive } = useDrawerActive();

const route = useRoute()

interface ArticleRegistered {
  title: string;
  content: string;
  username: string;
}
const article = reactive<ArticleRegistered>({
  title: "",
  content: "",
  username: ""
})
watch(
  () => route.params.id,
  async newId => {
    fetchUser(newId)
  },
  {
    immediate: true
  }
)
function fetchUser(id: string | string[]) {
  const { onResult } = useGetOneArticleQuery({
    data: {
      id: parseInt(id as string)
    }
  })
  onResult(({ data }) => {
    if (data.getOneArticle) {
      const { title, content, user: { username } } = data.getOneArticle
      article.title = title
      article.content = content
      article.username = username
    }
  })

}
</script>