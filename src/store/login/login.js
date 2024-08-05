import { defineStore } from "pinia";
import { accountLoginRequest } from "@/service/login/login";
import { ref, computed, nextTick } from "vue";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

export const useLoginStore = defineStore("login", () => {
  const loginResult = ref();
  const router = useRouter();

  // 检查是否已登录
  const isLoggedIn = computed(() => {
    const loginStatus = Cookies.get("loginStatus");
    return !!loginStatus;
  });

  const loginAccountAction = async (account) => {
    try {
      const response = await accountLoginRequest(account);
      loginResult.value = response;

      if (response.code === 0) {
        // 设置 Cookie，有效期为 7 天
        Cookies.set("loginStatus", "true", { expires: 7 });

        // 使用 nextTick 确保状态更新后再进行跳转
        await nextTick();
        router.push({ path: "/main/home/carousel", force: true });
      }

      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    loginResult.value = null;
    Cookies.remove("loginStatus");
  };

  const checkLoginStatus = () => {
    const loginStatus = Cookies.get("loginStatus");
    if (loginStatus && !loginResult.value) {
      loginResult.value = { code: 0 };
    }
  };

  return {
    loginAccountAction,
    loginResult,
    isLoggedIn,
    logout,
    checkLoginStatus,
  };
});
