import { defineStore } from "pinia";
import { addTaskRequest, getTaskList, deleteTask, updateTask } from "@/service";
import { ref } from "vue";
export const useTaskStore = defineStore("task", () => {
  const taskList = ref([]);
  const fetchTaskListAction = async () => {
    const res = await getTaskList();
    taskList.value = res.data;
    // console.log(taskList.value);
  };

  const addTaskAction = async (newTask) => {
    await addTaskRequest(newTask);
    fetchTaskListAction();
  };

  const deleteTaskAction = async (id) => {
    const res = await deleteTask(id);
    console.log(res);
    fetchTaskListAction();
  };

  const updateTaskAction = async (modifiedTask) => {
    const res = await updateTask(modifiedTask);
    console.log(res);
    fetchTaskListAction();
  };

  return {
    taskList,
    fetchTaskListAction,
    addTaskAction,
    deleteTaskAction,
    updateTaskAction,
  };
});
