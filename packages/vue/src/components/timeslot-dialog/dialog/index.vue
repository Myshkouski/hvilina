<template lang="pug">

TimeSlotDialogRoot(
  v-slot="defaultSlotProps"
)
  DialogComponent(
    :open="defaultSlotProps.dialogOpen"
    @update:open="defaultSlotProps.setDialogOpen($event)"
  )
    slot(
      name="trigger" 
      v-bind="delegateTriggerSlotProps(defaultSlotProps)"
    )
      TimeSlotDialogTrigger(
        v-bind="delegateTriggerProps(defaultSlotProps)"
      )
    
    TimeSlotDialogContent(
      :time-slot="defaultSlotProps.timeSlot"
      @update:time-slot="defaultSlotProps.handleTimeSlotChange"
      :contract-id="defaultSlotProps.contractId"
      :schedule-requirements="defaultSlotProps.scheduleRequirements"
      @change="defaultSlotProps.handleReservationChange"
    )
      TimeSlotDateTimePicker.my-4(
        :time-slots="timeSlots"
        v-model:date="selectedStartDate"
        v-model:time-slot="selectedTimeSlot"
      )

</template>

<script setup lang="ts">

import TimeSlotDateTimePicker from "../DateTimePicker.vue"
import TimeSlotDialogRoot from "./Root.vue" 
import TimeSlotDialogTrigger from "./Trigger.vue"
import TimeSlotDialogContent from "./Content.vue"
import { Dialog as DialogComponent } from "~/components/ui/dialog"
import { delegateTriggerSlotProps, type DelegatedTriggerSlotProps } from "./delegateTriggerSlotProps"
import type { LocalTimeSlot, TimePickerItem } from "../TimePicker.vue"
import { shallowRef, watch } from "vue"

const {
  timeSlots = []
} = defineProps<{
  timeSlots?: LocalTimeSlot[]
}>()

const selectedStartDate = shallowRef<Date>()
watch(selectedStartDate, (date, oldDate) => {
  if (oldDate?.getTime() !== date?.getTime()) {
    selectedTimeSlot.value = undefined
  }
})

const selectedTimeSlot = defineModel<TimePickerItem>()

type DelegatedTriggerProps = Pick<DelegatedTriggerSlotProps, "period" | "disabled">

function delegateTriggerProps(props: DelegatedTriggerProps) {
  return {
    disabled: props.disabled, 
    period: props.period
  }
}

</script>
