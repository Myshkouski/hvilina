export function compareOrigins(origin: URL | undefined, other: URL | undefined) {
  if (!origin || !other) {
    return false;
  }
  return origin.origin === other.origin;
}
