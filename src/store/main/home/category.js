import { getCategories, updateImg } from "@/service/main/home/category";
import { defineStore } from "pinia";

const useCategoryStore = defineStore("categoryStore", {
  state: () => ({
    categoryList: [],
  }),
  actions: {
    async fetchAllCategoryAction() {
      const res = await getCategories();
      this.categoryList = res.data;
    },
    async updateCategoryImgAction(id, img) {
      const res = await updateImg(id, img);
      console.log(res);
      this.fetchAllCategoryAction();
    },
  },
});

export default useCategoryStore;
