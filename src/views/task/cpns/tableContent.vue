<template>
  <div class="content">
    <div class="item">
      <div class="header">
        <h2 class="title">任务列表</h2>
        <el-button type="primary" @click="handleNewClick">添加任务</el-button>
      </div>
      <div class="table">
        <el-table :data="taskList" border stripe>
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="名字" width="160" />
          <el-table-column prop="number" label="开奖数字" width="100" />
          <el-table-column prop="startTime" label="开奖时间" />
          <el-table-column prop="createTime" label="创建时间" />
          <el-table-column prop="createTime" label="更新时间" />
          <el-table-column align="center" label="操作" width="240">
            <template #default="scope">
              <el-button
                size="small"
                icon="Edit"
                type="primary"
                text
                @click="handleEditBtnClick(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                size="small"
                icon="Delete"
                type="danger"
                text
                @click="handleDeleteBtnClick(scope.row.id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useTaskStore } from "@/stores/task.js";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";

const taskStore = useTaskStore();
const { taskList } = storeToRefs(taskStore);
taskStore.fetchTaskListAction();

const emit = defineEmits(["newClick", "editClick"]);

// 删除
const handleDeleteBtnClick = (id) => {
  taskStore
    .deleteTaskAction(id)
    .then(() => {
      ElMessage.success("删除成功");
    })
    .catch(() => {
      ElMessage.Error("删除失败");
    });
};

//新建
const handleNewClick = () => {
  console.log("新建");
  emit("newClick");
};

//修改
const handleEditBtnClick = (itemData) => {
  emit("editClick", itemData);
};
</script>
<style lang="less" scoped>
.content {
  // background-color: #fff;
  // padding: 20px;
  // margin-top: 20px;
  background-color: #f0f2f5;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.item {
  .header {
    display: flex;
    justify-content: space-between;
    // font-size: 22px;
    align-items: flex-end;
    margin-bottom: 20px;
  }
  background-color: #fff;
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  box-sizing: border-box;
}
</style>
