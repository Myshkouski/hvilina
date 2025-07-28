import { changeReservationRequest, createReservationRequest, type CreateReservationOptions, type Reservation } from "../api"
import { handleResponse } from "../api/handleResponse"
import { clearCookie, getReservationCookie, setReservationCookie, type GetReservationCookieOptions } from "../cookie"

type FetchOptions = {
  fetch?: typeof fetch
}

export type OnTimeslotChangeOptions = FetchOptions & GetReservationCookieOptions & CreateReservationOptions

export async function handleTimeslotChange(options: OnTimeslotChangeOptions) {
  const savedReservationIdCookie = await getReservationCookie({
    origin: options.origin,
    scope: options.scope
  })
  let request: Request
  if (savedReservationIdCookie.value) {
    request = changeReservationRequest({
      baseUrl: options.baseUrl,
      reservation: options.reservation,
      id: savedReservationIdCookie.value
    })
  } else {
    request = createReservationRequest({
      baseUrl: options.baseUrl,
      reservation: options.reservation
    })
  }

  const reservation = await fetchAndHandle(request, {
    fetch: options.fetch
  })

  if (reservation.available) {
    await setReservationCookie({
      origin: options.origin,
      scope: options.scope,
      reservationId: reservation.id,
      expires: new Date(reservation.expire_at!!)
    })
  } else {
    clearCookie({
      origin: options.origin,
      scope: options.scope,
    })
  }
}

export type GetRegistrationOptions = GetReservationCookieOptions & {
  reservation: Reservation
}

async function fetchAndHandle(request: Request, options?: FetchOptions) {
  const fetch = options?.fetch || window.fetch
  const response = await fetch(request)
  return await handleResponse<Reservation & { id: string }>(response)
}
