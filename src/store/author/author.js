import {
  getAuthorList,
  searchAuthor,
  addAuthor,
  deleteAuthor,
  updateAuthor,
} from "@/service/main/author/author";
import { defineStore } from "pinia";

const useAuthorStore = defineStore("authorStore", {
  state: () => ({
    authorList: [],
  }),
  actions: {
    async fetchAllAuthorAction() {
      const response = await getAuthorList();
      this.authorList = response.data;
    },

    async addAuthorAction(newAuthor) {
      await addAuthor(newAuthor);
      this.fetchAllAuthorAction();
    },
    async updateAuthorAction(modifiedAuthor) {
      const response = await updateAuthor(modifiedAuthor);
      console.log(response);
      this.fetchAllAuthorAction();
    },
    async deleteAuthorAction(id) {
      await deleteAuthor(id);
      this.fetchAllAuthorAction();
    },
    async searchAuthorAction(id) {
      const response = await searchAuthor(id);

      if (response.data) {
        this.authorList = [];
        this.authorList[0] = response.data;
      } else {
        this.authorList = [];
      }
    },
  },
});

export default useAuthorStore;
