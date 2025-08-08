<template>
  <TimeSlotPickerRoot 
    v-bind="props"
    @error="emit('error', $event)"
    @update:reservation-id="emit('reservationIdUpdate', $event)" 
    @update:time-slots="emit('timeSlotsUpdate', $event)"
  >
    <template #default="defaultSlotProps">
      <slot v-bind="defaultSlotProps"></slot>
    </template>
  </TimeSlotPickerRoot>
</template>

<script setup lang="ts">

import { TimeSlotPickerRoot, type TimeSlotPickerRootProps } from "@hvilina/vue";
import type { Emits as TimeSlotPickerEmits } from "./TimeSlotPicker.ce.vue"
const props = defineProps<TimeSlotPickerRootProps>()
const emit = defineEmits<TimeSlotPickerEmits>()

</script>

<style src="~/assets/style/main.css" />
