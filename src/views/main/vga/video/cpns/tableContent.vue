<template>
  <div class="content">
    <div class="header">
      <h2 class="title">视频列表</h2>
      <el-button type="primary" @click="handleMoreClick">添加</el-button>
    </div>
    <div class="table">
      <el-table :data="videoList" border stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="cover" label="封面">
          <template #default="scope">
            <img :src="scope.row.cover" alt="" class="cover" />
          </template>
        </el-table-column>

        <el-table-column prop="url" label="地址" width="230">
          <template #default="scope">
            <a :href="scope.row.url" target="_blank" class="url">{{
              scope.row.url
            }}</a>
          </template>
        </el-table-column>

        <el-table-column prop="sex" label="性别">
          <template #default="scope">
            {{ scope.row.sex ? "男" : "女" }}
          </template>
        </el-table-column>

        <el-table-column prop="languageId" label="语言标签" width="100">
          <template #default="scope">
            {{ getTagName(scope.row.languageId, tagsByType[2]) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="180">
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
<script setup>
import useVideoStore from "@/store/main/vga/video";
import { storeToRefs } from "pinia";
// import type { IUploadVideo } from '@/types'
import useTagStore from "@/store/tag/tag";
import { ElMessage } from "element-plus";

const emit = defineEmits(["editClick", "moreClick"]);

const videoStore = useVideoStore();
const { videoList } = storeToRefs(videoStore);

const fetchListData = () => {
  videoStore.fetchVideoListAction();
};
fetchListData();

// 删除
const handleDeleteBtnClick = (id) => {
  videoStore
    .deleteVideoAction(id)
    .then(() => {
      ElMessage.success("删除成功");
    })
    .catch(() => {
      ElMessage.error("删除失败");
    });
};

//新建
const handleMoreClick = () => {
  console.log("新建");
  emit("moreClick");
};
//修改
const handleEditBtnClick = (itemData) => {
  emit("editClick", itemData);
};

//添加数据
const newData = (formData) => {
  videoStore.addVideoAction(formData);
};

//捆绑tagid和内容
const tagStore = useTagStore();
const { tagsByType } = storeToRefs(tagStore);

const getTagName = (id, tags) => {
  const tag = tags.find((tag) => tag.id === id);
  return tag ? tag.name : "无";
};

defineExpose({
  fetchListData,
  newData,
});
</script>
<style lang="less" scoped>
.content {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  // font-size: 22px;
  align-items: flex-end;
  margin-bottom: 20px;
}
.url {
  color: #409eff;
}
.cover {
  width: 60px;
  // height: 60px;
}
</style>
