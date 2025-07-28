import { InternalServiceError, InvalidRequestInfo, InvalidResponseInfo } from "./getReservation.spec";

export async function handleResponse<T = any>(response: Response) {
  let body: any;
  let error: any | undefined;

  try {
    body = await response.json();
  } catch (e) {
    error = e;
  }

  if (response.status >= 500) {
    throw new InternalServiceError(response.statusText);
  }

  if (response.status >= 400) {
    throw new InvalidRequestInfo(response.statusText, body);
  }

  if (!body) {
    throw new InvalidResponseInfo(body, { cause: error });
  }

  return body.data as T;
}
