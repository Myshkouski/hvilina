import type { CancelFn } from "./CancelFn";

export type PostMessageControllerOptions = {
  readonly window: Window | undefined;
  readonly target: Window | HTMLIFrameElement | undefined;
  readonly targetOrigin: string | undefined;
  onComponentDidMount(hook: () => void): void;
  createMessageListener(cb: (event: MessageEvent) => void): CancelFn;
};
