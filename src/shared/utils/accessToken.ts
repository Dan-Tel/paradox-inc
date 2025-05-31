export function setAccessToken(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function deleteAccessToken() {
  localStorage.removeItem("accessToken");
}
