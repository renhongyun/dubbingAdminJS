<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>
<script setup>
import LoginPanel from "./cpns/login-panel.vue";
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: red;
  background-color: #e8f0fe;
  // background-color: rgb(232, 240, 254, 1);
  background: url("../../assets/img/login-bg.svg");
}
</style>
