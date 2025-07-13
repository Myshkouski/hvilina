import type { MessagePayload } from "./MessagePayload";
import type { MessageRegistry } from "./MessageRegistry";
import type { MessageType } from "./MessageType";

export type Message<T extends MessageRegistry> = {
  [K in MessageType<T>]: {
    type: K;
    payload: MessagePayload<T, K>;
  };
}[MessageType<T>];
