<template lang="pug">

TimePicker(
  v-model="selectedTimeSlot"
  :items="timePickerItems"
)

</template>

<script setup lang="ts" generic="T extends Readonly<LocalTimeSlot>">

import { fromDate, getLocalTimeZone, isSameDay, type DateTimeDuration, type ZonedDateTime } from '@internationalized/date';
import { TimePicker } from "~/components/time-picker"
import { computed } from 'vue';

export interface LocalTimeSlot {
  startAt: ZonedDateTime
  duration: DateTimeDuration
  available: boolean
  performer: string
}

export interface TimePickerItem {
  startAt: ZonedDateTime
  duration: DateTimeDuration
  available: boolean
  performer: string
  hour: number
  minute: number
}

const props = defineProps<{
  selectedDate?: Date | null
  timeSlots: T[]
}>()

const selectedCalendarDate = computed(() => {
  if (!props.selectedDate) return
  return fromDate(props.selectedDate, getLocalTimeZone())
})

const selectedTimeSlot = defineModel<TimePickerItem | undefined>()

const timePickerItems = computed<TimePickerItem[]>(() => {
  return props.timeSlots.map(timeSlot => {
    return {
      startAt: timeSlot.startAt,
      duration: timeSlot.duration,
      hour: timeSlot.startAt.hour,
      minute: timeSlot.startAt.minute,
      performer: timeSlot.performer,
      available: selectedCalendarDate.value
        ? isSameDay(selectedCalendarDate.value, timeSlot.startAt) && timeSlot.available
        : false,
    } satisfies Readonly<TimePickerItem>
  })
})

</script>
