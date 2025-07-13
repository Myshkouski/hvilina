import type { Message } from "./Message";
import type { MessageRegistry } from "./MessageRegistry";


export type PostMessageCallback<T extends MessageRegistry> = {
  (
    message: Message<T>,
    event: MessageEvent
  ): any;
};
