export type * from "./types/PostMessages"
export type { MessageRegistry } from "./types/MessageRegistry"
export type { PostMessageController } from "./types/PostMessageController"
export type { PostMessageControllerOptions } from "./types/PostMessageControllerOptions"
export type { PostMessageCallback } from "./types/PostMessageCallback"

export { createPostMessageController } from "./utils/createPostMessageController"
export { postMessageTo } from "./utils/postMessageTo"
