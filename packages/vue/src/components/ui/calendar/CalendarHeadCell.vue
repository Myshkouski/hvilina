<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarHeadCell, type CalendarHeadCellProps, useForwardProps } from 'reka-ui'
import { cn } from '~/utils/shadcn'

const props = defineProps<CalendarHeadCellProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarHeadCell
    data-slot="calendar-head-cell"
    :class="cn('text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]', props.class)"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeadCell>
</template>
