<template>
  <slot></slot>
</template>

<script setup lang="ts">

import { computed } from "vue";
import { useI18n, type Locale } from "vue-i18n"
import { usePreferredLanguages, watchImmediate } from "@vueuse/core"
import Cookie from "universal-cookie"

export type Props = {
  locale?: Locale
}

const {
  locale
} = defineProps<Props>()

const preferredLanguages = usePreferredLanguages()
const preferredLocale = computed(() => {
  return preferredLanguages.value[0] || "en"
})
const { locale: currentLocale } = useI18n()
watchImmediate(preferredLocale, preferredLocale => {
  if (locale) {
    currentLocale.value = locale
    return
  }
  const cookie = new Cookie(document.cookie)
  const forcedLang = cookie.get("lang")
  currentLocale.value = forcedLang || preferredLocale
})

</script>
