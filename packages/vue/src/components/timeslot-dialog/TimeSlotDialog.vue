<template lang="pug">

Dialog(
  v-model:open="dialogOpen"
)
  TimeSlotDialogTrigger(
    :time-slot="selected"
    :disabled="disabled"
    :loading="loading"
  )
  
  TimeSlotDialogContent(
    :available="available"
    :loading="loading"
    :disable-confirm="disabled"
    :disable-refresh="disabled"
    v-model:selected="selectedTimeSlot"
    @click:confirm="onConfirmClick"
    @click:refresh="onRefreshClick"
  )
    template(#title-text)
      slot(name="content-title-text")
    template(#description-text)
      slot(name="content-description-text")
    template(#confirm-text)
      slot(name="content-confirm-text")

</template>

<script setup lang="ts">

import TimeSlotDialogTrigger from "./TimeSlotDialogTrigger.vue" 
import TimeSlotDialogContent from "./TimeSlotDialogContent.vue"
import type { TimePickerItem } from "./TimePicker.vue"
import { shallowRef, watch } from "vue"
import type { LocalTimeSlot } from "~/types/LocalTimeSlot"
import { Dialog } from "~/components/ui/dialog"

const {
  available,
  selected,
  disabled,
  loading,
} = defineProps<{
  available?: LocalTimeSlot[]
  selected?: TimePickerItem
  disabled?: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  (event: "click:refresh"): void
  (event: "click:confirm", value: TimePickerItem): void
}>()

const dialogOpen = defineModel("open", {
  default: false
})

const selectedTimeSlot = shallowRef<TimePickerItem | undefined>(selected)

const selectedStartDate = shallowRef<Date>()
watch(selectedStartDate, (date, oldDate) => {
  if (oldDate?.getTime() !== date?.getTime()) {
    selectedTimeSlot.value = undefined
  }
})

function onConfirmClick() {
  if (!selectedTimeSlot.value) return
  emit("click:confirm", selectedTimeSlot.value)
}

function onRefreshClick() {
  emit("click:refresh")
}

</script>
