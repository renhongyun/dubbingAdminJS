<template>
  <div class="category">
    <h2>分类列表</h2>
    <el-table :data="categoryList" border stripe>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="名称" width="120" />
      <el-table-column prop="img" label="封面" width="220">
        <template #default="scope">
          <img
            :src="scope.row.img"
            alt="category image"
            class="category-image"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleEditClick(scope.row)"
            >修改封面</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="editDialogVisible"
      title="修改封面"
      width="400px"
      center
    >
      <div class="upload-container">
        <el-upload
          class="upload-demo"
          drag
          :http-request="customUploadRequest"
          :on-success="handleUploadSuccess"
          :file-list="fileList"
          :limit="1"
          action=""
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">（建议比例1:1）</div>
        </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmEdit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";
import useCategoryStore from "@/store/main/home/category";
import useFileUploadStore from "@/store/file/file";
import { ElMessage } from "element-plus";

const categoryStore = useCategoryStore();
const { categoryList } = storeToRefs(categoryStore);

const fileUploadStore = useFileUploadStore();
const { uploadedFileUrl } = storeToRefs(fileUploadStore);

const editDialogVisible = ref(false);
const fileList = ref([]);
const selectedCategory = reactive({
  id: null,
  name: "",
  img: "",
});

const fetchCategories = async () => {
  await categoryStore.fetchAllCategoryAction();
};

const handleEditClick = (category) => {
  selectedCategory.id = category.id;
  selectedCategory.name = category.name;
  selectedCategory.img = category.img;
  editDialogVisible.value = true;
};

const customUploadRequest = async ({ file }) => {
  await fileUploadStore.uploadFileAction(file, "video");
};

const handleUploadSuccess = () => {
  selectedCategory.img = uploadedFileUrl.value;
};

const confirmEdit = async () => {
  if (selectedCategory.id && selectedCategory.img) {
    await categoryStore
      .updateCategoryImgAction(selectedCategory.id, selectedCategory.img)
      .then(() => {
        ElMessage.success("修改成功");
      })
      .catch(() => {
        ElMessage.error("修改失败");
      });
    editDialogVisible.value = false;
    fileList.value = [];
  }
};
const cancelClick = async () => {
  editDialogVisible.value = false;
  fileList.value = [];
};
onMounted(fetchCategories);
</script>

<style lang="less" scoped>
.category {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
}
.category-image {
  width: 100px;
  height: auto;
}
.upload-container {
  text-align: center;
  margin-bottom: 20px;
}
.upload-demo {
  border: 2px dashed #409eff;
  background-color: #f9f9f9;
  padding: 40px 20px;
}
.dialog-footer {
  width: 100%;
  text-align: right;
}

// :deep(.el-dialog) {
//   --el-dialog-width: 70vw !important;
//   --el-dialog-height: 100vh !important;
// }
</style>
