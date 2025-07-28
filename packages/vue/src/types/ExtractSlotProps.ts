export type ExtractSlotProps<T extends abstract new (...args: any) => any, U extends string> = Parameters<
  Exclude<
    InstanceType<T>['$slots'][U], undefined
  >
>[0]
