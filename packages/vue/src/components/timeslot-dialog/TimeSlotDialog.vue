<template lang="pug">

Dialog(
  v-model:open="dialogOpen"
)
  TimeSlotDialogTrigger(
    :period="undefined"
    :disabled="disabled"
  )
  
  TimeSlotDialogContent(
    :time-slots="timeSlots"
    v-model:time-slot="selectedTimeSlot"
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
  disabled = false,
} = defineProps<{
  timeSlots?: LocalTimeSlot[]
  disabled?: boolean
} & {}>()

const emit = defineEmits<{
  (event: "click:refresh"): void
  (event: "click:confirm"): void
}>()

const dialogOpen = defineModel("open", {
  default: false
})

const selectedStartDate = shallowRef<Date>()
watch(selectedStartDate, (date, oldDate) => {
  if (oldDate?.getTime() !== date?.getTime()) {
    selectedTimeSlot.value = undefined
  }
})

const selectedTimeSlot = defineModel<TimePickerItem>()

function onConfirmClick() {
  emit("click:confirm")
}

function onRefreshClick() {
  emit("click:refresh")
}

</script>
