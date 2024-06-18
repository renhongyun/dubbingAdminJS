import { createRouter, createWebHistory } from "vue-router";
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/main/task",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/loginPage.vue"),
    },
    {
      path: "/main",
      name: "main",
      component: () => import("@/views/Main.vue"),
      children: [
        {
          path: "/main/task",
          name: "task",
          component: () => import("@/views/task/taskPage.vue"),
        },
        {
          path: "/main/record",
          name: "record",
          component: () => import("@/views/record/recordPage.vue"),
        },
        {
          path: "/main/config",
          name: "config",
          component: () => import("@/views/config/configPage.vue"),
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const loginStore = useLoginStore();
  const { isLoggedIn } = storeToRefs(loginStore);

  // 检查登录状态
  await loginStore.checkLoginStatus();

  if (to.path.startsWith("/main") && !isLoggedIn.value) {
    next({ path: "/login" });
  } else {
    next();
  }
});

export default router;
