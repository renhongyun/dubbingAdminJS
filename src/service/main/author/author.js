import hyRequest from "@/service/request";

export function getAuthorList() {
  return hyRequest.get({
    url: `/dubbingActor/getAll`,
  });
}

export function searchAuthor(id) {
  return hyRequest.get({
    url: `/dubbingActor/get/${id}`,
  });
}

export function addAuthor(newAuthor) {
  return hyRequest.post({
    url: "/dubbingActor/add",
    data: newAuthor,
  });
}

export function deleteAuthor(id) {
  return hyRequest.post({
    url: "/dubbingActor/delete",
    data: { id },
  });
}

export function updateAuthor(modifiedAuthor) {
  return hyRequest.post({
    url: "/dubbingActor/update",
    data: modifiedAuthor,
  });
}
