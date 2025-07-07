import { compareOrigins } from "~/utils/compareOrigins"
import { getComponentSelector } from "~/utils/getComponentSelector"
import { tryGetTypedElementById } from "~/utils/tryGetTypedElementById"
import { onDOMContentLoaded } from "~/utils/onDOMContentLoaded"

import "./style.sass"

type SetupTriggerButtonOptions = {
  dialogStateElementId: string
  buttonElementId: string
  dialogElementId: string
  reservationIdInputId: string
}

{
  function updateDialogState(dialog: HTMLIFrameElement | undefined, dialogState: string | null | undefined) { 
    if (!dialog) return
    if (!dialogState) return
    let state: any
    try {
      state = JSON.parse(dialogState)
    } catch (e) {
      console.error(e)
      return
    }
    
    const payload = {
      o: true,
      ...state
    }

    dialog.contentWindow?.postMessage({
      type: "optionsChange",
      payload,
    }, import.meta.env.VITE_IFRAME_BASE_URL)
  }

  enum DialogAttributes {
    OPENED = "data-opened"
  }

  function showDialog(dialog: HTMLIFrameElement | undefined) {
    dialog?.toggleAttribute(DialogAttributes.OPENED, true)
  }

  function hideDialog(dialog: HTMLIFrameElement | undefined) {
    dialog?.toggleAttribute(DialogAttributes.OPENED, false)
  }

  function updateButton(button: HTMLIFrameElement | undefined, options?: { reservationId: string }) {
    if (!button) return

    const payload = {
      r: options?.reservationId
    }
    button.contentWindow?.postMessage({
      type: "optionsChange",
      payload,
    }, import.meta.env.VITE_IFRAME_BASE_URL)
  }

  function updateInput(input: HTMLInputElement | undefined, data: { reservationId: string | null | undefined }) {
    if (!input) return
    input.value = data.reservationId || ""
  }

  let onMessageListener: (this: Window, ev: MessageEvent<any>) => any | undefined
  let stateScriptElementObserver: MutationObserver | undefined

  function setupDialog(window: Window, options: SetupTriggerButtonOptions) {
    let buttonIframeElement: HTMLIFrameElement | undefined
    let dialogIframeElement: HTMLIFrameElement | undefined
    let dialogStateElement: HTMLScriptElement | undefined
    let reservationIdInputElement: HTMLInputElement | undefined

    onDOMContentLoaded(window.document, () => {
      buttonIframeElement = tryGetTypedElementById(window.document, options.buttonElementId, HTMLIFrameElement)
      dialogIframeElement = tryGetTypedElementById(window.document, options.dialogElementId, HTMLIFrameElement)
      dialogStateElement = tryGetTypedElementById(window.document, options.dialogStateElementId, HTMLScriptElement)
      reservationIdInputElement = tryGetTypedElementById(window.document, options.reservationIdInputId, HTMLInputElement)

      if (stateScriptElementObserver) {
        stateScriptElementObserver.disconnect()
      }

      if (dialogStateElement) {
        stateScriptElementObserver = new MutationObserver(records => {
          let target: Text | undefined
          for (const record of records.reverse()) {
            if (record.type !== "characterData") continue
            console.debug("MutationObserver#observe()", "record:", record)
            console.debug("MutationObserver#observe()", "record.target instanceof HTMLScriptElement:", record.target instanceof HTMLScriptElement)

            if (false == record.target instanceof Text) continue
            target = record.target
            break
          }
          console.debug("MutationObserver#observe()", "target:", target)
          if (!target) return
          if (!dialogIframeElement) return
          updateDialogState(dialogIframeElement, target.data)
        })

        stateScriptElementObserver.observe(dialogStateElement, {
          // childList: true,
          subtree: true,
          characterData: true,
        })
      }
    })

    if (onMessageListener) {
      window.removeEventListener("message", onMessageListener)
    }

    onMessageListener = function onMessageListener(event: MessageEvent<any>) {
      if (false == compareOrigins(event.origin, import.meta.env.VITE_IFRAME_BASE_URL)) {
        // Message from unknown origin, so ignore it.
        return
      }

      switch (event.data?.type) {
        case "click":
          if (dialogStateElement) {
            updateDialogState(dialogIframeElement, dialogStateElement.textContent)
          }
          showDialog(dialogIframeElement)
          break
        case "close":
          hideDialog(dialogIframeElement)
          break
        case "reservationChange":
          updateButton(buttonIframeElement, event.data.payload)
          updateInput(reservationIdInputElement, event.data.payload)
          break
      }
    }

    window.addEventListener("message", onMessageListener)
  }

  function main(window: Window) {
    setupDialog(window, {
      buttonElementId: getComponentSelector("embed-button"),
      dialogElementId: getComponentSelector("embed-dialog"),
      reservationIdInputId: getComponentSelector("embed-input-reservation-id"),
      dialogStateElementId: getComponentSelector("embed-dialog-state"),
    })
  }

  main(globalThis.window)
}
