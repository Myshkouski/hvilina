<template lang="pug">

slot(
  v-bind="defaultSlotProps"
)

</template>

<script setup lang="ts">

import { computed, shallowRef } from "vue";
import type { TimePickerItem } from "../TimePicker.vue"
import { formatDuration } from "~/utils/formatDuration";

const props = defineProps<{
  disabled?: boolean
  contractId?: string
  scheduleRequirements?: string[]
}>()

const dialogOpen = defineModel("open", {
  default: false
})

const reservationId = defineModel<string>("reservationId")
const timeSlot = shallowRef<TimePickerItem>()
const period = computed(() => {
  const value = timeSlot.value
  if (!value) return
  
  return {
    startAt: value.startAt.toDate(), 
    duration: formatDuration(value.duration)
  }
})

const defaultSlotProps = computed(() => {
  return {
    disabled: props.disabled,
    contractId: props.contractId,
    scheduleRequirements: props.scheduleRequirements,
    
    dialogOpen: dialogOpen.value,
    setDialogOpen,

    timeSlot: timeSlot.value,
    handleTimeSlotChange: onTimeSlotUpdate,
    
    period: period.value,

    reservationId: reservationId.value,
    handleReservationChange: onReservationChange,
  }
})

function setDialogOpen(value: boolean) {
  dialogOpen.value = value
}

function onTimeSlotUpdate(value: TimePickerItem | undefined) {
  timeSlot.value = value
}

function onReservationChange(value: string | undefined) {
  if (value) {
    dialogOpen.value = false
  }
  reservationId.value = value
}

</script>
