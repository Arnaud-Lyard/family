<template>
  <div class="container flex flex-justify-center">
    <div class="editor-bloc">
      <Editor v-model:model-value="articleContent" />
      <form class="admin" :class="drawerActive">
        <label for="password">Title :</label>
        <input @keyup="validateTitle(); validateTitle()" @blue="validateTitle()" v-model.trim="title" type="text"
          name="title" id="title" required>
        <button type="submit" class="button button-center" :disabled="isButtonDisabled" @click="submitForm">Create new
          article</button>
        <button class="button button-center ml-s" @click="reinitArticle()">Reset</button>
        <div class="error regular">{{ errorSaveArticle }}</div>
        <div class="success regular">{{ successSaveArticle }}</div>
      </form>
    </div>
    <ArticleAdmin :articles-list="articlesList" @select-article="changeArticle" @update-article="updateArticle" />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import Editor from "../components/Editor.vue"
import ArticleAdmin from "../components/ArticleAdmin.vue"
import { useDrawerActive } from "../composables/drawerActive";
import { useSaveArticleMutation, useGetArticleByIdForAdminQuery } from "../graphql/generated/schema"
import { useGetAdminArticlesQuery } from "../graphql/generated/schema";
import { useUpdateArticleMutation } from "../graphql/generated/schema";

interface ArticleRegistered {
  id: number;
  title: string;
  content: string;
}
const articleContent = ref<string>("");
const title = ref<string>("");
const errorSaveArticle = ref("")
const successSaveArticle = ref("")
const articlesList = ref<ArticleRegistered[]>([]);
const isArticleExist = ref(false);

const validateTitle = () => {
  errorSaveArticle.value = title.value === "" ? "The title is required." : "";
};

const submitForm = () => {
  if (!errorSaveArticle.value) {
    const { mutate: sendSaveArticleMutation, onDone } = useSaveArticleMutation({
      variables: {
        data: {
          title: title.value,
          content: articleContent.value
        }
      }
    });
    sendSaveArticleMutation();
    articleContent.value = "";
    title.value = "";
    onDone(({ errors }) => {
      if (errors && errors[0].message === "INTERNAL_SERVER_ERROR") {
        errorSaveArticle.value = "Error, please try again later.";
      } else {
        successSaveArticle.value = "Article saved successfully.";
        sendGetAdminArticlesQuery();
        setTimeout(() => {
          successSaveArticle.value = "";
        }, 5000);
      }
    })
  }
}

const { onResult, refetch: sendGetAdminArticlesQuery } = useGetAdminArticlesQuery();
onResult(({ data }) => {
  if (data?.getAdminArticles) {
    articlesList.value = data.getAdminArticles
  }
});

function changeArticle(id: number) {
  isArticleExist.value = true;
  const { onResult } = useGetArticleByIdForAdminQuery({
    data: {
      id
    }
  });
  onResult(({ data }) => {
    if (data?.getArticleByIdForAdmin) {
      articleContent.value = data.getArticleByIdForAdmin.content
      title.value = data.getArticleByIdForAdmin.title
    }
  });
}

function reinitArticle() {
  isArticleExist.value = false;

  articleContent.value = "";
  title.value = "";
}

function updateArticle(id: number) {
  const { mutate: sendUpdateArticleMutation } = useUpdateArticleMutation({
    variables: {
      data: {
        id,
        title: title.value,
        content: articleContent.value
      }
    }
  });
  sendUpdateArticleMutation();
  sendGetAdminArticlesQuery();
}
const isButtonDisabled = computed(() => {
  return title.value === "" && articleContent.value === "";
});

const { drawerActive } = useDrawerActive();

</script>