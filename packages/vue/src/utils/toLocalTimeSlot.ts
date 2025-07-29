import { parseAbsoluteToLocal, parseDuration } from "@internationalized/date";
import type { LocalTimeSlot } from "~/components/timeslot-dialog/TimePicker.vue";
import type { TimeSlotApi } from "~/types/TimeSlotApi";

export function toLocalTimeSlot(timeSlot: TimeSlotApi): LocalTimeSlot {
  return {
    startAt: parseAbsoluteToLocal(timeSlot.start_at),
    duration: parseDuration(timeSlot.duration),
    available: timeSlot.available,
    performer: timeSlot.performer,
  } satisfies LocalTimeSlot;
}
