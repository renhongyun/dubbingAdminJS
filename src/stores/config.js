import { defineStore } from "pinia";
import { getConfigInfo, updateConfigInfo } from "@/service";
import { ref } from "vue";

export const useConfigStore = defineStore("config", () => {
  const configInfo = ref({});
  const fetchConfigInfoAction = async () => {
    const res = await getConfigInfo();
    configInfo.value = res.data;
    console.log(configInfo.value);
  };

  const updateConfigInfoAction = async (modifiedConfig) => {
    const res = await updateConfigInfo(modifiedConfig);
    console.log(res);
    fetchConfigInfoAction();
  };

  return {
    configInfo,
    fetchConfigInfoAction,
    updateConfigInfoAction,
  };
});
