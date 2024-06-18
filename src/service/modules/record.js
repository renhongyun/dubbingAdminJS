import hyRequest from "../request";

export function getRecordList() {
  return hyRequest.get({
    url: "/record/list",
  });
}

export function deleteRecord(id) {
  return hyRequest.post({
    url: "/record/delete",
    data: { id },
  });
}

export function updateRecord(modifiedRecord) {
  return hyRequest.post({
    url: "/record/update",
    data: modifiedRecord,
  });
}
