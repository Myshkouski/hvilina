<template>
  <TimeSlotPicker 
    v-bind="delegatedProps" 
    @error="emit('error', $event)"
    @update:reservation-id="emit('reservationIdUpdate', $event)"
    @update:time-slots="emit('timeSlotsUpdate', $event)"
  />
</template>

<script setup lang="ts">

import { TimeSlotPicker, type TimeSlotPickerProps } from "@hvilina/vue";
import { delegateTimeSlotPickerProps } from "./delegateTimeSlotPickerProps";
import { computed } from "vue";

export type Props = TimeSlotPickerProps & {
  baseUrl: string
  from?: string
  to?: string
}
const props = defineProps<Props>()

const delegatedProps = computed(() => {
  return delegateTimeSlotPickerProps(props)
})

export type Emits = {
  (event: "error", value: any): void
  (event: "reservationIdUpdate", value: string | undefined): void
  (event: "timeSlotsUpdate", value: object[] | undefined): void
}
const emit = defineEmits<Emits>()

</script>

<style src="~/assets/style/main.css" />
