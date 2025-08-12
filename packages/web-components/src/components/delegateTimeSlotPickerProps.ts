import type { TimeSlotPickerProps } from "@hvilina/vue";
import type { Props as TimeSlotPickerRootProps } from "./TimeSlotPicker.ce.vue"

export function delegateTimeSlotPickerProps(props: TimeSlotPickerRootProps) {
  return {
    baseUrl: props.baseUrl,
    disabled: props.disabled,
    contract: props.contract,
    scope: props.scope,
    from: props.from
      ? new Date(props.from) 
      : undefined,
    to: props.to
      ? new Date(props.to)
      : undefined,
    scheduleRequirements: props.scheduleRequirements?.split(" ").filter(value => !!value)
  } satisfies TimeSlotPickerProps
}
