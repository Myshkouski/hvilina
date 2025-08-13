<template lang="pug">

span.text-muted-foreground
  template(
    v-if="formattedTimeSlot"
  )
    | {{ formattedTimeSlot }}
    
  template(
    v-else
  )
    slot(
      name="fallback-text"
    )
      | Pick a timeslot

</template>

<script setup lang="ts">

import { usePreferredLanguages } from '@vueuse/core';
import type { TimePickerItem } from './TimePicker.vue';
import { computed, toValue } from 'vue';
import { formatTimeSlot } from '~/utils/formatTimeSlot';
import { DateFormatter } from '@internationalized/date';

const {
  timeSlot
} = defineProps<{
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

const formattedTimeSlot = computed(() => {
  if (!timeSlot) return
  return formatTimeSlot(timeSlot, df.value)
})

</script>
