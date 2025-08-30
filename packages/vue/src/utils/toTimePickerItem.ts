import type { TimePickerItem } from "~/components/timeslot-dialog/TimePicker.vue";
import type { LocalTimeSlot } from "~/types/LocalTimeSlot";

export function toTimePickerItem(value: LocalTimeSlot): TimePickerItem {
  return {
    startAt: value.startAt,
    duration: value.duration,
    hour: value.startAt.hour,
    minute: value.startAt.minute,
    performer: value.performer,
    available: value.available
  }
}
