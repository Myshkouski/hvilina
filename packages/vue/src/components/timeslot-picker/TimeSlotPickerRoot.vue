<template lang="pug">

slot(
  v-bind="defaultSlotProps"
)

</template>

<script setup lang="ts">

import { useTimeSlots } from '~/composables';
import type { TimePickerItem } from '~/components/timeslot-dialog/TimePicker.vue';
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
import type { LocalTimeSlot } from '~/types/LocalTimeSlot';

export type Props = {
  disabled?: boolean
  baseUrl: string | URL
  contract?: string
  scope?: string
  scheduleRequirements?: string[]
  from?: Date
  to?: Date
}

export type Filter = {
  schedule?: string[]
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
  from,
  to,
  scheduleRequirements
} = defineProps<Props>()

const emit = defineEmits<Emits>()

const availableLoading = computed(() => {
  return "loading" == status.value
})

const reservationLoading = shallowRef(false)

const loading = computed(() => {
  return availableLoading.value || reservationLoading.value
})

const disabled = computed(() => {
  if (disabledProp) {
    return true
  }
  if (loading.value) {
    return true
  }
  return !contract
})

const defaultSlotProps = computed(() => {
  return {
    disabled: disabled.value,
    loading: loading.value,
    available: timeSlots.value,
    selected: timeSlot.value,
    onConfirm: confirm,
    onRefresh: refreshTimeSlots,
  } satisfies DefaultSlotProps
})

export interface DefaultSlotProps {
  disabled: boolean
  loading: boolean
  available?: LocalTimeSlot[]
  selected?: LocalTimeSlot
  onConfirm: (timeSlot: TimePickerItem) => any
  onRefresh: () => any
}

const {
  data: timeSlots,
  error: timeSlotsError,
  refresh: refreshTimeSlots,
  status
} = useTimeSlots({
  baseUrl,
  contract,
  from,
  to,
  scheduleRequirements
})

async function refreshIfNotDisabled() {
  if (disabledProp) return
  await refreshTimeSlots()
}

onMounted(() => {
  refreshIfNotDisabled().catch(onError)
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

import { promiseTimeout } from "@vueuse/core"

async function confirm(timeSlot: TimePickerItem) {
  try {
    reservationLoading.value = true
    await Promise.all([
      upsertReservation(timeSlot),
      promiseTimeout(1000)
    ])
  } finally {
    reservationLoading.value = false
  }
}



function emitReservationIdUpdate(value: string | undefined) {
  console.debug("[TimeSlotPickerRoot.vue]", "emitReservationIdUpdate")
  emit("update:reservationId", value)
}

watch(reservationMeta.id, reservationId => {
  emitReservationIdUpdate(reservationId)
})

onMounted(() => {
  console.debug("[TimeSlotPickerRoot.vue]", "onMounted")
})

onMounted(() => {
  emitReservationIdUpdate(reservationMeta.id.value)
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
