<template>
  <div>
    <el-dialog
      v-model="centerDialogVisible"
      title="添加"
      width="500"
      center
      class="modal"
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" ref="formRef">
          <el-row :gutter="15">
            <el-col :span="6">
              <el-form-item label="性别" prop="sex">
                <el-select placeholder="请选择性别" v-model="formData.sex">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="name" label="名称">
                <el-input placeholder="请输入视频名称" v-model="formData.name">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="语言标签" prop="languageId">
                <el-select
                  placeholder="请选择作品语言标签"
                  v-model="formData.languageId"
                >
                  <template v-for="item in tagsByType[2]" :key="item.id">
                    <el-option :value="item.id" :label="item.name" />
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="封面上传" prop="cover">
                <el-upload
                  :http-request="uploadCover"
                  :on-success="handleCoverUploadSuccess"
                  :file-list="coverFileList"
                  drag
                  action=""
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    将封面拖到此处，或<em>点击上传</em>
                  </div>
                  <!-- <template v-slot:tip> -->
                  <div class="el-upload__tip">(建议比例16:9)</div>
                  <!-- </template> -->
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="视频上传" prop="url">
                <el-upload
                  :http-request="uploadVideo"
                  :on-success="handleVideoUploadSuccess"
                  :file-list="videoFileList"
                  drag
                  action=""
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    将视频拖到此处，或<em>点击上传</em>
                  </div>
                  <div class="el-upload__tip">(建议比例16:9)</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
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
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import { ElForm } from "element-plus";
import useFileUploadStore from "@/store/file/file";
import useVideoStore from "@/store/main/vga/video";
import useTagStore from "@/store/tag/tag";
import { ElMessage } from "element-plus";

const fileUploadStore = useFileUploadStore();
// const { uploadStatus, uploadedFileUrl } = storeToRefs(fileUploadStore);

const videoStore = useVideoStore();
const tagStore = useTagStore();
const { tagsByType } = storeToRefs(tagStore);

const centerDialogVisible = ref(false);
const formData = reactive({
  name: "",
  sex: "",
  cover: "",
  languageId: "",
  url: "",
});

const formRef = ref();
const coverFileList = ref([]);
const videoFileList = ref([]);

const setModalVisible = () => {
  centerDialogVisible.value = true;
};

const handleCoverUploadSuccess = (response, file) => {
  formData.cover = response.url;
  coverFileList.value = [{ name: file.name, url: response.url }];
};

const handleVideoUploadSuccess = (response, file) => {
  formData.url = response.url;
  videoFileList.value = [{ name: file.name, url: response.url }];
};

const uploadCover = async (options) => {
  const { file } = options;
  await fileUploadStore.uploadFileAction(file, "video");
  if (fileUploadStore.uploadStatus === "success") {
    handleCoverUploadSuccess({ url: fileUploadStore.uploadedFileUrl }, file);
  } else {
    console.error("封面上传失败:", file.name);
  }
};

const uploadVideo = async (options) => {
  const { file } = options;
  await fileUploadStore.uploadFileAction(file, "video");
  if (fileUploadStore.uploadStatus === "success") {
    handleVideoUploadSuccess({ url: fileUploadStore.uploadedFileUrl }, file);
  } else {
    console.error("视频上传失败:", file.name);
  }
};

const cancelClick = () => {
  centerDialogVisible.value = false;
  formRef.value?.resetFields();
  coverFileList.value = [];
  videoFileList.value = [];
};

const confirmClick = async () => {
  if (!formData.cover || !formData.url) {
    alert("请上传封面和视频文件");
    return;
  }
  formData.sex = Number(formData.sex);
  try {
    await videoStore
      .addVideoAction(formData)
      .then(() => {
        ElMessage.success("添加成功");
      })
      .catch(() => {
        ElMessage.error("添加失败");
      });
    centerDialogVisible.value = false;
    formRef.value?.resetFields();
    coverFileList.value = [];
    videoFileList.value = [];
  } catch (error) {
    console.error("添加失败:", error);
    alert("添加失败，请重试。");
  }
};

defineExpose({
  setModalVisible,
});
</script>
<style lang="less" scoped>
.modal {
  // width: 50vw !important;
}
.form {
  padding: 0 20px;
  padding-right: 60px;
}

:deep(.el-dialog) {
  --el-dialog-width: 70vw !important;
  --el-dialog-height: 100vh !important;
}
.box {
  height: 38vh;
  background-color: #f0f8ff;
  border: 2px dashed #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.el-upload__tip {
  position: relative;
  bottom: 18px;
}
</style>
