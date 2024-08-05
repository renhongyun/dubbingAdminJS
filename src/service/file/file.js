import hyRequest from "../request";

export function uploadFile(file, biz) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("biz", biz);

  return hyRequest.post({
    url: "/file/upload",
    data: formData,
  });
}
