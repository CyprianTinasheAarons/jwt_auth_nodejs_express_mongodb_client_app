export default function authHeader() {
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser ? storedUser : "null");
  if (user && user.accessToken) {
    return {
      "x-access-token": user.accessToken,
    };
  } else {
    return {};
  }
}
