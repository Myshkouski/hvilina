import { DefaultPostMessageController } from "../class/DefaultPostMessageController";
import type { MessageRegistry } from "../types/MessageRegistry";
import type { PostMessageController } from "../types/PostMessageController";
import type { PostMessageControllerOptions } from "../types/PostMessageControllerOptions";

export function createPostMessageController<T extends MessageRegistry>(
  options: PostMessageControllerOptions
): PostMessageController<T> {
  return new DefaultPostMessageController<T>(options);
}
