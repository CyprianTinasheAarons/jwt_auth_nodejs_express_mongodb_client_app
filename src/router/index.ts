import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: () => import("../components/Profile.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../components/BoardAdmin.vue"),
  },
  {
    path: "/mod",
    name: "moderator",
    component: () => import("../components/BoardModerator.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../components/BoardUser.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/home", "/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");
  if (authRequired && !loggedIn) {
    next({ path: "/login" });
  } else {
    next();
  }
});

export default router;
