import type { ExtractSlotProps } from "~/types/ExtractSlotProps"
import TimeSlotDialogBase from "./Root.vue"

export function delegateTriggerSlotProps(props: DelegatedTriggerSlotProps) {
  return {
    disabled: props.disabled,
    reservationId: props.reservationId,
    period: props.period,
    openDialog() {
      props.setDialogOpen(true)
    }
  }
}

type DefaultSlotProps = ExtractSlotProps<typeof TimeSlotDialogBase, "default">

export type DelegatedTriggerSlotProps = Pick<DefaultSlotProps, "disabled" | "reservationId" | "period" | "setDialogOpen">
