<template>
  <div class="modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isNewRef ? '添加任务' : '修改任务'"
      width="500"
      center
      :before-close="handleClose"
    >
      <div class="form">
        <el-form
          :model="formData"
          :rules="rules"
          label-width="80px"
          ref="formRef"
        >
          <el-form-item label="任务名称" prop="name">
            <el-input placeholder="请输入任务名称" v-model="formData.name" />
          </el-form-item>
          <el-form-item label="开奖数字" prop="number">
            <el-input placeholder="请输入开奖数字" v-model="formData.number" />
          </el-form-item>
          <el-form-item label="开奖时间" prop="startTime">
            <el-date-picker
              v-model="formData.startTime"
              type="datetime"
              placeholder="选择开始时间"
            />
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
import { ref, reactive } from "vue";
import { useTaskStore } from "@/stores/task";
import { ElMessage } from "element-plus";

const taskStore = useTaskStore();

const centerDialogVisible = ref(false);
const formData = reactive({
  id: null,
  name: "",
  number: "",
  startTime: "",
});
const isNewRef = ref(true);
const formRef = ref(null);

const validateNumber = (rules, value, callback) => {
  if (!value) {
    return callback(new Error("请输入开奖数字"));
  }
  const num = Number(value);
  if (isNaN(num)) {
    return callback(new Error("开奖数字必须是一个数字"));
  }
  if (num < 1 || num > 15) {
    return callback(new Error("开奖数字必须在1到15之间"));
  }
  callback();
};

const rules = {
  name: [{ required: true, message: "请输入任务名称", trigger: "submit" }],
  number: [
    { required: true, message: "请输入开奖数字", trigger: "blur" },
    { validator: validateNumber, trigger: "blur" },
  ],
  startTime: [{ required: true, message: "请输入开奖时间", trigger: "blur" }],
};

const setModalVisible = (isNew, itemData) => {
  isNewRef.value = isNew;
  centerDialogVisible.value = true;

  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key];
    }
  } else {
    for (const key in formData) {
      formData[key] = "";
    }
  }
};

const handleClose = () => {
  formRef.value?.resetFields();
  centerDialogVisible.value = false;
};

const cancelClick = () => {
  handleClose();
};

const confirmClick = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      centerDialogVisible.value = false;
      if (isNewRef.value) {
        taskStore
          .addTaskAction(formData)
          .then(() => {
            ElMessage.success("添加成功");
          })
          .catch(() => {
            ElMessage.Error("添加失败");
          });
      } else {
        taskStore
          .updateTaskAction(formData)
          .then(() => {
            ElMessage.success("修改成功");
          })
          .catch(() => {
            ElMessage.error("修改失败");
          });
      }

      formRef.value?.resetFields();
    } else {
      console.log("error");
      return false;
    }
  });
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
</style>
