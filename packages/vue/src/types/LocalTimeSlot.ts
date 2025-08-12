import type { DateTimeDuration, ZonedDateTime } from "@internationalized/date"

export interface LocalTimeSlot {
  startAt: ZonedDateTime
  duration: DateTimeDuration
  available: boolean
  performer: string
}
