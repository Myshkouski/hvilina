import { z } from "zod/v4"

const commonShape = {
  // r: z.string().optional(), // reservation ID
  s: z.string().optional(), // scope
}

const embedButtonShape = {
  ...commonShape,
  d: z.boolean().optional(), //disabled
}

const embedDialogShape = {
  ...commonShape,
  c: z.string().optional(), //contract ID
  sr: z.array(z.string()).optional(), // scheduleRequirements
  o: z.boolean().optional(), // is dialog open
}

export const embedButtonSchema = z.object(embedButtonShape).optional()
export type EmbedButtonOptionsSchema = z.infer<typeof embedButtonSchema>

export const embedDialogOptionsSchema = z.object(embedDialogShape).optional()
export type EmbedDialogOptionsSchema = z.infer<typeof embedDialogOptionsSchema>
