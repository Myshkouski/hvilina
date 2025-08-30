<template lang="pug">

CustomDialogScrollContent
  DialogHeader
    DialogTitle(
      class="first-letter:uppercase"
    )
      slot(name="title-text")
        | select date and time
    DialogDescription(
      class="first-letter:uppercase"
    )
      slot(name="description-text")
        | click "Save" when you&apos;re done.

  .my-4
    TimeSlotDateTimePicker(
      :available="available"
      v-model:date="selectedStartDate"
      v-model:time-slot="selectedTimeSlot"
    )

  DialogFooter
    .w-full.flex.flex-row
      .flex-1
        Button(
          type="button"
          variant="ghost"
          @click="onRefreshClick()"
          :disabled="disableRefresh"
        )
          RefreshCwIcon(
            :class="{ 'animate-spin': loading }"
          )
      .flex.flex-row.justify-between.items-center.gap-4
        TimeSlotText(
          :time-slot="selectedTimeSlot"
        )
          template(#fallback-text="slotProps")
            slot(
              name="timeslot-fallback-text" 
              v-bind="slotProps"
            )
        Button(
          class="cursor-pointer"
          type="button"
          :disabled="disableConfirm"
          @click="onConfirmClick"
        )
          span(
            class="first-letter:uppercase"
          )
            slot(name="confirm-text")
              | confirm
  
</template>

<script setup lang="ts" generic="T extends LocalTimeSlot">

import type { LocalTimeSlot } from "~/types/LocalTimeSlot"
import TimeSlotDateTimePicker from "./DateTimePicker.vue"
import TimeSlotText from "./TimeSlotText.vue"
import {
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog"
import CustomDialogScrollContent from "./CustomDialogScrollContent.vue"
import {
  Button
} from "~/components/ui/button"
import { RefreshCwIcon } from "lucide-vue-next"
import type { TimeSlot } from './TimeSlotDialogTimePicker.vue'
import { shallowRef } from "vue"

type Props = {
  loading?: boolean
  available?: LocalTimeSlot[]
  selected?: LocalTimeSlot
  scope?: string
  contractId?: string
  scheduleRequirements?: string[]
  disableConfirm?: boolean
  disableRefresh?: boolean
}

const {
  loading,
  available,
  disableConfirm,
  disableRefresh,
} = defineProps<Props>()

type Emits = {
  (event: "click:refresh"): void
  (event: "click:confirm"): void
}

const emit = defineEmits<Emits>()

const selectedStartDate = shallowRef<Date>()
const selectedTimeSlot = defineModel<TimeSlot>("selected")
// watch(selectedStartDate, () => {
//   selectedTimeSlot.value = undefined
// })

function onRefreshClick() {
  emit("click:refresh")
}

function onConfirmClick() {
  if (!selectedTimeSlot.value) return
  if (!selectedTimeSlot.value.available) return

  emit("click:confirm")
}

</script>
