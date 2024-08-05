<template>
  <div class="audio">
    <tableContent ref="contentRef" @more-click="handleMoreClick"></tableContent>

    <moreModal ref="moreModalRef"></moreModal>
  </div>
</template>
<script setup>
import { ref } from "vue";

import tableContent from "./cpns/tableContent.vue";
import moreModal from "./cpns/moreModal.vue";

const contentRef = ref(null);
const moreModalRef = ref(null);

const handleMoreClick = () => {
  moreModalRef.value?.setModalVisible();
};
</script>
<style lang="less" scoped>
.audio {
  border-radius: 8px;
  overflow: hidden;
}
</style>
