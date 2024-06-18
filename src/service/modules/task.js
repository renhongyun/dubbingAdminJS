import hyRequest from "../request";

export function addTaskRequest(newTask) {
  return hyRequest.post({
    url: "/task/add",
    data: newTask,
  });
}

export function getTaskList() {
  return hyRequest.get({
    url: "/task/list",
  });
}

export function deleteTask(id) {
  return hyRequest.post({
    url: "/task/delete",
    data: { id },
  });
}

export function updateTask(modifiedTask) {
  return hyRequest.post({
    url: "/task/update",
    data: modifiedTask,
  });
}
