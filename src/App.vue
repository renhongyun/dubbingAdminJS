<template>
  <div class="App">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>
<style lang="less" scoped>
.App {
  background-color: #fff;
  width: 100vw;
  height: 100vh;
}
</style>
