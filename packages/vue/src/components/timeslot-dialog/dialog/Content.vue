<template lang="pug">

CustomDialogScrollContent
  DialogHeader
    DialogTitle(
      class="first-letter:capitalize"
    )
      slot(name="title-text")
        | Select date and time
    DialogDescription(
      class="first-letter:capitalize"
    )
      slot(name="description-text")
        | Click "Save" when you&apos;re done.
  
  TimeSlotDateTimePicker.my-4(
    :time-slots="timeSlots"
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
          :disabled="disableRefresh || pendingRefresh"
        )
          RefreshCwIcon(
            :class="{ 'animate-spin': pendingRefresh }"
          )
      .flex.flex-row.justify-between.items-center.gap-4
        TimeSlotText(
          :time-slot="selectedTimeSlot"
        )
        Button(
          class="first-letter:capitalize"
          type="button"
          @click="onConfirmClick"
          :disabled="disableConfirm"
        )
          slot(name="confirm-text")
            | Confirm
  
</template>

<script setup lang="ts" generic="T extends LocalTimeSlot">

import TimeSlotDateTimePicker from "../DateTimePicker.vue"
import TimeSlotText from "./Text.vue"
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
import type { LocalTimeSlot, TimePickerItem } from '../TimePicker.vue'
import { shallowRef, watch } from "vue"

const {
  timeSlots = [],
  disableConfirm, 
  disableRefresh, 
  pendingRefresh
} = defineProps<{
  timeSlots?: LocalTimeSlot[]
  scope?: string
  contractId?: string
  scheduleRequirements?: string[]
  disableConfirm?: boolean
  disableRefresh?: boolean
  pendingRefresh?: boolean
}>()

// const scope = useReservationScope(() => props.scope)
// const scope = ref("_")
// const reservationId = defineModel<string>("reservationId")

const emit = defineEmits<{
  (event: "click:refresh"): void
  (event: "click:confirm"): void
}>()

const selectedStartDate = shallowRef<Date>()
const selectedTimeSlot = defineModel<TimePickerItem>("timeSlot")
watch(selectedStartDate, () => {
  selectedTimeSlot.value = undefined
})

// function useTimeSlots(params: any) {
//   return {
//     data: computed(() => []),
//     async refresh() {},
//     status: ref("success")
//   }
// }

// function useCookies<T>() {
//   return {
//     get(key: string): string | undefined {
//       return undefined
//     },
//     set(key: string, value: any) {}
//   }
// }

// function createReservation(...args: any[]) {
//   return {
//     id: ""
//   }
// }
// function changeReservation(...args: any[]) {
//   return createReservation(...args)
// }

// const {
//   data: timeSlots,
//   refresh: refreshTimeSlots,
//   status: timeSlotsStatus,
//   // error: timeSlotError,
//   // clear: clearTimeSlots
// } = useTimeSlots({
//   contractId,
//   scheduleRequirements
// })

// const reservationId = useReservationIdCookie({ scope })
// const cookies = useCookies<Record<`reservations_${string}`, string>>()

// async function upsertReservationAndRefresh(timeSlot: TimePickerItem) {
//   const reservationId = cookies.get(`reservations_${scope.value}`)
//   let data: Awaited<ReturnType<typeof createReservation>>
//   if (reservationId) {
//     data = await changeReservation(reservationId, {
//       performerId: timeSlot.performer!!,
//       startAt: timeSlot.startAt.toDate(),
//       duration: formatDuration(timeSlot.duration)
//     }) 
//   } else {
//     data = await createReservation({
//       performerId: timeSlot.performer!!,
//       startAt: timeSlot.startAt.toDate(),
//       duration: formatDuration(timeSlot.duration)
//     })
//   }

//   cookies.set(`reservations_${ scope.value }`, data.id, {
//     expires: new Date(data.expire_at),
//     secure: true,
//     sameSite: "none",
//   })
  
//   emit("change", data.id)

//   refreshTimeSlots({
//     cause: "refresh:hook"
//   }).catch(console.error)
// }

function onRefreshClick() {
  emit("click:refresh")
  // refreshTimeSlots({
  //   cause: "refresh:manual"
  // }).catch(console.error)
}

function onConfirmClick() {
  if (!selectedTimeSlot.value) return
  if (!selectedTimeSlot.value.available) return

  emit("click:confirm")

  // upsertReservationAndRefresh(selectedTimeSlot.value).catch(console.error)
}

</script>
