import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import { useUserStore } from "../store";
import Dashboard from "../pages/Dashboard.vue";

const routes = [{ path: "/", component: Home }];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   const userStore = useUserStore();
//   const authUser = userStore.email;
//   if (to.name === "dashboard" && !authUser) next({ name: "login" });
//   else next();
// });
export default router;
