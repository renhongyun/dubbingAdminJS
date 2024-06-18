<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb"></div>
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HeaderInfo from "./cpn/header-info.vue";

const emit = defineEmits(["foldChange"]);

const isFold = ref(false);
function handleMenuIconClick() {
  isFold.value = !isFold.value;
  emit("foldChange", isFold.value);
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  // box-shadow: 0 9px 0px rgba(0, 0, 0, 0.9);

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
