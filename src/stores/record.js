import { defineStore } from "pinia";
import { getRecordList, deleteRecord, updateRecord } from "@/service";
import { ref } from "vue";

export const useRecordStore = defineStore("record", () => {
  const recordList = ref([]);
  const fetchRecordListAction = async () => {
    const res = await getRecordList();
    recordList.value = res.data;
    console.log(recordList.value);
  };

  const deleteRecordAction = async (id) => {
    const res = await deleteRecord(id);
    console.log(res);
    fetchRecordListAction();
  };

  const updateRecordAction = async (modifiedRecord) => {
    const res = await updateRecord(modifiedRecord);
    console.log(res);
    fetchRecordListAction();
  };

  return {
    recordList,
    deleteRecordAction,
    updateRecordAction,
    fetchRecordListAction,
  };
});
