import type { ComponentProps } from "~/types/ComponentProps"
import type { LocalTimeSlot } from "./TimePicker.vue"
import type { TimeSlotDialogTrigger } from "./dialog"

type TimeSlotDialogTriggerProps = ComponentProps<typeof TimeSlotDialogTrigger>

export type TimeSlotDialogProps = {
  timeSlots?: LocalTimeSlot[]
} & Pick<TimeSlotDialogTriggerProps, "disabled">
