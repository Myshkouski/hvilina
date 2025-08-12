import { useNow, useFetch } from "@vueuse/core";
import { computed, toValue, type MaybeRefOrGetter, type Ref } from "vue";
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
  from?: MaybeRefOrGetter<Date | undefined>
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
    
    const from = toValue(options.from) ?? now.value
    url.searchParams.append("from", from.toISOString())
    
    const to = toValue(options.to)
    if (to) {
      url.searchParams.append("to", to.toISOString())
    }
    
    const scheduleRequirements = toValue(options.scheduleRequirements)
    if (scheduleRequirements?.length) {
      scheduleRequirements.forEach(value => {
        url.searchParams.append("scheduleRequirements", value)
      })
    }

    return url.toString()
  })
  
  const { error, data: responseData, execute, isFinished, isFetching } = useFetch(url, {
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

  const status = useFetchStatus({ error, isFetching, isFinished })

  return {
    data,
    error,
    refresh: execute,
    status
  }
}

function useFetchStatus(options: UseFetchStatusOptions) {
  return computed<FetchStatus>(() => {
    if (options.isFetching.value) {
      return "loading"
    }

    if (options.isFinished.value) {
      if (options.error.value) {
        return "error"
      }
      return "success"
    }

    return "initial"
  })
}

export type FetchStatus = "initial" | "loading" | "success" | "error"

type UseFetchStatusOptions = {
  isFinished: Readonly<Ref<boolean>>
  isFetching: Readonly<Ref<boolean>>
  error: Readonly<Ref<any>>
}
