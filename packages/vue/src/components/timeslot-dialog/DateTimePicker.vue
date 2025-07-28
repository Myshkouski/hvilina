<template lang="pug">

.flex.flex-col.items-center.gap-4(
  class="sm:flex-row sm:items-stretch"
)
  TimeSlotDatePicker(
    v-model="startDate"
    :dates="timeSlotDates"
  )
  TimeSlotTimePicker.min-h-24.max-h-32.justify-center(
    class="sm:max-h-96"
    v-model="timeSlot"
    :selected-date="startDate"
    :time-slots="timeSlots"
  )
  
</template>

<script setup lang="ts" generic="T extends LocalTimeSlot">

import TimeSlotDatePicker from "./DatePicker.vue"
import TimeSlotTimePicker from "./TimePicker.vue"

import { toCalendarDate } from '@internationalized/date'
import type { LocalTimeSlot, TimePickerItem } from './TimePicker.vue'
import { computed } from 'vue'

const {
  timeSlots = []
} = defineProps<{
  timeSlots?: LocalTimeSlot[]
}>()

const startDate = defineModel<Date>("date")
const timeSlot = defineModel<TimePickerItem>("timeSlot")

const timeSlotsByDate = computed(() => {
  return Object.groupBy(timeSlots, item => {
    return toCalendarDate(item.startAt).toString()
  })
})

const timeSlotDates = computed(() => {
  return Object.keys(timeSlotsByDate.value)
})

</script>
