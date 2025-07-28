<template lang="pug">

slot(
  v-bind="defaultSlotProps"
)
  TimeSlotDialog(
    v-model:open="dialogOpen"
    :disabled="disabled"
    :time-slots="timeSlots"
    v-model="timeSlot"
    @click:refresh="refreshTimeSlots"
    @click:confirm="onConfirmClick"
  )

</template>

<script setup lang="ts">

import { TimeSlotDialog } from "~/components/timeslot-dialog"
import { useTimeSlots } from '~/composables';
import type { TimePickerItem } from '~/components/timeslot-dialog/TimePicker.vue';
import { computed, onMounted, ref, shallowRef, watch } from 'vue';
import { formatDuration } from "~/utils/formatDuration";
import {
  createReservationRequest,
  changeReservationRequest,
} from "@hvilina/lib/api"
import { useReservationMeta } from "~/composables/useReservationIdCookie";
import { useBrowserLocation } from "@vueuse/core";

export interface Props {
  baseUrl: string | URL
  contract?: string
  scope?: string
  to?: Date
}

const {
  baseUrl,
  contract,
  scope,
  to
} = defineProps<Props>()

const emit = defineEmits<{
  (event: "error", error: any): void
  (event: "update:reservationId", value: string | undefined): void
}>()

const dialogOpen = ref(false)

const disabled = computed(() => {
  return !contract
})

const defaultSlotProps = computed(() => {
  return {
    available: timeSlots.value,
    selected: timeSlot.value,
    onConfirm: confirm
  }
})

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

watch(timeSlotsError, timeSlotsError => {
  if (timeSlotsError) {
    onError(timeSlotsError)
  }
}, {
  immediate: true
})

const timeSlot = shallowRef<TimePickerItem>()

function onConfirmClick() {
  if (!timeSlot.value) return
  confirm(timeSlot.value).catch(onError)
}

async function confirm(timeSlot: TimePickerItem) {
  await upsertReservationAndRefresh(timeSlot)
}

const browserLocation = useBrowserLocation()
const origin = computed(() => {
  return browserLocation.value.origin
})
const reservationMeta = useReservationMeta({ scope, origin })

watch(reservationMeta.id, reservationId => {
  emit("update:reservationId", reservationId)
}, {
  immediate: true
})

async function upsertReservationAndRefresh(timeSlot: TimePickerItem) {
  const reservationId = reservationMeta.id.value
  let request: Request
  if (reservationId) {
    request = changeReservationRequest({
      baseUrl,
      id: reservationId,
      reservation: {
        performer: timeSlot.performer,
        start_at: timeSlot.startAt.toDate().toISOString(),
        duration: formatDuration(timeSlot.duration)
      }
    })
  } else {
    request = createReservationRequest({
      baseUrl,
      reservation: {
        start_at: timeSlot.startAt.toDate().toISOString(),
        duration: formatDuration(timeSlot.duration),
        performer: timeSlot.performer,
      }
    })
  }

  const response = await fetch(request)
  const body = await response.json() as { data: { id: string, expire_at: string } }

  reservationMeta.updateId(body.data.id, {
    expireAt: new Date(body.data.expire_at)
  })

  dialogOpen.value = false
}

function onError(error: any) {
  console.error(error)
  emit("error", error)
}

</script>
