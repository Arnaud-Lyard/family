import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import { useUserStore } from "../store";
import Dashboard from "../pages/Dashboard.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Profile from "../pages/Profile.vue";
import Admin from "../pages/Admin.vue";
import SuperAdmin from "../pages/SuperAdmin.vue";

const routes = [
  { path: "/", component: Home, name: "home" },
  {
    path: "/profil",
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
  if (to.meta.requiresAuth && !isLoggedIn && to.name !== "login") {
    return {
      name: "login",
    };
  }
});
export default router;
