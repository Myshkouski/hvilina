import { useNow, useFetch } from "@vueuse/core";
import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { toLocalTimeSlot } from "~/utils/toLocalTimeSlot";
import type { TimeSlotApi } from "~/types/TimeSlotApi";

type TimeSlotsApiResponse = {
  data: TimeSlotApi[]
}

export type UseTimeSlotsOptions = {
  baseUrl: MaybeRefOrGetter<string | URL>
  contract: MaybeRefOrGetter<string | undefined>
  scheduleRequirements?: MaybeRefOrGetter<string[] | undefined>
  refreshInterval?: MaybeRefOrGetter<number>
  // from?: MaybeRefOrGetter<Date | undefined>
  to?: MaybeRefOrGetter<Date | undefined>
}

export default function useTimeSlots(options: UseTimeSlotsOptions) {
  const {
    baseUrl,
    refreshInterval = 60 * 1000,
  } = options

  const now = useNow({
    interval: toValue(refreshInterval)
  })
  
  const url = computed(() => {
    const url = new URL("/api/v1/timeslots", toValue(baseUrl))
    const contract = toValue(options.contract)
    if (contract) {
      url.searchParams.append("contract", contract)
    }
    url.searchParams.append("from", now.value.toISOString())
    const to = toValue(options.to)
    if (to) {
      url.searchParams.append("to", to.toISOString())
    }
    return url.toString()
  })
  
  const { error, data: responseData, execute, isFinished } = useFetch(url, {
    beforeFetch(ctx) {
      const url = new URL(ctx.url)
      if (!url.searchParams.has("contract")) {
        ctx.cancel()
      }
    },
    refetch: true,
    immediate: false
  }).json<TimeSlotsApiResponse>()

  const data = computed(() => {
    return responseData.value?.data.map(timeSlot => {
      return toLocalTimeSlot(timeSlot)
    })
  })

  return {
    data,
    error,
    refresh: execute,
    isFinished
  }
}
