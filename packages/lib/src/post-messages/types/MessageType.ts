import type { MessageRegistry } from "./MessageRegistry";

export type MessageType<T extends MessageRegistry> = keyof T;
