<template lang="pug">

.flex.flex-col.items-center.gap-4(
  class="sm:flex-row sm:items-stretch"
)
  TimeSlotDatePicker(
    v-model="startDate"
    :dates="timeSlotDates"
  )
  TimeSlotTimePicker.min-h-24.justify-center(
    :class=`cn(
      'sm:max-h-96', 'max-h-32'
    )
      `
    v-model="timeSlot"
    :selected-date="startDate"
    :time-slots="available"
  )
  
</template>

<script setup lang="ts" generic="T extends LocalTimeSlot">

import TimeSlotDatePicker from "./DatePicker.vue"
import TimeSlotTimePicker from "./TimeSlotDialogTimePicker.vue"
import { cn } from "~/utils/shadcn"
import { toCalendarDate } from '@internationalized/date'
import type { TimeSlot } from './TimeSlotDialogTimePicker.vue'
import { computed } from 'vue'
import type { LocalTimeSlot } from "~/types/LocalTimeSlot"

const {
  available = []
} = defineProps<{
  available?: LocalTimeSlot[]
}>()

const startDate = defineModel<Date>("date")
const timeSlot = defineModel<TimeSlot>("timeSlot")

const timeSlotsByDate = computed(() => {
  return Object.groupBy(available, item => {
    return toCalendarDate(item.startAt).toString()
  })
})

const timeSlotDates = computed(() => {
  return Object.keys(timeSlotsByDate.value)
})

</script>
