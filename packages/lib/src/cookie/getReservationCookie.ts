import Cookie from "universal-cookie";
import { getCookieName, type GetCookieNameOptions } from "./getCookieName";

export function getReservationCookie(options: GetReservationCookieOptions): GetReservationCookieReturn {
  const cookie = new Cookie();
  const name = getCookieName(options);
  const value = cookie.get(name, { doNotParse: true }) as string | null | undefined;
  return {
    name,
    value
  };
}

export type GetReservationCookieOptions = GetCookieNameOptions
export type GetReservationCookieReturn = {
  readonly name: string
  readonly value: string | null | undefined
}
