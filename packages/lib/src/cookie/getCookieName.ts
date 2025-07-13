import hex from "hex-encoding"
import { sha256 } from "@myshkouski/web-crypto"

export async function getCookieName(options: GetCookieNameOptions) {
  let parts = [
    options.origin,
    options.scope,
  ]
  
  parts = parts.filter(value => {
    return !!value
  })
  
  parts = parts.map(value => {
    return hex.encodeStr(value as string)
  })

  const hash = await sha256(parts.join('_'))

  return "reservation_id_" + hash
}

export type GetCookieNameOptions = {
  origin?: string;
  scope?: string;
}
