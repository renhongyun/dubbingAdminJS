<template>
  <div class="audio">
    <search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></search>
    <tableContent
      ref="contentRef"
      @edit-click="handleEditClick"
      @more-click="handleMoreClick"
    ></tableContent>
    <modal ref="modalRef" @add-click="handleAddClick"></modal>
    <moreModal ref="moreModalRef"></moreModal>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
// import useAudioStore from '@/store/main/vga/audio'
import search from "./cpns/search.vue";
import tableContent from "./cpns/tableContent.vue";
import modal from "./cpns/modal.vue";
// import IUploadAudio from "@/types/audio.ts";
import useTagsStore from "@/store/tag/tag";
import moreModal from "./cpns/moreModal.vue";

const contentRef = ref();
const moreModalRef = ref();

const handleQueryClick = (formData) => {
  contentRef.value?.fetchListData(formData);
};

const handleResetClick = () => {
  contentRef.value?.fetchListData({});
};
//封装modal
const modalRef = ref();
// const handleNewClick = () => {
//   modalRef.value?.setModalVisible(true)
// }

//添加数据
const handleAddClick = (formData) => {
  contentRef.value?.newData(formData);
};
const handleEditClick = (itemData) => {
  modalRef.value?.setModalVisible(itemData);
};

const handleMoreClick = () => {
  moreModalRef.value?.setModalVisible();
};

//加载标签
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
