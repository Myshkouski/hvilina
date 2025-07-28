export type ComponentProps<T extends abstract new (...args: any) => any> = InstanceType<T>["$props"];
