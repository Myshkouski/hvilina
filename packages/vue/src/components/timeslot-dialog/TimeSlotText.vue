<template lang="pug">

span.text-muted-foreground(
  :class="{ 'visible': !!text }"
)
  | {{ text }}
  
</template>

<script setup lang="ts">

import { usePreferredLanguages } from '@vueuse/core';
import type { TimePickerItem } from './TimePicker.vue';
import { computed, toValue } from 'vue';
import { formatTimeSlot } from '~/utils/formatTimeSlot';
import { DateFormatter } from '@internationalized/date';

const props = defineProps<{
  // period?: { startAt: Date, duration: string }
} | {
  timeSlot?: TimePickerItem
}>()

const locales = usePreferredLanguages()
const locale = computed(() => {
  const value = toValue(locales).at(0) ?? "en"
  return value
})
const df = computed(() => {
  return new DateFormatter(locale.value)
})

const text = computed(() => {
  // if ("period" in props && props.period) {
  //   return formatPeriodWithDuration(props.period.startAt, props.period.duration, df.value)
  // }

  if ("timeSlot" in props && props.timeSlot) {
    return formatTimeSlot(props.timeSlot, df.value)
  }

  return "Pick a timeslot"
})

</script>
