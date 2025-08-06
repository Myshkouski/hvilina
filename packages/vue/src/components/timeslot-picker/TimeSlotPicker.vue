<template lang="pug">

TimeSlotPickerRoot(
  :disabled="disabled"
  :base-url="baseUrl"
  :contract="contract"
  :scope="scope"
  @update:error="emit('error', $event)"
  @update:reservation-id="emit('update:reservationId', $event)"
  @update:time-slots="emit('update:timeSlots', $event)"
)
  template(#default="{ disabled, available, selected, onConfirm, onRefresh }")
    TimeSlotDialog(
      v-model:open="dialogOpen"
      :disabled="disabled"
      :time-slots="available"
      :time-slot="selected"
      @click:refresh="onRefresh"
      @click:confirm="onConfirmClick($event, onConfirm)"
    )

</template>

<script setup lang="ts">

import TimeSlotPickerRoot from "./TimeSlotPickerRoot.vue"
import type { Props, Emits } from "./TimeSlotPickerRoot.vue"
import { TimeSlotDialog } from "~/components/timeslot-dialog"
import { ref } from 'vue'
import type { TimePickerItem } from "~/components/timeslot-dialog/TimePicker.vue"

export type { Props, Emits }

defineProps<Props>()
const emit = defineEmits<Emits>()

const dialogOpen = ref(false)

function onConfirmClick(value: TimePickerItem, cb: (timeSlot: TimePickerItem) => Promise<void>) {
  cb(value).then(() => {
    dialogOpen.value = false
  })
}

</script>
