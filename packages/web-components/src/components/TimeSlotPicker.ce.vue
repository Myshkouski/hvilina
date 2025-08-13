<template>
  <LocaleProvider
    :locale="props.lang"
  >
    <TimeSlotPicker
      v-bind="delegatedProps" 
      @error="emit('error', $event)"
      @update:reservation-id="emit('reservationIdUpdate', $event)" 
      @update:time-slots="emit('timeSlotsUpdate', $event)"
    >
      <template #content-title-text>
        {{ t("title") }}
      </template>
      <template #content-confirm-text>
        {{ t("button.confirm") }}
      </template>
      <template #content-description-text>
        {{ t("description") }}
      </template>
      <template #content-timeslot-fallback-text>
        {{ t("timeslot-fallback") }}
      </template>
    </TimeSlotPicker>
  </LocaleProvider>
</template>

<i18n lang="yaml">

en:
  title: select date and time
  description: сlick "Confirm" when you're done.
  timeslot-fallback: not selected
  button:
    confirm: confirm
ru:
  title: выберите дату и время
  description: Нажмите "Подтвердить" после выбора даты и времени.
  timeslot-fallback: не выбрано
  button:
    confirm: подтвердить

</i18n>

<script setup lang="ts">

import LocaleProvider from "./LocaleProvider.vue"
import { TimeSlotPicker, type TimeSlotPickerProps } from "@hvilina/vue";
import { delegateTimeSlotPickerProps } from "./delegateTimeSlotPickerProps";
import { computed } from "vue";
import { useI18n } from "vue-i18n"

const { t } = useI18n()

type PrimitiveProps = {
  baseUrl: string
  from?: string
  to?: string
  scheduleRequirements?: string
}

type LangProps = {
  lang?: string
}

export type Props = Omit<
  TimeSlotPickerProps, 
  "baseUrl" | "from" | "to" | "scheduleRequirements"
> & PrimitiveProps & LangProps
const props = defineProps<Props>()

const delegatedProps = computed(() => {
  return delegateTimeSlotPickerProps(props)
})

export type Emits = {
  (event: "error", value: any): void
  (event: "reservationIdUpdate", value: string | undefined): void
  (event: "timeSlotsUpdate", value: object[] | undefined): void
}
const emit = defineEmits<Emits>()

</script>

<style src="~/assets/style/main.css" />
