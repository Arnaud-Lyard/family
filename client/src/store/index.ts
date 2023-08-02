import { defineStore } from "pinia";
import { useProfileQuery } from "../graphql/generated/schema";

interface State {
  username: string;
}

export const useUserStore = defineStore("user", {
  state: (): State => {
    return {
      username: "",
    };
  },
  getters: {
    getUserUsername(state) {
      return state.username;
    },
  },
  actions: {
    async userProfile() {
      const { result, onResult } = useProfileQuery();
      onResult(() => {
        this.username = result.value!.profile.username;
      });
    },
  },
});
