import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import { useUserStore } from "../store";
import Dashboard from "../pages/Dashboard.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";

const routes = [
  { path: "/", component: Home, name: "home" },
  {
    path: "/dashboard",
    component: Dashboard,
    name: "dashboard",
    meta: { requiresAuth: true },
  },
  { path: "/connexion", component: Login, name: "login" },
  { path: "/inscription", component: Register, name: "register" },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLoggedIn;
  console.log("islogged", isLoggedIn);

  if (to.meta.requiresAuth && !isLoggedIn && to.name !== "login") {
    return {
      name: "login",
    };
  }
});
export default router;
