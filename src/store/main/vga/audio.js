import {
  getAudioList,
  addAudio,
  deleteAudio,
  updateAudio,
} from "@/service/main/vga/audio";
import { defineStore } from "pinia";

const useAudioStore = defineStore("audioStore", {
  state: () => ({
    audioList: [],
  }),
  actions: {
    async fetchAllAudioAction(audioList) {
      const response = await getAudioList(audioList);
      this.audioList = response.data;
      console.log("音频列表", this.audioList);
    },
    async addAudioAction(newAudio) {
      const response = await addAudio(newAudio);
      console.log(response);
      this.fetchAllAudioAction({});
    },
    async updateAudioAction(modifiedAudio) {
      const response = await updateAudio(modifiedAudio);
      console.log(response);

      this.fetchAllAudioAction({});
    },
    async deleteAudioAction(id) {
      const response = await deleteAudio(id);
      console.log(response);

      this.fetchAllAudioAction({});
    },
  },
});

export default useAudioStore;
