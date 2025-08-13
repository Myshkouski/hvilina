<template lang="pug">

Button(
  type="button"
  variant="secondary"
  :disabled="disabled"
  :class=`
    cn(
      'cursor-pointer',
      'justify-start text-left font-normal',
      !timeSlot && 'text-muted-foreground',
    )
  `
)
  slot
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

</template>

<script setup lang="ts">

import { Button } from "~/components/ui/button"
import { ClockIcon, LoaderCircleIcon } from "lucide-vue-next"
import TimeSlotText from "./TimeSlotText.vue"
import { cn } from "~/utils/shadcn"
import type { TimePickerItem } from "./TimePicker.vue";

const {
  timeSlot,
  disabled = false,
  loading = false
} = defineProps<{
  timeSlot?: TimePickerItem
  disabled?: boolean
  loading?: boolean
}>()

</script>
