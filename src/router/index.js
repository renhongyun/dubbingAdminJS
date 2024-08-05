import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { useLoginStore } from "@/store/login/login";
import { storeToRefs } from "pinia";

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/main/home/carousel",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/loginPage.vue"),
    },
    {
      path: "/main",
      component: () => import("@/views/main/Main.vue"),
      children: [
        {
          path: "home/carousel",
          component: () => import("@/views/main/home/carousel/carousel.vue"),
        },
        {
          path: "home/category",
          component: () => import("@/views/main/home/category/category.vue"),
        },
        {
          path: "author",
          component: () => import("@/views/main/author/author.vue"),
        },
        {
          path: "tag",
          component: () => import("@/views/main/tag/tag.vue"),
        },
        {
          path: "vga/audio",
          component: () => import("@/views/main/vga/audio/audio.vue"),
        },
        {
          path: "vga/video",
          component: () => import("@/views/main/vga/video/video.vue"),
        },
      ],
    },
  ],
});
//路由守卫
export default router;

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
