<template>
  <TimeSlotPickerRoot 
    v-bind="props"
    @error="emit('error', $event)"
    @update:reservation-id="emit('update:reservationId', $event)" 
    @update:time-slots="emit('update:timeSlots', $event)"
  >
    <template #default="defaultSlotProps">
      <slot v-bind="defaultSlotProps"></slot>
    </template>
  </TimeSlotPickerRoot>
</template>

<script setup lang="ts">

import { TimeSlotPickerRoot, type TimeSlotPickerRootProps, type TimeSlotPickerRootEmits } from "@hvilina/vue";
const props = defineProps<TimeSlotPickerRootProps>()
const emit = defineEmits<TimeSlotPickerRootEmits>()

</script>

<style src="~/assets/style/main.css" />
