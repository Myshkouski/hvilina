import type { EmbedButtonOptionsSchema, EmbedDialogOptionsSchema } from "./zodSchema"

type CommonPostMessages = {
  "ready": void
}

export type EmbedDialogPostMessages = CommonPostMessages & {
  "reservationChange": { reservationId: string }
  "reservationReset": void
  "close": void
  "optionsChange": EmbedDialogOptionsSchema
}

export type EmbedButtonPostMessages = CommonPostMessages & {
  "click": void
  "optionsChange": EmbedButtonOptionsSchema
}
