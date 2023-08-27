import { defineStore } from "pinia";
import { useProfileQuery } from "../graphql/generated/schema";
import router from "../router/router";

interface State {
  username: string;
}

export const useUserStore = defineStore("user", {
  state: (): State => {
    return {
      username: JSON.parse(localStorage.getItem("username")!),
    };
  },
  getters: {
    getUsername: (state) => state.username,
    isLoggedIn: (state) => {
      return state.username ? true : false;
    },
  },
  actions: {
    login() {
      const { result, onResult } = useProfileQuery();
      onResult(() => {
        this.username = result.value!.profile.username;
        localStorage.setItem("username", JSON.stringify(this.username));
        router.push({ name: "dashboard" });
      });
    },
    logout() {
      this.username = "";
      localStorage.removeItem("username");
      router.push({ name: "login" });
    },
  },
});
