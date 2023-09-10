import { defineStore } from "pinia";
import { useProfileQuery } from "../graphql/generated/schema";
import router from "../router/router";

interface State {
  username: string;
  role: string;
  isPlayer: boolean;
  themeLight: string;
  themeDark: string;
}

export const useUserStore = defineStore("user", {
  state: (): State => {
    return {
      username: JSON.parse(localStorage.getItem("user")!),
      role: JSON.parse(localStorage.getItem("role")!),
      themeLight: JSON.parse(localStorage.getItem("light-theme")!),
      themeDark: JSON.parse(localStorage.getItem("dark-theme")!),
      isPlayer: JSON.parse(localStorage.getItem("is-player")!),
    };
  },
  getters: {
    getUsername: (state) => state.username,
    isLoggedIn: (state) => {
      return state.username ? true : false;
    },
    getIsAdmin: (state) => {
      return state.role === "admin" ? true : false;
    },
    getIsSuperAdmin: (state) => {
      return state.role === "superadmin" ? true : false;
    },
    getIsPlayer: (state) => {
      return state.isPlayer;
    },
    getIsLightTheme: (state) => {
      return state.themeLight === "light-theme" ? true : false;
    },
    getIsDarkTheme: (state) => {
      return state.themeDark === "dark-theme" ? true : false;
    },
  },
  actions: {
    login() {
      const { onResult } = useProfileQuery();
      onResult(({ data }) => {
        this.username = data.profile.username;
        this.role = data.profile.role;
        this.isPlayer = data.profile.profile.isPlayer ? true : false;
        localStorage.setItem("user", JSON.stringify(this.username));
        localStorage.setItem("role", JSON.stringify(this.role));
        localStorage.setItem("is-player", JSON.stringify(this.isPlayer));
        router.push({ name: "dashboard" });
      });
    },
    logout() {
      this.username = "";
      localStorage.removeItem("user");
      router.push({ name: "login" });
    },
    enablePlayer(isPlayer: boolean) {
      this.isPlayer = isPlayer ? true : false;
      localStorage.setItem("is-player", JSON.stringify(this.isPlayer));
    },
    enableLightTheme() {
      localStorage.setItem("light-theme", JSON.stringify("light-theme"));
      localStorage.removeItem("dark-theme");
    },
    enableDarkTheme() {
      localStorage.setItem("dark-theme", JSON.stringify("dark-theme"));
      localStorage.removeItem("light-theme");
    },
  },
});
