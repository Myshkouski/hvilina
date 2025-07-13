import Cookies from "universal-cookie";

export function clearCookie(name: string) {
  const cookies = new Cookies()
  cookies.remove(name)
}
