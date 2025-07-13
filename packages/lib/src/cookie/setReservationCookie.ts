import Cookie from "universal-cookie";
import { getCookieName, type GetCookieNameOptions } from "./getCookieName";

export async function setReservationCookie(options: SetReservationCookieOptions) {
  const cookie = new Cookie();
  const name = await getCookieName(options);
  cookie.set(name, options.reservationId, {
    secure: true,
    expires: options.expires,
  });
  return { name }
}

export type SetReservationCookieOptions = GetCookieNameOptions & {
  reservationId: string
  expires: Date
}
