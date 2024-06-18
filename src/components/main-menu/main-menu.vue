<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 v-if="!isFold" class="title">后台管理系统</h2>
    </div>

    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        router
      >
        <el-menu-item index="/main/task">
          <el-icon><List /></el-icon>
          <template #title>
            <span v-if="!isFold">任务管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/main/record">
          <el-icon><Edit /></el-icon>
          <template #title>
            <span v-if="!isFold">历史记录管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/main/config">
          <el-icon><Setting /></el-icon>
          <template #title>
            <span v-if="!isFold">系统管理</span>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

defineProps({
  isFold: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();
const defaultActive = computed(() => route.path);
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
    margin-right: 15px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
