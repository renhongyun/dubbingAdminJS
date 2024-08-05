import { defineStore } from "pinia";
import { uploadFile } from "@/service/file/file";

const useFileUploadStore = defineStore("fileUploadStore", {
  state: () => ({
    uploadStatus: "idle", // 'idle', 'uploading', 'success', 'error'
    uploadedFileUrl: null,
  }),
  actions: {
    async uploadFileAction(file, biz) {
      this.uploadStatus = "uploading";
      try {
        const res = await uploadFile(file, biz);

        console.log("返回数据", res);

        this.uploadStatus = "success";
        this.uploadedFileUrl = res.data.url;
      } catch (error) {
        this.uploadStatus = "error";
        console.error("文件上传失败:", error);
      }
    },
  },
});

export default useFileUploadStore;
