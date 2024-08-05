<template>
  <div class="main-menu">
    <!-- 1.logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title">后台管理系统</h2>
    </div>

    <div class="menu">
      <el-menu
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        router
        :default-active="defaultActive"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>主页管理</span>
          </template>
          <el-menu-item index="/main/home/carousel">轮播图管理</el-menu-item>
          <el-menu-item index="/main/home/category">分类管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Service /></el-icon>
            <span>音视频管理</span>
          </template>
          <el-menu-item index="/main/vga/audio">音频管理</el-menu-item>
          <el-menu-item index="/main/vga/video">视频管理</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/main/tag">
          <el-icon><PriceTag /></el-icon>
          <template #title>
            <span>标签管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/main/author">
          <el-icon><UserFilled /></el-icon>
          <template #title>
            <span>配音老师管理</span>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()
const defaultActive = computed(() => route.path)
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
