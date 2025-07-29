<template lang="pug">

.flex
  DialogTrigger(as-child)
    TimeSlotTriggerButton(
      :time-slot="timeSlot"
      :disabled="disabled"
    )
      slot

</template>

<script setup lang="ts">

import type { TimePickerItem } from "../TimePicker.vue";
import TimeSlotTriggerButton from "./TriggerButton.vue"
import {
  DialogTrigger
} from "~/components/ui/dialog"

defineProps<{
  timeSlot?: TimePickerItem
  disabled?: boolean
}>()

</script>
