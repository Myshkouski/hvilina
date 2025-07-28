import { parseAbsoluteToLocal, parseDuration } from "@internationalized/date";
import { useNow, useFetch } from "@vueuse/core";
import { computed, toValue, type MaybeRefOrGetter } from "vue";
import type { LocalTimeSlot } from "~/components/timeslot-dialog/TimePicker.vue";

type TimeSlotsApiResponse = {
  data: {
    _dev?: {
      row: number;
      schedule_id: any;
      available_from: string | null;
      available_to: string | null;
    } | undefined;
    start_at: string;
    duration: string;
    available: boolean;
    provider: string;
    performer: string;
  }[]
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
      return {
        startAt: parseAbsoluteToLocal(timeSlot.start_at),
        duration: parseDuration(timeSlot.duration),
        available: timeSlot.available,
        performer: timeSlot.performer,
      } satisfies LocalTimeSlot
    })
  })

  return {
    data,
    error,
    refresh: execute,
    isFinished
  }
}
