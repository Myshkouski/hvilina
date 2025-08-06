<template lang="pug">

slot(
  v-bind="defaultSlotProps"
)

</template>

<script setup lang="ts">

import { useTimeSlots } from '~/composables';
import type { LocalTimeSlot, TimePickerItem } from '~/components/timeslot-dialog/TimePicker.vue';
import { computed, onMounted, shallowRef, watch } from 'vue';
import { formatDuration } from "~/utils/formatDuration";
import {
  createReservationRequest,
  changeReservationRequest,
  getReservationRequest,
} from "@hvilina/lib/api"
import { useReservationMeta } from "~/composables/useReservationIdCookie";
import { useBrowserLocation } from "@vueuse/core";
import type { TimeSlotApi } from "~/types/TimeSlotApi";
import { toLocalTimeSlot } from "~/utils/toLocalTimeSlot";
import { toTimePickerItem } from "~/utils/toTimePickerItem";

export type Props = {
  disabled?: boolean
  baseUrl: string | URL
  contract?: string
  scope?: string
  to?: Date
}

export type Emits = {
  (event: "error", error: any): void
  (event: "update:timeSlots", value: LocalTimeSlot[] | undefined): void
  (event: "update:reservationId", value: string | undefined): void
}

const {
  baseUrl,
  contract,
  disabled: disabledProp,
  scope,
  to
} = defineProps<Props>()

const emit = defineEmits<Emits>()

const disabled = computed(() => {
  if (disabledProp) {
    return true
  }
  return !contract
})

const defaultSlotProps = computed(() => {
  return {
    disabled: disabled.value,
    available: timeSlots.value,
    selected: timeSlot.value,
    onConfirm: confirm,
    onRefresh: refreshTimeSlots
  } satisfies DefaultSlotProps
})

export interface DefaultSlotProps {
  disabled: boolean
  available?: LocalTimeSlot[]
  selected?: LocalTimeSlot
  onConfirm: (timeSlot: TimePickerItem) => any
  onRefresh: () => any
}

const {
  data: timeSlots,
  error: timeSlotsError,
  refresh: refreshTimeSlots,
  // isFinished: isTimeSlotsLoaded
} = useTimeSlots({
  baseUrl,
  contract,
  to
})

onMounted(() => {
  refreshTimeSlots().catch(onError)
})

watch(timeSlots, timeSlots => {
  emit("update:timeSlots", timeSlots)
}, {
  immediate: true
})

watch(timeSlotsError, timeSlotsError => {
  if (timeSlotsError) {
    onError(timeSlotsError)
  }
}, {
  immediate: true
})

const browserLocation = useBrowserLocation()
const origin = computed(() => {
  return browserLocation.value.origin
})
const reservationMeta = useReservationMeta({ scope, origin })

const timeSlot = shallowRef<TimePickerItem>()

onMounted(async () => {
  const reservationId = reservationMeta.id.value
  if (!reservationId) return

  const request = getReservationRequest({
    baseUrl,
    id: reservationId
  })

  const response = await fetch(request)
  const responseBody = await response.json() as { data: TimeSlotApi }

  const reservedTimeSlot = toLocalTimeSlot(responseBody.data)
  timeSlot.value = toTimePickerItem(reservedTimeSlot)
})

// function onConfirmClick(timeSlot: TimePickerItem) {
//   confirm(timeSlot).catch(onError)
// }

async function confirm(timeSlot: TimePickerItem) {
  await upsertReservation(timeSlot)
}



watch(reservationMeta.id, reservationId => {
  emit("update:reservationId", reservationId)
}, {
  immediate: true
})

async function upsertReservation(timeSlotValue: TimePickerItem) {
  const reservationId = reservationMeta.id.value
  let request: Request
  if (reservationId) {
    request = changeReservationRequest({
      baseUrl,
      id: reservationId,
      reservation: {
        performer: timeSlotValue.performer,
        start_at: timeSlotValue.startAt.toDate().toISOString(),
        duration: formatDuration(timeSlotValue.duration)
      }
    })
  } else {
    request = createReservationRequest({
      baseUrl,
      reservation: {
        start_at: timeSlotValue.startAt.toDate().toISOString(),
        duration: formatDuration(timeSlotValue.duration),
        performer: timeSlotValue.performer,
      }
    })
  }

  const response = await fetch(request)
  const body = await response.json() as { data: { id: string, expire_at: string } }

  reservationMeta.updateId(body.data.id, {
    expireAt: new Date(body.data.expire_at)
  })

  timeSlot.value = timeSlotValue
}

function onError(error: any) {
  console.error(error)
  emit("error", error)
}

</script>
