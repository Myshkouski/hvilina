import { CalendarDate, CalendarDateTime, DateFormatter, fromDate, getLocalTimeZone, parseDuration, Time, toCalendarDate, toTime, ZonedDateTime, type DateTimeDuration } from "@internationalized/date"

export interface Interval {
  startAt: ZonedDateTime
  duration: DateTimeDuration
}

export function formatTimeSlot(value: Interval, dateFormatter: DateFormatter | undefined) {
  if (!dateFormatter) return

  const start = value.startAt
  const end = start.add(value.duration)

  return format(start, end, dateFormatter)
}

export function formatPeriodWithDuration(start: Date, duration: string, dateFormatter: DateFormatter | undefined) {
  if (!dateFormatter) return

  const tz = getLocalTimeZone()

  const from = fromDate(start, tz)
  const d = parseDuration(duration)
  const to = from.add(d)
  return format(
    from,
    to,
    dateFormatter
  )
}

export function formatPeriod(start: Date, end: Date, dateFormatter: DateFormatter | undefined) {
  if (!dateFormatter) return

  const tz = getLocalTimeZone()
  return format(
    fromDate(start, tz), 
    fromDate(end, tz), 
    dateFormatter
  )
}

function format(
  start: ZonedDateTime | CalendarDateTime, 
  end: ZonedDateTime | CalendarDateTime, 
  dateFormatter: DateFormatter
) {
  const startDate = toCalendarDate(start)
  const startTime = toTime(start)
  const endDate = toCalendarDate(end)
  const endTime = toTime(end)

  if (startDate.compare(endDate)) {
    return `${formatDate(startDate, dateFormatter)} ${formatTime(startTime)} - ${formatDate(endDate, dateFormatter)} ${formatTime(endTime)}`
  }

  return `${formatDate(startDate, dateFormatter)} ${formatTime(startTime)} - ${formatTime(endTime)}`
}

function formatDate(value: CalendarDate, dateFormatter: DateFormatter) {
  return dateFormatter.format(value.toDate(getLocalTimeZone()))
}

function formatTime(value: Time) {
  return [value.hour, value.minute].map(value => {
    return value.toString().padStart(2, "0")
  }).join(":")
}
