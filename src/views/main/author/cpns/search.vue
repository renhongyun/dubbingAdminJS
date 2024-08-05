<template>
  <div class="search">
    <el-form label-width="50px" :model="searchForm" ref="formRef">
      <el-row :gutter="10" class="flex">
        <el-col :span="6">
          <el-form-item label="配音老师id" prop="id" label-width="100">
            <el-input v-model="searchForm.id"></el-input>
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
const emit = defineEmits(["queryClick", "resetClick"]);

const formRef = ref(null);
const searchForm = reactive({
  id: "",
});

function handleResetClick() {
  formRef.value?.resetFields();
  emit("resetClick");
}

const handleQueryClick = () => {
  if (searchForm.id) {
    emit("queryClick", searchForm);
  }
};
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;
  //   text-align: center;
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
.flex {
  display: flex;
  justify-content: space-between;
}
</style>
