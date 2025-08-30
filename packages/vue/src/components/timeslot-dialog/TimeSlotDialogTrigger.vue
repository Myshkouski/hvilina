<template lang="pug">

.flex
  DialogTrigger(as-child)
    TimeSlotDialogTriggerButton(
      :time-slot="timeSlot"
      :disabled="disabled"
      :loading="loading"
    )
      template(#fallback-text)
        slot(
          name="fallback-text"
        )

</template>

<script setup lang="ts">

import type { TimeSlot } from "./TimeSlotDialogTimePicker.vue";
import TimeSlotDialogTriggerButton from "./TimeSlotDialogTriggerButton.vue"
import {
  DialogTrigger
} from "~/components/ui/dialog"

defineProps<{
  timeSlot?: TimeSlot
  disabled?: boolean
  loading?: boolean
}>()

</script>
