<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport,
} from 'reka-ui'
import { cn } from '~/utils/shadcn'
import { ScrollBar } from '~/components/ui/scroll-area'

const props = defineProps<ScrollAreaRootProps & { class?: HTMLAttributes['class'] } & { snap?: boolean }>()

const delegatedProps = reactiveOmit(props, 'class')

const emit = defineEmits<{
  (type: "scrollend", event: Event): void
}>()

function onScrollEnd(event: Event) {
  emit("scrollend", event)
}

</script>

<template>
  <ScrollAreaRoot
    data-slot="scroll-area"
    v-bind="delegatedProps" 
    :class="cn('relative overflow-hidden', props.class)"
  >
    <ScrollAreaViewport
      as-child
      @scrollend="onScrollEnd"
      :class="cn(
        'h-full w-full rounded-[inherit]',
        props.snap ? 'snap-y' : '',
      )"
    >
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
