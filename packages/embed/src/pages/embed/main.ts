import { compareOrigins } from "~/utils/compareOrigins"
import { getComponentSelector } from "~/utils/getComponentSelector"
import "./style.sass"

type SetupTriggerButtonOptions = {
  dialogStateElementId: string
  buttonElementId: string
  dialogElementId: string
  reservationIdInputId: string
}

{
  enum DialogState {
    OPEN = "open"
  }

  function updateDialogState(dialog: HTMLIFrameElement, dialogState: string | null | undefined) { 
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

  function showDialog(dialog: HTMLIFrameElement) {
    dialog.setAttribute("data-state", DialogState.OPEN)
  }

  function hideDialog(dialog: HTMLIFrameElement) {
    dialog.removeAttribute("data-state")
  }

  function updateButton(button: HTMLIFrameElement, options?: { reservationId: string }) {
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
    if (onMessageListener) {
      window.removeEventListener("message", onMessageListener)
    }

    if (stateScriptElementObserver) {
      stateScriptElementObserver.disconnect()
    }

    const buttonIframeElement = window.document.getElementById(options.buttonElementId)
    if (false == buttonIframeElement instanceof HTMLIFrameElement) return

    const dialogIframeElement = window.document.getElementById(options.dialogElementId)
    if (false == dialogIframeElement instanceof HTMLIFrameElement) return

    const dialogStateElement = window.document.getElementById(options.dialogStateElementId)
    // if (false == dialogStateElement instanceof HTMLScriptElement) return

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
        updateDialogState(dialogIframeElement, target.data)
      })

      stateScriptElementObserver.observe(dialogStateElement, {
        // childList: true,
        subtree: true,
        characterData: true,
      })
    }

    const input = getReservationIdInput(window, options.reservationIdInputId)

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
          updateInput(input, event.data.payload)
          break
      }
    }

    window.addEventListener("message", onMessageListener)
  }

  function main() {
    setupDialog(window, {
      buttonElementId: getComponentSelector("embed-button"),
      dialogElementId: getComponentSelector("embed-dialog"),
      reservationIdInputId: getComponentSelector("embed-input-reservation-id"),
      dialogStateElementId: getComponentSelector("embed-dialog-state"),
    })
  }

  function getReservationIdInput(window: Window, id: string) {
    const element = window.document.getElementById(id)
    if (false == element instanceof HTMLInputElement) {
      return
    }
    return element
  }

  main()
}
