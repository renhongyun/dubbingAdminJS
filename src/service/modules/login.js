import hyRequest from "../request";

export function accountLoginRequest(account) {
  return hyRequest.post({
    url: "/user/login",
    data: account,
  });
}
