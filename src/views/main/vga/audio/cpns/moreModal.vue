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
              <el-form-item label="一级分类" prop="categoryId">
                <el-select
                  placeholder="请选择一级分类"
                  v-model="formData.categoryId"
                >
                  <el-option label="中文配音" value="1"></el-option>
                  <el-option label="外文配音" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别" prop="sex">
                <el-select placeholder="请选择性别" v-model="formData.sex">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6"></el-col>
            <el-col :span="6"></el-col>
            <el-col :span="6">
              <el-form-item label="分类标签" prop="categoryTagId">
                <el-select
                  placeholder="请选择作品类型标签"
                  v-model="formData.categoryTagId"
                  :disabled="isGroupDisabled"
                >
                  <template v-for="item in tagsByType[1]" :key="item.id">
                    <el-option :value="item.id" :label="item.name" />
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="情绪标签" prop="emotionTagId">
                <el-select
                  placeholder="请选择作品情绪标签"
                  v-model="formData.emotionTagId"
                  :disabled="isGroupDisabled"
                >
                  <template v-for="item in tagsByType[0]" :key="item.id">
                    <el-option :value="item.id" :label="item.name" />
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="语言标签" prop="languageTagId">
                <el-select
                  placeholder="请选择作品语言标签"
                  v-model="formData.languageTagId"
                  :disabled="isLanguageTagDisabled"
                >
                  <template v-for="item in tagsByType[2]" :key="item.id">
                    <el-option :value="item.id" :label="item.name" />
                  </template>
                </el-select>
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
      <div class="box">
        <el-upload
          multiple
          :http-request="customUploadRequest"
          :on-change="handleFileChange"
          :file-list="fileList"
          drag
          action=""
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import { ElForm } from "element-plus";
import { ElMessage } from "element-plus";

import useFileUploadStore from "@/store/file/file";
import useAudioStore from "@/store/main/vga/audio";
import useTagStore from "@/store/tag/tag";

const fileUploadStore = useFileUploadStore();
// const { uploadStatus, uploadedFileUrl } = storeToRefs(fileUploadStore);

const audioStore = useAudioStore();
const tagStore = useTagStore();
const { tagsByType } = storeToRefs(tagStore);

const centerDialogVisible = ref(false);
const formData = reactive({
  categoryId: "",
  sex: "",
  emotionTagId: "",
  categoryTagId: "",
  languageTagId: "",
  files: [],
});

const formRef = ref(null);
const selectedFiles = ref([]);
const fileList = ref([]);

const isLanguageTagDisabled = ref(false);
const isGroupDisabled = ref(false);

watch(
  () => formData.categoryId,
  (newValue) => {
    if (newValue === "1") {
      isLanguageTagDisabled.value = true;
      formData.languageTagId = "";
      isGroupDisabled.value = false;
    } else if (newValue === "2") {
      isLanguageTagDisabled.value = false;
      isGroupDisabled.value = true;
      formData.categoryTagId = "";
      formData.emotionTagId = "";
    }
  }
);

const setModalVisible = () => {
  centerDialogVisible.value = true;
};

const handleFileChange = (file, fileList) => {
  selectedFiles.value = fileList.map((file) => file.raw);
};

const customUploadRequest = async (options) => {
  const { file } = options;
  await fileUploadStore.uploadFileAction(file, "audio");
  if (fileUploadStore.uploadStatus === "success") {
    fileList.value.push({
      name: file.name,
      url: fileUploadStore.uploadedFileUrl,
    });
  } else {
    console.error("文件上传失败:", file.name);
  }
};

const cancelClick = () => {
  centerDialogVisible.value = false;
  formRef.value?.resetFields();
  fileList.value = [];
};

const confirmClick = async () => {
  if (fileList.value.length === 0) {
    ElMessage.error("请选择文件");
    return;
  }

  if (fileUploadStore.uploadStatus === "success") {
    formData.files = fileList.value.map((file) => ({
      name: file.name,
      url: file.url,
    }));
    ElMessage.success("添加成功");
    try {
      await audioStore.addAudioAction(formData);
      centerDialogVisible.value = false;
      formRef.value?.resetFields();
      fileList.value = [];
    } catch (error) {
      console.error("添加失败:", error);
      ElMessage.error("添加失败，请重试。");
    }
  } else {
    ElMessage.error("上传失败，请重试.");
  }
};

defineExpose({
  setModalVisible,
});
</script>

<style lang="less" scoped>
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
</style>
