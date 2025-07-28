<template lang="pug">

Button(
  type="button"
  variant="secondary"
  :disabled="disabled"
  :class=`
    cn(
      'justify-start text-left font-normal',
      !period && 'text-muted-foreground',
    )
  `
)
  .flex.items-center.gap-2
    CalendarIcon.size-4
    TimeSlotText(
      :period="period"
    )

</template>

<script setup lang="ts">

import { Button } from "~/components/ui/button"
import { CalendarIcon } from "lucide-vue-next"
import TimeSlotText from "./Text.vue"
import { cn } from "~/utils/shadcn"

defineProps<{
  period?: { startAt: Date, duration: string }
  disabled?: boolean
}>()

</script>
