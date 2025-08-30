<template lang="pug">

.p-4.space-y-8
  Form.space-y-4(
    keep-values
    validate-on-mount
    :validation-schema="formValidationSchema"
    :initial-values="formInitialValues"
    @submit="onFormSubmit"
    v-slot="{ errors }"
  )
    SelectService(
      v-model:services="services"
    )
    SelectDelivery(
      v-model:delivery-id="deliveryId"
    )
    FormField(
      name="reservationId"
      v-slot="{ field, handleChange }"
    )
      FormItem
        //- FormLabel
        FormControl
          input(type="hidden" v-bind="field")
          TimeSlotPicker(
            :base-url="baseUrl"
            contract="2"
            scope="default"
            @update:reservation-id="handleChange"
            :disabled="!services.length"
            :schedule-requirements="scheduleRequirements"
          )
    div
      Button(
        type="submit"
        :disabled="Object.values(errors).length > 0"
      )
        span Submit

</template>

<script setup lang="ts">

import { Form } from '~/components/ui/form'
import { Button } from "~/components/ui/button";
import SelectDelivery from "./components/SelectDelivery.vue"
import { TimeSlotPicker } from "~/components/timeslot-picker"

import SelectService from "./components/SelectService.vue"
import type { Service } from "./components/SelectService.vue"

import {
  FormControl,
  FormField,
  FormItem
} from "~/components/ui/form"
import { z } from "zod/v3"
import { toTypedSchema } from "@vee-validate/zod"

// const baseUrl = "http://localhost:3000"
const baseUrl = "https://taim-ui-nuxt.alexeimyshkouski.workers.dev"
const deliveryId = ref<string>()
const services = shallowRef<Service[]>([])

const reservationSearchParams = ref<{
  contractId?: string
  scheduleRequirements?: string[]
}>()

function reduceScheduleRequirements(services: readonly Service[]) {
  return services.reduce((req, service) => {
    if (!service.scheduleRequirements?.length) {
      return req
    }
    return [...req, ...service.scheduleRequirements]
  }, [] as string[])
}

// const reservationIdCookieName = key`reservations_${'_'}`
const reservationIdCookieName = ref("reservation_")
// const { data: reservationId } = useCookies()
const reservationId = ref<Record<string, string | null>>({})
const formInitialValues = computed(() => {
  return {
    reservationId: reservationId.value?.[reservationIdCookieName.value]
  }
})

const scheduleRequirements = computed(() => {
  return reduceScheduleRequirements(services.value)
})

watch([deliveryId, scheduleRequirements], ([deliveryId, scheduleRequirements]) => {
  if (!deliveryId) return

  reservationSearchParams.value = {
    ...reservationSearchParams.value,
    contractId: deliveryId,
    scheduleRequirements
  }
}, {
  immediate: true
})

const formSchema = z.object({
  reservationId: z.string(),
  // serviceIds: z.array(
  //   z.string()
  // ),
  // deliveryId: z.string(),
})

const formValidationSchema = toTypedSchema(formSchema)

function onFormSubmit(values: Record<string, any>, ctx: any) {
  validateAndConfirmReservation(values).catch(console.error)
}

import { toast } from 'vue-sonner'
import { computed, ref, shallowRef, watch } from 'vue';

async function validateAndConfirmReservation(values: object) {
  const { reservationId } = formSchema.parse(values)

  let toastTitle: string
  let toastDescription: string

  try {
    // await confirmReservation({ reservationId })

    toastTitle = "Reservation confirmed"
    toastDescription = `Reservation ID: ${reservationId}`
  } catch (e) {
    toastTitle = "Unable to confirm reservation"
    toastDescription = e instanceof Error ? e.message : "Unknown error"
  }

  toast(toastTitle, {
    description: toastDescription
  })
}

</script>

<style src="~/assets/style/main.css" />
