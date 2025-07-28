import hex from "hex-encoding"

export function getReservationMetaKey(options: GetReservationMetaKey) {
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

  return "reservation_meta_" + parts.join('_')
}

export type GetReservationMetaKey = {
  origin?: string;
  scope?: string;
}
