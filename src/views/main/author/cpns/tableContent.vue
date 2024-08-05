<template>
  <div class="content">
    <div class="item">
      <div class="header">
        <h2 class="title">配音老师列表</h2>
        <el-button type="primary" @click="handleNewClick"
          >添加配音老师</el-button
        >
      </div>
      <div class="table">
        <el-table :data="authorList" border stripe>
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="sex" label="性别" width="200">
            <template #default="scope">
              {{ scope.row.sex === 0 ? "女" : "男" }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="280">
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
import useAuthorStore from "@/store/author/author";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";

const authorStore = useAuthorStore();
const { authorList } = storeToRefs(authorStore);
authorStore.fetchAllAuthorAction();

const fetchListData = () => {
  authorStore.fetchAllAuthorAction();
};

const emit = defineEmits(["newClick", "editClick"]);

const searchAuthor = (formData) => {
  authorStore.searchAuthorAction(formData.id);
};

// 删除
const handleDeleteBtnClick = (id) => {
  authorStore
    .deleteAuthorAction(id)
    .then(() => {
      ElMessage.success("删除成功");
    })
    .catch(() => {
      ElMessage.error("删除失败");
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

defineExpose({
  fetchListData,
  searchAuthor,
  // newData
});
</script>
<style lang="less" scoped>
.content {
  margin-top: 20px;
  background-color: #f0f2f5;
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
