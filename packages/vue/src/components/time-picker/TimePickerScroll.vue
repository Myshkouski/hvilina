<template lang="pug">

TimePickerScrollArea.rounded-md.border.flex.flex-col.justify-stretch.border-border(
  ref="scroll-area"
  type="auto"
  snap
  @scrollend="onScrollEnd"
)
  TimePickerItem(
    ref="items"
    v-if="uniqueSortedValues.length > 0"
    v-for="{ value, available } in uniqueSortedValues"
    :key="value"
    :data-value="value.toString()"
    :value="value.toString()"
    :disabled="false === available"
    :selected="value === actualModel?.value"
    @click="onItemClick($event, value)"
  )
  template(v-else)
    slot(name="empty")
      TimePickerItem.justify-end(
        key="-"
        value="--"
        disabled
      )

</template>

<script setup lang="ts" generic="T extends number, U extends { value: T, available: boolean }">

import { computed, ref, shallowRef, useTemplateRef, watch } from "vue";
import TimePickerScrollArea from "./TimePickerScrollArea.vue"
import TimePickerItem from "./TimePickerItem.vue"
import { computedWithControl, type MaybeElement } from "@vueuse/core"
import { useIntersectedItem } from "./useIntersectedItem";

const {
  values,
} = defineProps<{
  values: U[],
}>()

const uniqueSortedValues = computed(() => {
  return values.toSorted((a, b) => {
    const diff = a.value - b.value
    if (0 !== diff) {
      return diff
    }
    return !!a.available === !!b.available
      ? 0
      : a.available ? -1 : 1
  }).reduce((acc, v1) => {
    if (!acc.find(v2 => v2.value === v1.value)) {
      acc.push(v1)
    }
    return acc
  }, [] as U[])
})

const scrollArea = useTemplateRef("scroll-area")
const items = ref<MaybeElement[]>([])

const emit = defineEmits<{
  (event: "change", value: T | undefined): void
}>()

const actualModel = shallowRef<U | undefined>()

const modelWithControl = computedWithControl(
  ref(), 
  () => {
    if (!actualModel.value) return
    if (false === actualModel.value.available) return
    return actualModel.value?.value
  }
)

watch(modelWithControl, value => {
  // console.debug("watch", value)
  emit("change", value)
})

const scrollAreaElement = computed(() => {
  return scrollArea.value?.$el
})
const intersectedItem = useIntersectedItem(scrollAreaElement, items)

const selectedValue = computed(() => {
  return intersectedItem.value?.dataset["value"]
})

function onItemClick(event: Event, value: T) {
  if (false === event.target instanceof HTMLElement) return
  if (selectedValue.value === value.toString()) {
    // emit("change", value)
    // triggerRef(actualModel)
  } else {
    event.target.scrollIntoView({ behavior: "smooth", block: "center" })
  }
}

function onScrollEnd() {
  // emit("change", model.value)
  // triggerRef(actualModel)
  modelWithControl.trigger()
}

watch([selectedValue, uniqueSortedValues], ([selectedValue, uniqueSortedValues]) => {
  if (undefined === selectedValue) return

  const value = uniqueSortedValues.find(value => {
    return value.value.toString() === selectedValue
  })

  actualModel.value = value
})

</script>
