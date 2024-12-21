import { createRouter, createWebHistory } from "vue-router";
import mainDashboard from "@/views/main/dashboard/index.vue";
import mainLayout from "@/views/main/layout/index.vue";
import { useRouter, useRoute } from "vue-router";

// const router = useRouter();

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
      redirect: "/main/dashboard",
      beforeEnter: (to, from) => {
        // reject the navigation
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/main/login";
        }
        // return false
      },
      children: [
        {
          path: "dashboard",
          name: "mainDashboardIndex",
          component: mainDashboard,
        },
        {
          path: "data/dataSource",
          name: "dataSource",
          component: () => import("../views/main/data/dataSource/index.vue"),
        },
        {
          path: "data/dataSet",
          name: "dataSet",
          component: () => import("../views/main/data/dataSet/index.vue"),
        },
        {
          path: "data/dataSet/add",
          name: "dataSetAdd",
          component: () => import("../views/main/data/dataSet/add.vue"),
        },
        {
          path: "data/dataChannel",
          name: "dataChannel",
          component: () => import("../views/main/data/dataChannel/index.vue"),
        },
        {
          path: "system",
          name: "system",
          redirect: "system/user",
          children: [
            {
              path: "user",
              name: "systemUser",
              component: () => import("../views/main/system/user/index.vue"),
            }
          ]
        },
      ],
    },
    {
      path: "/main/login",
      name: "mainLogin",
      component: () => import("@/views/main/auth/login.vue"),
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
