import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../components/HomeView.vue"),
    },
    {
      path: "/team",
      name: "team",
      component: () => import("../components/TeamView.vue"),
    },
    {
      path: "/research",
      name: "research",
      component: () => import("../components/ResearchView.vue"),
    },
    {
      path: "/publications",
      name: "publications",
      component: () => import("../components/PublicationsView.vue"),
    },
    {
      path: "/platform",
      name: "platform",
      component: () => import("../components/RobotPlatformView.vue"),
    },
  ],
});

export default router;
