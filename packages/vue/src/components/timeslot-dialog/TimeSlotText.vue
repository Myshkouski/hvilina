<template lang="pug">

span.text-muted-foreground(
  class="first-letter:uppercase"
)
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
      | pick a timeslot

</template>

<script setup lang="ts">

import { usePreferredLanguages } from '@vueuse/core';
import type { TimeSlot } from './TimeSlotDialogTimePicker.vue';
import { computed, toValue } from 'vue';
import { formatTimeSlot } from '~/utils/formatTimeSlot';
import { DateFormatter } from '@internationalized/date';

const {
  timeSlot
} = defineProps<{
  timeSlot?: TimeSlot
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
