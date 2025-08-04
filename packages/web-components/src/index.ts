import { defineCustomElement } from 'vue'
import { TimeSlotPicker, TimeSlotPickerRoot, TimeSlotPickerFormField } from "./components"

const customTimeSlotPicker = defineCustomElement(TimeSlotPicker)
const customTimeSlotPickerRoot = defineCustomElement(TimeSlotPickerRoot)
const customTimeSlotPickerFormField = defineCustomElement(TimeSlotPickerFormField)

export {
  customTimeSlotPicker as TimeSlotPicker,
  customTimeSlotPickerRoot as TimeSlotPickerRoot,
  customTimeSlotPickerFormField as TimeSlotPickerFormField
}
