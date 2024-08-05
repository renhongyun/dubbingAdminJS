import hyRequest from "@/service/request";

export function getCarouselImageList() {
  return hyRequest.get({
    url: `carousel/list`,
  });
}

export function addCarouselImage(newCarosel) {
  return hyRequest.post({
    url: "carousel/add",
    data: newCarosel,
  });
}

export function deleteCarouselImage(id) {
  return hyRequest.post({
    url: "carousel/delete",
    data: { id },
  });
}
