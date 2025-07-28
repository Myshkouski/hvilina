import { getReservationRequest } from "."
import { handleResponse } from "./handleResponse"

class DomainError extends Error {
  constructor(
    message?: string, 
    readonly code?: string | number, 
    options?: ErrorOptions
  ) {
    super(message, options)
  }
}

export class InvalidRequestInfo extends DomainError {
  constructor(statusText?: string, body?: any) {
    const code = body?.error?.statusCode
    super("Invalid request.", code, {
      cause: new Error(statusText)
    })
  }
}

export class InvalidResponseInfo extends DomainError {
  constructor(body?: any, options?: ErrorOptions) {
    const code = body?.error?.statusCode
    super("Invalid response.", code, options)
  }
}

export class InternalServiceError extends DomainError {}  

export function isDomainError(error: any) {
  return error instanceof DomainError
}

const request = getReservationRequest({
  id: "263",
  baseUrl: "https://taim-ui-nuxt.alexeimyshkouski.workers.dev"
})

const response = await fetch(request)
const reservation = await handleResponse(response)
console.debug(reservation)
