<template>
  <div class="config">
    <h2>系统设置</h2>
    <el-form
      :model="configInfo"
      ref="formRef"
      label-width="120px"
      class="config-form"
    >
      <el-form-item label="页面标题" prop="title">
        <el-input
          v-model="configInfo.title"
          placeholder="请输入标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="记录标题" prop="recordTitle">
        <el-input
          v-model="configInfo.recordTitle"
          placeholder="请输入记录标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="帮助信息" prop="help">
        <el-input
          type="textarea"
          v-model="configInfo.help"
          placeholder="请输入帮助信息"
          :rows="5"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { useConfigStore } from "@/stores/config.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { ElMessage } from "element-plus";

const configStore = useConfigStore();
const { configInfo } = storeToRefs(configStore);
const formRef = ref(null);

configStore.fetchConfigInfoAction();

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      configStore
        .updateConfigInfoAction(configInfo.value)
        .then(() => {
          ElMessage.success("配置更新成功");
        })
        .catch(() => {
          ElMessage.error("配置更新失败");
        });
    }
  });
};

// 重置
const resetForm = () => {
  formRef.value.resetFields();
};
</script>

<style lang="less" scoped>
.config {
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  .config-form {
    max-width: 600px;
    padding-left: 40px;

    .el-form-item {
      margin-bottom: 20px;
    }

    .el-input,
    .el-textarea {
      width: 100%;
    }

    .el-textarea {
      min-height: 150px;
    }
  }
}
</style>
