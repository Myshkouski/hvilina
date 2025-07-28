import type { DateTimeDuration } from "@internationalized/date";
import { serialize } from 'tinyduration'

export function formatDuration(duration: DateTimeDuration) {
  return serialize(duration)
}
