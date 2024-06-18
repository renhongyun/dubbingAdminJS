<template>
  <div class="task">
    <tableContent
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></tableContent>
    <modal ref="modalRef"></modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import tableContent from "./cpns/tableContent.vue";
import modal from "./cpns/modal.vue";

const contentRef = ref(null);
const modalRef = ref(null);

const handleNewClick = () => {
  modalRef.value?.setModalVisible(true);
};

const handleEditClick = (itemData) => {
  modalRef.value?.setModalVisible(false, itemData);
};
</script>

<style lang="less" scoped>
.task {
  overflow: hidden;
  padding: 20px 20px;
  box-sizing: border-box;
}
</style>
