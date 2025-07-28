import { type MaybeComputedElementRef, type MaybeElement, useIntersectionObserver } from "@vueuse/core"
import { type Ref, shallowRef, computed } from "vue"

export function useIntersectedItem(
  root: Document | MaybeComputedElementRef<MaybeElement>, 
  elements: Ref<MaybeElement | MaybeElement[]>
) {
  const el = shallowRef<HTMLElement>()

  function onIntersectionChange(entries: IntersectionObserverEntry[]) {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      if (false === entry.target instanceof HTMLElement) continue

      el.value = entry.target
    }
  }

  const target = computed(() => {
    return [elements.value].filter(el => !!el).flat()
  })

  useIntersectionObserver(
    target,
    onIntersectionChange,
    {
      root,
      rootMargin: "-50% 0% -50% 0%",
      threshold: 0,
    }
  )

  return el
}