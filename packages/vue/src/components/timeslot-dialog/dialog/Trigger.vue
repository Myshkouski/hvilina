<template lang="pug">

.flex
  DialogTrigger(as-child)
    TimeSlotTriggerButton(
      :period="period"
      :disabled="disabled"
    )

</template>

<script setup lang="ts">

import TimeSlotTriggerButton from "./TriggerButton.vue"
import {
  DialogTrigger
} from "~/components/ui/dialog"

defineProps<{
  period?: { startAt: Date, duration: string }
  disabled?: boolean
}>()

</script>
