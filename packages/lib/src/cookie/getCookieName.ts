import hex from "hex-encoding"

export function getCookieName(options: GetCookieNameOptions) {
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

  return ["hvilina_reservation_id", ...parts].join('_')
}

export type GetCookieNameOptions = {
  origin?: string;
  scope?: string;
}
