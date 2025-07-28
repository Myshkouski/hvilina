<template lang="pug">

.snap-center.snap-mandatory.flex.flex-col(
  :class=`cn(
    "first:justify-end last:justify-start first:last:justify-center",
    horizontal
      ? "first:w-[calc(50%+4rem)] last:w-[calc(50%+4rem)] first:last:w-full"
      : "first:h-[calc(50%+2rem)] last:h-[calc(50%+2rem)] first:last:h-full"
  )`
)
  button.w-full.h-16.px-8.py-4.text-center.font-normal(
    @click="onButtonClick"
    :disabled="disabled"
    :class=`
      disabled
        ? "text-secondary"
        : "hover:text-foreground cursor-pointer " + (
            selected
              ? "text-foreground"
              : "text-muted-foreground"
          )
    `
    :data-selected="selected"
  )
    span.text-xl.transition-all.whitespace-nowrap
      | {{ text }}

</template>

<script setup lang="ts" generic="T extends string">

import { computed } from 'vue'
import { cn } from "~/utils/shadcn"

const {
  value,
  horizontal = false,
  disabled = false,
  selected = false
} = defineProps<{
  value: T,
  horizontal?: boolean
  disabled?: boolean
  selected?: boolean
}>()

const text = computed(() => {
  return value.padStart(2, "0")
})

const emit = defineEmits<{
  (type: "click", event: Event): void
}>()

function onButtonClick(event: Event) {
  emit("click", event)
}

</script>
