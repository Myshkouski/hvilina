<template lang="pug">

Dialog(
  v-model:open="dialogOpen"
)
  TimeSlotDialogTrigger(
    :time-slot="timeSlot"
    :disabled="disabled"
  )
    //- p {{ timeSlot }}
  
  TimeSlotDialogContent(
    :time-slots="timeSlots"
    :time-slot="selectedTimeSlot"
    @update:time-slot="onTimeSlotUpdate"
    @click:confirm="onConfirmClick"
    @click:refresh="onRefreshClick"
  )

</template>

<script setup lang="ts">

import {
  TimeSlotDialogTrigger,
  TimeSlotDialogContent
} from "./dialog" 
import { Dialog } from "~/components/ui/dialog"
import type { LocalTimeSlot, TimePickerItem } from "./TimePicker.vue"
import { shallowRef, watch } from "vue"

const {
  timeSlots,
  timeSlot,
  disabled = false,
} = defineProps<{
  timeSlots?: LocalTimeSlot[]
  timeSlot?: TimePickerItem
  disabled?: boolean
}>()

const emit = defineEmits<{
  (event: "click:refresh"): void
  (event: "click:confirm", value: TimePickerItem): void
}>()

const dialogOpen = defineModel("open", {
  default: false
})

const selectedTimeSlot = shallowRef<TimePickerItem | undefined>(timeSlot)

const selectedStartDate = shallowRef<Date>()
watch(selectedStartDate, (date, oldDate) => {
  if (oldDate?.getTime() !== date?.getTime()) {
    selectedTimeSlot.value = undefined
  }
})

function onConfirmClick() {
  if (!selectedTimeSlot.value) return
  emit("click:confirm", selectedTimeSlot.value)
}

function onRefreshClick() {
  emit("click:refresh")
}

function onTimeSlotUpdate(value: TimePickerItem | undefined) {
  selectedTimeSlot.value = value
}

</script>
