import hyRequest from "@/service/request";

export function getVideoList() {
  return hyRequest.get({
    url: "/video/all",
  });
}

export function addVideo(newVideo) {
  return hyRequest.post({
    url: "/video/add",
    data: newVideo,
  });
}

export function deleteVideo(id) {
  return hyRequest.post({
    url: "/video/delete",
    data: {
      id,
    },
  });
}

export function updateVideo(modifiedVideo) {
  return hyRequest.post({
    url: "/video/update",
    data: modifiedVideo,
  });
}
