import { defineStore } from "pinia";
import {
  getAllTags,
  addTags,
  deleteTags,
  updateTags,
} from "@/service/main/tag/tag";

const useTagsStore = defineStore("tagsStore", {
  state: () => ({
    tagsByType: {
      0: [],
      1: [],
      2: [],
    },
  }),
  actions: {
    async fetchAllTagsAction() {
      const response1 = await getAllTags(0);
      this.tagsByType[0] = response1.data;

      const response2 = await getAllTags(1);
      this.tagsByType[1] = response2.data;
      console.log("类型标签", this.tagsByType[1]);

      const response3 = await getAllTags(2);
      this.tagsByType[2] = response3.data;
      console.log("语言标签", this.tagsByType[2]);

      console.log("标签数据", this.tagsByType);
    },

    async fetchTagsAction(type) {
      const response = await getAllTags(type);
      this.tagsByType[type] = response.data;
    },
    async addTagsAction(newTag) {
      await addTags(newTag);
      // 添加之后更新
      this.fetchAllTagsAction();
    },
    async updateTagsAction(modifiedTag) {
      await updateTags(modifiedTag);
      this.fetchAllTagsAction();
    },
    async deleteTagsAction(id) {
      await deleteTags(id);
      this.fetchAllTagsAction();
    },
  },
});

export default useTagsStore;
