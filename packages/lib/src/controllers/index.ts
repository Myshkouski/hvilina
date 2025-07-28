export interface Stateful<T> {
  readonly state: T
}

export interface Elements extends Record<string, HTMLElement | null | undefined> {}

export interface ElementController<T extends Elements> {
  readonly elements: T
}

export type DialogState = {
  readonly opened: boolean
}

interface DialogControllerElements extends Elements {
  dialog?: HTMLDialogElement | HTMLIFrameElement | null
  state?: HTMLScriptElement | null
}

export interface DialogController extends ElementController<DialogControllerElements>, Stateful<Partial<DialogState>> {
  show(): void
  hide(): void
  onReservationChange(reservationId: string): void
}

export interface TriggerController<E extends Elements> extends ElementController<E> {
  // setReservationId(reservationId: string): void
}
