export function getWindowFrom(target: Window | HTMLIFrameElement | null | undefined) {
  if (target instanceof HTMLIFrameElement) {
    target = target.contentWindow;
  }
  // if (!target) {
  //   target = window
  // }
  return target;
}
