import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import { useUserStore } from "../store";
import Dashboard from "../pages/Dashboard.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Profile from "../pages/Profile.vue";
import Admin from "../pages/Admin.vue";
import SuperAdmin from "../pages/SuperAdmin.vue";
import Article from "../pages/Article.vue";
import Player from "../pages/Player.vue";

const routes = [
  { path: "/", component: Home, name: "home" },
  {
    path: "/profile",
    component: Profile,
    name: "profile",
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    component: Admin,
    name: "admin",
    meta: { requiresAuth: true },
  },
  {
    path: "/superadmin",
    component: SuperAdmin,
    name: "superadmin",
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    component: Dashboard,
    name: "dashboard",
    meta: { requiresAuth: true },
  },
  {
    path: "/player/:id",
    component: Player,
    name: "player",
    meta: { requiresAuth: true },
  },
  { path: "/login", component: Login, name: "login" },
  { path: "/register", component: Register, name: "register" },
  { path: "/article/:id", component: Article, name: "article" },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLoggedIn;
  const isAdmin = userStore.getIsAdmin;
  const isSuperAdmin = userStore.getIsSuperAdmin;
  if (
    to.meta.requiresAuth &&
    !isAdmin &&
    !isSuperAdmin &&
    to.name === "admin"
  ) {
    return {
      name: "home",
    };
  }
  if (to.meta.requiresAuth && !isSuperAdmin && to.name === "superadmin") {
    return {
      name: "admin",
    };
  }
  if (to.meta.requiresAuth && !isLoggedIn && to.name !== "login") {
    return {
      name: "login",
    };
  }
});
export default router;
