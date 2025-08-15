import { defineCustomElement, type CustomElementOptions } from 'vue'
import { TimeSlotPicker, TimeSlotPickerRoot, TimeSlotPickerFormField } from "./components"
import { i18n } from "~/i18n"
import { I18nInjectionKey } from "vue-i18n"

const sharedOptions = {
  configureApp(app) {
    app.provide(I18nInjectionKey, i18n)
    app.use(i18n)
  }
} satisfies CustomElementOptions

const customTimeSlotPicker = defineCustomElement(TimeSlotPicker, {
  ...sharedOptions,
  shadowRoot: false
})
const customTimeSlotPickerRoot = defineCustomElement(TimeSlotPickerRoot, {
  ...sharedOptions
})
const customTimeSlotPickerFormField = defineCustomElement(TimeSlotPickerFormField, {
  shadowRoot: false
})

export {
  customTimeSlotPicker as TimeSlotPicker,
  customTimeSlotPickerRoot as TimeSlotPickerRoot,
  customTimeSlotPickerFormField as TimeSlotPickerFormField
}
