<template lang="pug">

TimePicker(
  v-model="selectedTimeSlot"
  :items="timePickerItems"
)

</template>

<script setup lang="ts" generic="T extends Readonly<TimeSlot>">

import type { TimeWithAvailability } from '~/components/time-picker/TimePicker.vue'
import { fromDate, getLocalTimeZone, isSameDay, type DateTimeDuration, type ZonedDateTime } from '@internationalized/date';
import { TimePicker } from "~/components/time-picker"
import { computed } from 'vue';
import { toTimePickerItem } from '~/utils/toTimePickerItem';

export interface TimeSlot extends TimeWithAvailability {
  startAt: ZonedDateTime
  duration: DateTimeDuration
  performer: string
}

const props = defineProps<{
  selectedDate?: Date | null
  timeSlots: T[]
}>()

const selectedCalendarDate = computed(() => {
  if (!props.selectedDate) return
  return fromDate(props.selectedDate, getLocalTimeZone())
})

const selectedTimeSlot = defineModel<TimeSlot | undefined>()

const timePickerItems = computed(() => {
  return props.timeSlots.map(timeSlot => {
    return {
      ...toTimePickerItem(timeSlot),
      available: selectedCalendarDate.value
        ? isSameDay(selectedCalendarDate.value, timeSlot.startAt) && timeSlot.available
        : false,
    } satisfies TimeSlot
  })
})

</script>
