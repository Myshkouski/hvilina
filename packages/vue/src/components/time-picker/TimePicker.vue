<template lang="pug">

.flex.gap-4
  TimePickerScroll(
    :values="hours"
    @change="onHourChange"
  )
  TimePickerScroll(
    :values="minutes"
    @change="onMinuteChange"
  )

</template>

<script setup lang="ts" generic="T extends Readonly<TimeWithAvailability>">

import { computed, ref, watch } from "vue";
import TimePickerScroll from "./TimePickerScroll.vue"

export interface TimeWithAvailability {
  hour: number
  minute: number
  available: boolean
}

const {
  items = []
} = defineProps<{
  items?: T[]
}>()

const hours = computed(() => {
  return items.map(item => {
    return {
      value: item.hour,
      available: item.available,
    }
  })
})

const selectedHour = ref(hours.value.at(hours.value.length / 2)?.value)

function onHourChange(value: number | undefined) {
  selectedHour.value = value
}

const minutes = computed(() => {
  return items.map(timeSlot => {
    return {
      value: timeSlot.minute,
      available: timeSlot.available && Number.isInteger(selectedHour.value) && (timeSlot.hour === selectedHour.value),
    }
  })
})

const selectedMinute = ref(minutes.value.at(minutes.value.length / 2)?.value)

function onMinuteChange(value: number | undefined) {
  selectedMinute.value = value
}

const emit = defineEmits<{
  (event: "change", value: T | undefined): void
}>()

const model = defineModel<T | undefined>()

// watchImmediate(model, model => {
//   if (!model) {
//     selectedHour.value = undefined
//     selectedMinute.value = undefined
//   }
// })

watch([selectedHour, selectedMinute], ([hour, minute]) => {
  if (undefined === hour || undefined === minute) {
    model.value = undefined
    return
  }

  const timeSlot = items.find(timeSlot => {
    return true === timeSlot.available && hour === timeSlot.hour && minute === timeSlot.minute
  })

  // if (!hour?.available || !minute?.available) {
  //   model.value = undefined
  //   return
  // }

  model.value = timeSlot
})

</script>
