import {
  getCarouselImageList,
  addCarouselImage,
  deleteCarouselImage,
} from "@/service/main/home/carousel";
import { defineStore } from "pinia";

const useCarouselStore = defineStore("carouselStore", {
  state: () => ({
    imageList: [],
  }),
  actions: {
    async fetchCarouselImageListAction() {
      const response = await getCarouselImageList();
      this.imageList = response;
      console.log("打印轮播图", this.imageList);
    },
    async addCarouselImageAction(newImage) {
      const response = await addCarouselImage(newImage);
      console.log(response);
      this.fetchCarouselImageListAction();
    },
    async deleteCarouselImageAction(id) {
      const response = await deleteCarouselImage(id);
      console.log(response);
      this.fetchCarouselImageListAction();
    },
  },
});

export default useCarouselStore;
