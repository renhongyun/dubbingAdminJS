<template>
  <div class="search">
    <el-form label-width="50px" :model="searchForm" ref="formRef">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="性别" prop="sex">
            <el-select placeholder="请选择性别" v-model="searchForm.sex">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="一级分类" prop="categoryId" label-width="80px">
            <el-select
              placeholder="请选择一级分类"
              v-model="searchForm.categoryId"
            >
              <el-option label="中文配音" value="1"></el-option>
              <el-option label="外文配音" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="配音老师"
            prop="dubbingActorId"
            label-width="90px"
          >
            <!-- <el-input
              placeholder="请输入配音老师id"
              v-model.number="searchForm.dubbingActorId"
            ></el-input> -->
            <el-select
              placeholder="请选择配音老师"
              v-model="searchForm.dubbingActorId"
            >
              <template v-for="item in authorList" :key="item.id">
                <el-option :value="item.id" :label="item.name" />
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="情绪标签" prop="emotionTagId" label-width="80px">
            <el-select
              placeholder="请选择作品情绪标签"
              v-model="searchForm.emotionTagId"
            >
              <template v-for="item in tagsByType[0]" :key="item.id">
                <el-option :value="item.id" :label="item.name" />
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="分类标签"
            prop="categoryTagId"
            label-width="80px"
          >
            <el-select
              placeholder="请选择作品类型标签"
              v-model="searchForm.categoryTagId"
            >
              <template v-for="item in tagsByType[1]" :key="item.id">
                <el-option :value="item.id" :label="item.name" />
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="语言标签"
            prop="languageTagId"
            label-width="80px"
          >
            <el-select
              placeholder="请选择作品语言标签"
              v-model="searchForm.languageTagId"
            >
              <template v-for="item in tagsByType[2]" :key="item.id">
                <el-option :value="item.id" :label="item.name" />
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div class="btns">
            <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
            <el-button icon="Search" type="primary" @click="handleQueryClick"
              >查询</el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import useTagStore from "@/store/tag/tag";
import useAuthorStore from "@/store/author/author";

import { storeToRefs } from "pinia";

const searchForm = reactive({});
const formRef = ref(null);

const tagStore = useTagStore();
const { tagsByType } = storeToRefs(tagStore);
const authorStore = useAuthorStore();
const { authorList } = storeToRefs(authorStore);

const emit = defineEmits(["queryClick", "resetClick"]);

function handleResetClick() {
  formRef.value?.resetFields();
  emit("resetClick");
}

const handleQueryClick = () => {
  emit("queryClick", searchForm);
};
</script>
<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    line-height: 72px;
    margin-left: 50px;
    .el-button {
      height: 36px;
    }
  }
}
</style>
