<template>
  <div class="content">
    <div class="item">
      <div class="header">
        <h2 class="title">记录列表</h2>
      </div>
      <div class="table">
        <el-table :data="recordList" border stripe>
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="名字" width="160" />
          <el-table-column prop="number" label="开奖数字" width="100" />
          <el-table-column prop="createTime" label="创建时间" />
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
import { useRecordStore } from "@/stores/record.js";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";

const recordStore = useRecordStore();
const { recordList } = storeToRefs(recordStore);
recordStore.fetchRecordListAction();

const emit = defineEmits(["editClick"]);

// 删除
const handleDeleteBtnClick = (id) => {
  recordStore
    .deleteRecordAction(id)
    .then(() => {
      ElMessage.success("删除成功");
    })
    .catch(() => {
      ElMessage.error("删除失败");
    });
};

// 修改
const handleEditBtnClick = (itemData) => {
  emit("editClick", itemData);
};
</script>

<style lang="less" scoped>
.content {
  background-color: #f0f2f5;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.item {
  .header {
    display: flex;
    justify-content: space-between;
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
