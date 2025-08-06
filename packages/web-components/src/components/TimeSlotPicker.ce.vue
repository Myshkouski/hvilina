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
const delegatedProps = defineProps<TimeSlotPickerProps>()

export type Emits = {
  (event: "error", value: any): void
  (event: "reservationIdUpdate", value: string | undefined): void
  (event: "timeSlotsUpdate", value: object[] | undefined): void
}

const emit = defineEmits<Emits>()

</script>

<style src="~/assets/style/main.css" />
