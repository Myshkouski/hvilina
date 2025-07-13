import { getWindowFrom } from "./getWindowFrom";
import type { MessageRegistry } from "../types/MessageRegistry";

export function postMessageTo<T extends MessageRegistry>(
  target: Window | HTMLIFrameElement,
  ...[type, payload, targetOrigin]: {
    [K in keyof T]: [type: K, data?: T[K], targetOrigin?: string];
  }[keyof T]
) {
  const window = getWindowFrom(target);
  if (!window) return;

  const message = {
    type,
    payload
  };
  const options = {
    targetOrigin
  };

  window.postMessage(message, options);
}
