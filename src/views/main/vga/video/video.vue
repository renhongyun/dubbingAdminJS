<template>
  <div class="audio">
    <table-content
      ref="contentRef"
      @edit-click="handleEditClick"
      @more-click="handleMoreClick"
    ></table-content>
    <modal ref="modalRef" @add-click="handleAddClick"></modal>
    <more-modal ref="moreModalRef"></more-modal>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
// import useAudioStore from '@/store/main/vga/audio'

import tableContent from "./cpns/tableContent.vue";
import modal from "./cpns/modal.vue";
import useTagsStore from "@/store/tag/tag";
import moreModal from "./cpns/moreModal.vue";

const contentRef = ref();
const moreModalRef = ref();

const modalRef = ref();

const handleAddClick = (formData) => {
  contentRef.value?.newData(formData);
};
const handleEditClick = (itemData) => {
  modalRef.value?.setModalVisible(itemData);
};

const handleMoreClick = () => {
  moreModalRef.value?.setModalVisible();
};

const tagsStore = useTagsStore();
onMounted(async () => {
  await tagsStore.fetchAllTagsAction();
});
</script>
<style lang="less" scoped>
.audio {
  border-radius: 8px;
  overflow: hidden;
}
</style>
