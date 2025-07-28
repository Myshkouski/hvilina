import { computed, toValue, type MaybeRefOrGetter } from "vue"
import { useCookies } from "./useCookies"
import { getCookieName } from "@hvilina/lib/cookie"

function useReservationMetaCookie(options?: UseReservationMetaOptions) {
  const cookies = useCookies<Record<string, string>>()
  const cookieName = computed(() => {
    return getCookieName({
      scope: toValue(options?.scope) ?? undefined,
      origin: toValue(options?.origin) ?? undefined,
    })
  })
  const data = computed(() => {
    return cookies.data.value[cookieName.value] || undefined
  })
  
  function update(value: string | null | undefined, options: { expireAt: Date }) {
    const name = cookieName.value
    value
      ? cookies.set(name, value, {
        expires: options.expireAt,
        secure: true,
        sameSite: true,
      })
      : cookies.remove(name)
  }

  return {
    data,
    update,
  }
}

export function useReservationMeta(options?: UseReservationMetaOptions) {
  const { data, update } = useReservationMetaCookie(options)
  return {
    id: data,
    updateId: update
  }
}

export type UseReservationMetaOptions = {
  scope?: MaybeRefOrGetter<string | null | undefined>
  origin?: MaybeRefOrGetter<string | null | undefined>
}
