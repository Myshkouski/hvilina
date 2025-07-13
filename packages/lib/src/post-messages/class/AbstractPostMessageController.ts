import type { CancelFn } from "../types/CancelFn";
import { InvalidTargetError } from "../errors/InvalidTargetError";
import { getWindowFrom } from "../utils/getWindowFrom";
import type { MessagePayload } from "../types/MessagePayload";
import type { MessageRegistry } from "../types/MessageRegistry";
import type { MessageType } from "../types/MessageType";
import type { PostMessageCallback } from "../types/PostMessageCallback";
import type { PostMessageController } from "../types/PostMessageController";

export abstract class AbstractPostMessageController<T extends MessageRegistry> implements PostMessageController<T> {
  protected abstract readonly window: Window | undefined;
  protected abstract readonly target: Window | HTMLIFrameElement | undefined;
  protected abstract readonly targetOrigin: string | undefined;

  post(
    ...[type, payload]: {
      [K in keyof T]: [type: K, payload: T[K]];
    }[keyof T]
  ): void {
    const targetWindow = getWindowFrom(this.target);
    if (!targetWindow) {
      throw new InvalidTargetError(targetWindow);
    }

    const message = {
      type,
      payload
    };
    const options = {
      targetOrigin: this.targetOrigin
    } satisfies WindowPostMessageOptions;

    targetWindow.postMessage(message, options);
  }

  protected abstract readonly onComponentDidMount: (hook: () => void) => void;
  protected abstract readonly createMessageListener: (cb: (event: MessageEvent) => void) => CancelFn;

  onMessage(cb: PostMessageCallback<T>): CancelFn {
    let cancelFn: CancelFn | undefined;
    let cancelled = false;

    this.onComponentDidMount(() => {
      if (cancelled) return;

      cancelFn = this.createMessageListener(event => {
        if (false == event instanceof MessageEvent) return;

        const type = event.data.type as MessageType<T>;
        const payload = event.data.payload as MessagePayload<T, MessageType<T>>;

        cb({ type, payload }, event);
      });
    });

    return function cancel() {
      cancelled = true;
      cancelFn?.();
    };
  }
}
