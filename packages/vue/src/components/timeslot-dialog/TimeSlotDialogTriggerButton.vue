<template lang="pug">

Button(
  type="button"
  variant="secondary"
  :disabled="disabled"
  :class=`cn(
    'cursor-pointer',
    'justify-start text-left font-normal',
    !timeSlot && 'text-muted-foreground',
  )
    `
)
  .flex.items-center.gap-2
    .size-4
      LoaderCircleIcon(
        v-if="loading"
        :class="{ 'animate-spin': loading }"
      )
      ClockIcon(
        v-else
      )
    TimeSlotText(
      :time-slot="timeSlot"
    )
      template(#fallback-text)
        slot(
          name="fallback-text"
        )

</template>

<script setup lang="ts">

import { Button } from "~/components/ui/button"
import { ClockIcon, LoaderCircleIcon } from "lucide-vue-next"
import TimeSlotText from "./TimeSlotText.vue"
import { cn } from "~/utils/shadcn"
import type { TimeSlot } from "./TimeSlotDialogTimePicker.vue";

const {
  timeSlot,
  disabled = false,
  loading = false
} = defineProps<{
  timeSlot?: TimeSlot
  disabled?: boolean
  loading?: boolean
}>()

</script>
