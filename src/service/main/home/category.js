import hyRequest from "@/service/request";

export function getCategories() {
  return hyRequest.get({
    url: "/firstCategory/getFirstCategory",
  });
}

export function updateImg(id, img) {
  return hyRequest.post({
    url: "/firstCategory/updateImg",
    data: { id, img },
  });
}
