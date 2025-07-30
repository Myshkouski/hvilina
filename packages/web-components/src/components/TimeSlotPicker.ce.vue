<template>
  <TimeSlotPicker 
    v-bind="delegatedProps" 
    @error="emit('error', $event)"
    @update:reservation-id="emit('update:reservationId', $event)"
    @update:time-slots="emit('update:timeSlots', $event)"
  />
</template>

<script setup lang="ts">

import { TimeSlotPicker, type TimeSlotPickerProps, type TimeSlotPickerEmits } from "@hvilina/vue";
const delegatedProps = defineProps<TimeSlotPickerProps>()
const emit = defineEmits<TimeSlotPickerEmits>()

</script>

<style src="~/assets/style/main.css" />
