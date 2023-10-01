import { defineStore } from "pinia";
import { useProfileQuery } from "../graphql/generated/schema";
import router from "../router/router";
import { Role } from "../types/state.interface";

interface State {
  username: string;
  roles: string[];
  isPlayer: boolean;
  themeLight: string;
  themeDark: string;
}

export const useUserStore = defineStore("user", {
  state: (): State => {
    return {
      username: JSON.parse(localStorage.getItem("user")!),
      roles: JSON.parse(localStorage.getItem("role")!),
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
      return state.roles ?? false ? state.roles.includes(Role.ADMIN) : true;
    },
    getIsSuperAdmin: (state) => {
      return state.roles ?? false
        ? state.roles.includes(Role.SUPERADMIN)
        : true;
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
        this.roles = data.profile.roles;
        this.isPlayer = data.profile.profile.isPlayer ? true : false;
        localStorage.setItem("user", JSON.stringify(this.username));
        localStorage.setItem("role", JSON.stringify(this.roles));
        localStorage.setItem("is-player", JSON.stringify(this.isPlayer));
        router.push({ name: "dashboard" });
      });
    },
    logout() {
      this.username = "";
      localStorage.removeItem("user");
      localStorage.removeItem("is-player");
      localStorage.removeItem("role");
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
