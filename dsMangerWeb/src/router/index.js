import { createRouter, createWebHistory } from "vue-router";
import mainDashboard from '@/views/main/dashboard/index.vue';
import mainLayout from '@/views/main/layout/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      redirect: "/main",
    },
    {
      path: "/index",
      name: "indexPage",
      component: () => import("../views/index.vue"),
    },
    {
      path: "/main",
      name: "main",
      component: mainLayout,
      redirect: "dashboard",
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: mainDashboard
        },
        {
          path: "dataSource",
          name: "dataSource",
          component: () => import('@/views/main/dataSource/index.vue')
        },
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
