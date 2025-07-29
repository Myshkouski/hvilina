import type { LocalTimeSlot, TimePickerItem } from "~/components/timeslot-dialog/TimePicker.vue";

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
