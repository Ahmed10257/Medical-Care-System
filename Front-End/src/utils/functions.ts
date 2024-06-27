
export function isAuth(): boolean {
  return !!localStorage.getItem("token");
}