<template>
  <TimeSlotPickerRoot 
    v-bind="delegatedProps"
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

import type { Props as TimeSlotPickerProps, Emits as TimeSlotPickerEmits } from "./TimeSlotPicker.ce.vue"
import { computed } from "vue";
import { delegateTimeSlotPickerProps } from "./delegateTimeSlotPickerProps";

export type Props = TimeSlotPickerProps
const props = defineProps<Props>()
const delegatedProps = computed(() => {
  return delegateTimeSlotPickerProps(props)
})

export type Emits = TimeSlotPickerEmits
const emit = defineEmits<TimeSlotPickerEmits>()

</script>

<style src="~/assets/style/main.css" />
