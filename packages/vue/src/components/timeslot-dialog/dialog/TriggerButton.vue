<template lang="pug">

Button(
  type="button"
  variant="secondary"
  :disabled="disabled"
  :class=`
    cn(
      'justify-start text-left font-normal',
      !timeSlot && 'text-muted-foreground',
    )
  `
)
  slot
    .flex.items-center.gap-2
      CalendarIcon.size-4
      TimeSlotText(
        :time-slot="timeSlot"
      )

</template>

<script setup lang="ts">

import { Button } from "~/components/ui/button"
import { CalendarIcon } from "lucide-vue-next"
import TimeSlotText from "./Text.vue"
import { cn } from "~/utils/shadcn"
import type { TimePickerItem } from "../TimePicker.vue";

defineProps<{
  timeSlot?: TimePickerItem
  disabled?: boolean
}>()

</script>
