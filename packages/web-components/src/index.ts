import { defineCustomElement } from 'vue'
import { TimeSlotPicker } from "./components"

const customTimeSlotPicker = defineCustomElement(TimeSlotPicker)

export {
  customTimeSlotPicker as TimeSlotPicker
}
