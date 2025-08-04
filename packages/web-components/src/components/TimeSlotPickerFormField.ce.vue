<template>
  <TimeSlotPicker 
    v-bind="props"
    @error="emit('error', $event)"
    @update:reservation-id="emit('update:reservationId', $event)"
    @update:time-slots="emit('update:timeSlots', $event)">
  </TimeSlotPicker>
  <input type="hidden" :name="fieldName" :value="reservationId" :disabled="!reservationId" readonly>
</template>

<script setup lang="ts">

import { TimeSlotPicker, type TimeSlotPickerProps, type TimeSlotPickerEmits } from "@hvilina/vue";
import { ref } from "vue";
const props = defineProps<TimeSlotPickerProps & {
  fieldName: string
}>()
const emit = defineEmits<TimeSlotPickerEmits>()
const reservationId = ref<string>()

</script>

<style src="~/assets/style/main.css" />
