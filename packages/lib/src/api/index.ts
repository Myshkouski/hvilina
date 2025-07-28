export type URLOptions = {
  baseUrl: string | URL
}

type ReservationOptions = URLOptions & {
  id: string,
}

export type GetReservationOptions = ReservationOptions

function apiUrl(strings: TemplateStringsArray, ...values: any[]) {
  let result = "/api/v1/";

  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += values[i]
    }
  }

  return result;
}

const commonRequestInit = {
  credentials: "same-origin",
} satisfies RequestInit

const upsertRequestInit = {
  ...commonRequestInit,
  headers: {
    "content-type": "application/json"
  }
} satisfies RequestInit

const patchRequestInit = {
  ...upsertRequestInit,
  method: "PATCH"
} satisfies RequestInit

export function getReservationRequest(options: GetReservationOptions) {
  const url = new URL(
    apiUrl`reservations/${options.id}`, 
    options.baseUrl
  )
  return new Request(url, {
    ...commonRequestInit,
    method: "GET",
  })
}

export function createReservationRequest(options: CreateReservationOptions) {
  const url = new URL(
    apiUrl`reservations`, 
    options.baseUrl
  )
  return new Request(url, {
    ...upsertRequestInit,
    method: "POST",
    body: JSON.stringify(options.reservation)
  })
}

export interface UpsertReservationBody {
  start_at: string
  duration: string
  performer: string
}

export type Reservation = UpsertReservationBody & {
  available: boolean
  provider?: string | null
  expire_at?: string | null
}

export type CreateReservationOptions = URLOptions & {
  reservation: UpsertReservationBody
}

export function changeReservationRequest(options: ChangeReservationOptions) {
  const url = new URL(
    apiUrl`reservations/${options.id}`, 
    options.baseUrl
  )

  const payload = {
    action: ReservationPatchActions.CHANGE,
    data: {
      ...options.reservation
    }
  }

  return new Request(url, {
    ...patchRequestInit,
    body: JSON.stringify(payload)
  })
}

export type ChangeReservationOptions = ReservationOptions & {
  reservation: UpsertReservationBody
}

export function confirmReservationRequest(options: ConfirmReservationOptions) {
  const url = new URL(
    apiUrl`reservations/${options.id}`,
    options.baseUrl
  )

  const payload = {
    action: ReservationPatchActions.CONFIRM
  }

  return new Request(url, {
    ...patchRequestInit,
    body: JSON.stringify(payload)
  })
}

export type ConfirmReservationOptions = ReservationOptions & {}

enum ReservationPatchActions {
  CHANGE = "change",
  CONFIRM = "confirm"
}
