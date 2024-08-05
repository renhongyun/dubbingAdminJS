<template>
  <div class="modal">
    <el-dialog
      v-model="centerDialogVisible"
      title="编辑音频"
      width="500"
      center
    >
      <div class="form">
        <div class="el-upload__tip" slot="tip">
          (请确保添加配音老师后再做其他修改)
        </div>
        <el-form :model="formData" label-width="80px" ref="formRef">
          <el-form-item label="名字" prop="name">
            <el-input placeholder="请输入作品名" v-model="formData.name">
            </el-input>
          </el-form-item>
          <el-form-item label="是否推荐" prop="isRecommend">
            <el-select placeholder="请选择" v-model="formData.isRecommend">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
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

          <el-form-item label="配音老师" prop="dubbingActorId">
            <el-select
              placeholder="请选择配音老师"
              v-model="formData.dubbingActorId"
            >
              <template v-for="item in authorList" :key="item.id">
                <el-option :value="item.id" :label="item.name" />
              </template>
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
import { ref, reactive, computed } from "vue";

import useTagStore from "@/store/tag/tag";
import { storeToRefs } from "pinia";
import { ElForm } from "element-plus";
import useAudioStore from "@/store/main/vga/audio";
import useAuthorStore from "@/store/author/author";
import { ElMessage } from "element-plus";
const audioStore = useAudioStore();
// const { audioList } = storeToRefs(audioStore)

const authorStore = useAuthorStore();
const { authorList } = storeToRefs(authorStore);
authorStore.fetchAllAuthorAction();

const centerDialogVisible = ref(false);
const formData = reactive({
  categoryId: "",
  id: "",
  name: "",
  dubbingActorId: "",
  emotionTagId: "",
  categoryTagId: "",
  isRecommend: "",
  languageTagId: "",
  sex: "",
  url: "",
  ranking: "",
});

const formRef = ref(null);

const isLanguageTagDisabled = computed(() => formData.categoryId === 1);
const isGroupDisabled = computed(() => formData.categoryId === 2);

// 相当于是方法拦截，只能改为true，不能改成其他值
const setModalVisible = (itemData) => {
  centerDialogVisible.value = true;
  for (const key in formData) {
    formData[key] = itemData[key];
  }
  formData.isRecommend = formData.isRecommend === 1 ? "是" : "否";
};

const cancelClick = () => {
  centerDialogVisible.value = false;
  formRef.value?.resetFields();
};
const confirmClick = () => {
  centerDialogVisible.value = false;
  formData.categoryId = Number(formData.categoryId);
  formData.isRecommend = Number(formData.isRecommend);
  formData.dubbingActorId = Number(formData.dubbingActorId);

  audioStore
    .updateAudioAction(formData)
    .then(() => {
      ElMessage.success("修改成功");
    })
    .catch(() => {
      ElMessage.error("修改失败");
    });

  formRef.value?.resetFields();
};

// 获取数据
const tagStore = useTagStore();
const { tagsByType } = storeToRefs(tagStore);

defineExpose({
  setModalVisible,
});
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
  padding-right: 60px;
}
.el-upload__tip {
  color: #409eff;
  position: relative;
  bottom: 14px;
  left: 94px;
}
</style>
