import hyRequest from "../request";

export function getConfigInfo() {
  return hyRequest.get({
    url: "/config/get",
  });
}

export function updateConfigInfo(modifiedConfig) {
  return hyRequest.post({
    url: "config/update",
    data: modifiedConfig,
  });
}
