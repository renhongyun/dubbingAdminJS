import hyRequest from "@/service/request";

export function getAudioList(audioData) {
  return hyRequest.post({
    url: "/audio/list",
    data: audioData,
  });
}

export function addAudio(newAudio) {
  return hyRequest.post({
    url: "/audio/add",
    data: newAudio,
  });
}

export function deleteAudio(id) {
  return hyRequest.post({
    url: "/audio/delete",
    data: {
      id,
    },
  });
}

export function updateAudio(modifiedAudio) {
  return hyRequest.post({
    url: "/audio/update",
    data: modifiedAudio,
  });
}
