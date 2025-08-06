<template>
  <timeslot-picker
    v-bind="props"
    @error="onError"
    @reservation-id-update="onReservationIdUpdate"
  >
  </timeslot-picker>
  <input type="hidden" :name="fieldName" :value="reservationId" :disabled="!reservationId" readonly>
</template>

<script setup lang="ts">

import type { TimeSlotPickerProps } from "@hvilina/vue"
import { TimeSlotPicker } from "~/index"
import { ref } from "vue";

export type Props = TimeSlotPickerProps & {
  fieldName: string
}

const props = defineProps<Props>()
// const emit = defineEmits<TimeSlotPickerEmits>()
const reservationId = ref<string>()

function onReservationIdUpdate(event: CustomEvent<[string]>) {
  reservationId.value = event.detail[0]
}

function onError(value: any) {
  // console.debug("onError():", value)
}

if (!import.meta.env.SSR) {
  const componentName = "timeslot-picker"
  const customTimeSlotPicker = window.customElements.get(componentName)

  if (!customTimeSlotPicker) {
    window.customElements.define(componentName, TimeSlotPicker)
  }
}

</script>
