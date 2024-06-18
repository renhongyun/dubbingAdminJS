<template>
  <div class="record">
    <tableContent ref="contentRef" @edit-click="handleEditClick"></tableContent>
    <modal ref="modalRef"></modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import tableContent from "./cpns/tableContent.vue";
import modal from "./cpns/modal.vue";

const contentRef = ref(null);
const modalRef = ref(null);

const handleEditClick = (itemData) => {
  modalRef.value?.setModalVisible(itemData);
};
</script>

<style lang="less" scoped>
.record {
  overflow: hidden;
  padding: 20px 20px;
  box-sizing: border-box;
}
</style>
