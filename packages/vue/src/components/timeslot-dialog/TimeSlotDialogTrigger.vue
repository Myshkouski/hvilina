<template lang="pug">

.flex
  DialogTrigger(as-child)
    TimeSlotDialogTriggerButton(
      :time-slot="timeSlot"
      :disabled="disabled"
      :loading="loading"
    )
      slot

</template>

<script setup lang="ts">

import type { TimePickerItem } from "./TimePicker.vue";
import TimeSlotDialogTriggerButton from "./TimeSlotDialogTriggerButton.vue"
import {
  DialogTrigger
} from "~/components/ui/dialog"

defineProps<{
  timeSlot?: TimePickerItem
  disabled?: boolean
  loading?: boolean
}>()

</script>
