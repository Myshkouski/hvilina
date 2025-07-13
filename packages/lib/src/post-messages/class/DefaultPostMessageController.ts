import { AbstractPostMessageController } from "./AbstractPostMessageController";
import type { MessageRegistry } from "../types/MessageRegistry";
import type { PostMessageControllerOptions } from "../types/PostMessageControllerOptions";

export class DefaultPostMessageController<T extends MessageRegistry> extends AbstractPostMessageController<T> {
  constructor(
    private readonly options: PostMessageControllerOptions
  ) {
    super();
  }

  protected override get window(): Window | undefined {
    return this.options.window;
  }

  protected override get target(): Window | HTMLIFrameElement | undefined {
    return this.options.target;
  }

  protected override get targetOrigin(): string | undefined {
    return this.options.targetOrigin;
  }

  protected override get onComponentDidMount() {
    return this.options.onComponentDidMount;
  }

  protected override get createMessageListener() {
    return this.options.createMessageListener;
  }
}
