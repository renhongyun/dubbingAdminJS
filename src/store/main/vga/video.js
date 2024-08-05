import {
  getVideoList,
  addVideo,
  deleteVideo,
  updateVideo,
} from "@/service/main/vga/video";
import { defineStore } from "pinia";

const useVideoStore = defineStore("videoStore", {
  state: () => ({
    videoList: [],
  }),
  actions: {
    async fetchVideoListAction() {
      const response = await getVideoList();
      this.videoList = response.data;
      console.log("视频列表", this.videoList);
    },
    async addVideoAction(newVideo) {
      const response = await addVideo(newVideo);
      console.log(response);
      this.fetchVideoListAction();
    },
    async updateVideoAction(modifiedVideo) {
      console.log("参数", modifiedVideo);
      const response = await updateVideo(modifiedVideo);
      console.log(response);

      this.fetchVideoListAction();
    },
    async deleteVideoAction(id) {
      const response = await deleteVideo(id);
      console.log(response);

      this.fetchVideoListAction();
    },
  },
});

export default useVideoStore;
