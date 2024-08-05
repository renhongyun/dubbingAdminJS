<template>
  <div>
    <el-dialog
      v-model="centerDialogVisible"
      title="添加轮播图"
      width="500"
      center
      class="modal"
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" ref="formRef">
          <el-form-item label="轮播图名" prop="name">
            <el-input placeholder="请输入轮播图名" v-model="formData.name" />
          </el-form-item>
          <el-form-item label="上传图片" prop="url">
            <el-upload
              class="upload-demo"
              drag
              :http-request="customUploadRequest('video')"
              :on-success="handleUploadSuccess('url')"
              :file-list="fileList"
              :limit="1"
              action=""
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将图片拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip">(建议比例8:3)</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="选择视频" prop="videoUrl">
            <el-select placeholder="请选择视频" v-model="formData.videoUrl">
              <el-option
                v-for="video in videoList"
                :key="video.id"
                :label="video.name"
                :value="video.url"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { ElForm } from "element-plus";
import { ElMessage } from "element-plus";

import useFileUploadStore from "@/store/file/file";
import useVideoStore from "@/store/main/vga/video";
import useCarouselStore from "@/store/main/home/carousel";

const fileUploadStore = useFileUploadStore();
// const { uploadStatus, uploadedFileUrl } = storeToRefs(fileUploadStore);

const videoStore = useVideoStore();
const { videoList } = storeToRefs(videoStore);

const carouselStore = useCarouselStore();

const centerDialogVisible = ref(false);
const formData = reactive({
  name: "",
  url: "",
  videoUrl: "",
});

const formRef = ref(null);
const fileList = ref([]);

const setModalVisible = () => {
  centerDialogVisible.value = true;
};

const handleUploadSuccess = (type) => (response, file) => {
  if (type === "url") {
    formData.url = response.url;
  }
};

const customUploadRequest = (type) => async (option) => {
  await fileUploadStore.uploadFileAction(option.file, type);
  if (fileUploadStore.uploadStatus === "success") {
    console.log("上传成功");
    option.onSuccess?.({ url: fileUploadStore.uploadedFileUrl });
  } else {
    option.onError?.(new Error("上传失败"));
  }
};

const cancelClick = () => {
  centerDialogVisible.value = false;
  formRef.value?.resetFields();
  fileList.value = [];
};

const confirmClick = async () => {
  if (!formData.url || !formData.videoUrl) {
    alert("请上传图片并选择视频");
    return;
  }

  try {
    await carouselStore
      .addCarouselImageAction({
        name: formData.name,
        url: formData.url,
        videoUrl: formData.videoUrl,
      })
      .then(() => {
        ElMessage.success("添加成功");
      })
      .catch(() => {
        ElMessage.error("添加失败");
      });
    cancelClick();
  } catch (error) {
    console.error("添加轮播图失败:", error);
  }
};

onMounted(async () => {
  await videoStore.fetchVideoListAction();
});

defineExpose({
  setModalVisible,
});
</script>

<style lang="less" scoped>
.modal {
  .form {
    padding: 0 20px;
    padding-right: 60px;
  }

  :deep(.el-dialog) {
    width: 50vw !important;
  }

  .dialog-footer {
    text-align: right;
  }

  .upload-demo {
    border: 2px dashed #409eff;
    background-color: #f9f9f9;
    padding: 40px 20px;
    text-align: center;

    .el-icon-upload {
      font-size: 32px;
      color: #409eff;
    }

    .el-upload__text {
      margin-top: 10px;
      font-size: 16px;
      color: #606266;

      em {
        color: #409eff;
      }
    }

    .el-upload__tip {
      margin-top: 10px;
      font-size: 14px;
      color: #909399;
    }
  }
}
</style>
