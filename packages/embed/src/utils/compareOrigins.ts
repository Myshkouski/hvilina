export function compareOrigins(origin: MaybeURL | undefined, other: MaybeURL | undefined) {
  if (!origin || !other) {
    return false;
  }
  origin = toURL(origin)
  other = toURL(other)
  
  return origin.origin === other.origin;
}

export type MaybeURL = URL | string

function toURL(url: URL | string) {
  if (false == url instanceof URL) {
    url = new URL(url)
  }
  return url
}
