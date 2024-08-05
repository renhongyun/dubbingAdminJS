<template>
  <div class="content">
    <el-button type="primary" @click="handleNewClick" class="newBtn"
      >添加标签</el-button
    >

    <template v-for="(item, index) in tagsByType">
      <div class="item">
        <div class="header">
          <h2 class="title">
            {{ index == 0 ? "情绪标签" : index == 1 ? "类型标签" : "语言标签" }}
          </h2>
        </div>
        <div class="table">
          <el-table :data="item" border stripe>
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="updateTime" label="修改时间" />
            <el-table-column prop="ranking" label="排名" width="200">
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
    </template>
  </div>
</template>
<script setup>
import useTagsStore from "@/store/tag/tag";
import { storeToRefs } from "pinia";
// import { reactive, ref } from 'vue'
import { ElMessage } from "element-plus";

const tagsStore = useTagsStore();
const { tagsByType } = storeToRefs(tagsStore);
tagsStore.fetchAllTagsAction();

const emit = defineEmits(["newClick", "editClick"]);

// 删除
const handleDeleteBtnClick = (id) => {
  tagsStore
    .deleteTagsAction(id)
    .then(() => {
      ElMessage.success("删除成功");
    })
    .catch(() => {
      ElMessage.error("删除失败");
    });
};

//新建
const handleNewClick = () => {
  emit("newClick");
};

//修改
const handleEditBtnClick = (itemData) => {
  emit("editClick", itemData);
};
</script>
<style lang="less" scoped>
.content {
  margin-top: 0px;
  background-color: #f0f2f5;
  text-align: right;
  .newBtn {
    margin-bottom: 15px;
  }
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
