<template lang="pug">

Calendar(
  initial-focus
  v-model="selectedStartDate"
  :locale="locale"
  :is-date-disabled="isDateDisabledOrUnavailable"
  :min-value="minDateValue"
  :fixed-weeks="true"
)

</template>

<script setup lang="ts">

import { Calendar } from "~/components/ui/calendar"
import { startOfWeek as getStartOfWeek, today as getToday, getLocalTimeZone, fromDate, toCalendarDate, type DateValue, toZoned } from '@internationalized/date'
import { usePreferredLanguages } from "@vueuse/core";
import { computed } from "vue";

const preferredLanguages = usePreferredLanguages()
const locale = computed(() => {
  return preferredLanguages.value.at(0) || "en"
})

const props = defineProps<{
  dates: string[]
}>()

const minDateValue = computed(() => {
  return getStartOfWeek(getToday(getLocalTimeZone()), locale.value)
})

const model = defineModel<Date>()

const zonedDateTime = computed({
  get() {
    if (!model.value) return
    return fromDate(model.value, getLocalTimeZone())
  },
  set(value) {
    model.value = value?.toDate()
  }
})

const selectedStartDate = computed({
  get() {
    if (!zonedDateTime.value) return
    return toCalendarDate(zonedDateTime.value)
  },
  set(value) {
    zonedDateTime.value = value
      ? toZoned(value, getLocalTimeZone())
      : undefined
  }
})

function isDateDisabled(date: DateValue) {
  const tz = getLocalTimeZone()
  return date.add({ days: 1 }).toDate(tz).getTime() < Date.now()
}

function isDateUnavailable(date: DateValue) {
  return false === props.dates.includes(date.toString())
}

function isDateDisabledOrUnavailable(date: DateValue) {
  return isDateDisabled(date) || isDateUnavailable(date)
}

</script>
