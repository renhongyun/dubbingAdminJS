import hyRequest from "@/service/request";

export function getAllTags(type) {
  return hyRequest.get({
    url: `/tags/list/${type}`,
  });
}

export function addTags(newTags) {
  return hyRequest.post({
    url: "/tags/add",
    data: newTags,
  });
}

export function deleteTags(id) {
  return hyRequest.post({
    url: "/tags/delete",
    data: { id },
  });
}

export function updateTags(modifiedTag) {
  return hyRequest.post({
    url: "/tags/update",
    data: modifiedTag,
  });
}
