import { PostMessageError } from "./PostMessageError";

export class InvalidTargetError extends PostMessageError {
  constructor(target: any) {
    super(`Message cannot be posted to ${target}.`);
  }
}
