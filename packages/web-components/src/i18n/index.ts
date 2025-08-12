import { createI18n } from "vue-i18n"

const i18n = createI18n({
  legacy: false,
  availableLocales: [
    "en",
    "ru"
  ],
  fallbackLocale: "ru",
})

export { i18n }
