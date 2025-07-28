import type { LocalTimeSlot } from "~/components/timeslot-dialog/TimePicker.vue"

export type DialogContentProps = {
  scope?: string
  contractId?: string
  scheduleRequirements?: string[]
  disableConfirm?: boolean
  disableRefresh?: boolean
  pendingRefresh?: boolean
  timeSlots?: LocalTimeSlot[]
}
