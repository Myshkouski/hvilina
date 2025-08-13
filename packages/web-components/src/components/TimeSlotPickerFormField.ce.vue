<template>
  <timeslot-picker
    v-bind="delegatedProps"
    @error="onError"
    @reservation-id-update="onReservationIdUpdate"
  >
  </timeslot-picker>
  <input type="hidden" :name="fieldName" :value="reservationId" :disabled="!reservationId" readonly>
</template>

<script setup lang="ts">

import type { Props as TimeSlotPickerProps } from "./TimeSlotPicker.ce.vue"
import { TimeSlotPicker } from "~/index"
import { computed, ref } from "vue";

export type Props = TimeSlotPickerProps & {
  fieldName: string
} & Pick<TimeSlotPickerProps, "lang">

const props = defineProps<Props>()
const delegatedProps = computed(() => {
  return {
    ...props,
    lang: props.lang
  }
})
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
