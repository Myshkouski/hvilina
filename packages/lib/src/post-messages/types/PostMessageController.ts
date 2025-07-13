import type { PostMessageCallback } from "./PostMessageCallback";
import type { MessageRegistry } from "./MessageRegistry";

export interface PostMessageController<T extends MessageRegistry> {
  post(
    ...[type, data]: {
      [K in keyof T]: [type: K, data: T[K]];
    }[keyof T]
  ): void;

  onMessage(cb: PostMessageCallback<T>): () => void;
}
