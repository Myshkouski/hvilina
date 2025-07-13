import type { MessageRegistry } from "./MessageRegistry";
import type { MessageType } from "./MessageType";

export type MessagePayload<T extends MessageRegistry, U extends MessageType<T>> = T[U];
