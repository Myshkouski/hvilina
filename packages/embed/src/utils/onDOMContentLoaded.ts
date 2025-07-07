export function onDOMContentLoaded(document: Document, cb: () => any) {
  if (document.readyState !== "loading") {
    cb()
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      cb()
    }, {
      once: true
    })
  }
}
