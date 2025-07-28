import Cookies from "universal-cookie";
import type { GetReservationCookieOptions } from "./getReservationCookie";
import { getCookieName } from "./getCookieName";

export function clearCookie(options: GetReservationCookieOptions) {
  const cookies = new Cookies()
  const name = getCookieName(options);
  cookies.remove(name)
}
