<template lang="pug">

TimeSlotPickerRoot(
  v-bind="props"
  @update:error="emit('error', $event)"
  @update:reservation-id="emit('update:reservationId', $event)"
  @update:time-slots="emit('update:timeSlots', $event)"
)
  template(
    #default="{ disabled, loading, available, selected, onConfirm, onRefresh }"
  )
    TimeSlotDialog(
      v-model:open="dialogOpen"
      :disabled="disabled"
      :loading="loading"
      :available="available"
      :selected="selected"
      @click:refresh="onRefresh"
      @click:confirm="onConfirmClick($event, onConfirm)"
    )
      template(#content-title-text)
        slot(name="content-title-text")
      template(#content-description-text)
        slot(name="content-description-text")
      template(#content-confirm-text)
        slot(name="content-confirm-text")

</template>

<script setup lang="ts">

import TimeSlotPickerRoot from "./TimeSlotPickerRoot.vue"
import type { Props, Emits } from "./TimeSlotPickerRoot.vue"
import {
  TimeSlotDialog
} from "~/components/timeslot-dialog"
import { ref } from "vue"
import type { TimePickerItem } from "~/components/timeslot-dialog/TimePicker.vue"

export type { Props, Emits }

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const dialogOpen = ref(false)

function onConfirmClick(value: TimePickerItem | undefined, cb: (timeSlot: TimePickerItem) => Promise<void>) {
  if (!value) return
  cb(value).then(() => {
    dialogOpen.value = false
  })
}

</script>
