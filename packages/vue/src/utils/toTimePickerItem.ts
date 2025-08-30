import type { TimeSlot } from "~/components/timeslot-dialog/TimeSlotDialogTimePicker.vue";
import type { LocalTimeSlot } from "~/types/LocalTimeSlot";

export function toTimePickerItem(value: LocalTimeSlot): TimeSlot {
  return {
    startAt: value.startAt,
    duration: value.duration,
    hour: value.startAt.hour,
    minute: value.startAt.minute,
    performer: value.performer,
    available: value.available
  }
}
