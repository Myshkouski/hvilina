import { createApp, type Component } from 'vue'

export function mount<T extends Component>(
  componentClass: Class<T>,
  container: string | Element,
  props: ComponentProps<Class<T>>
) {
  const app = createApp(componentClass, props)
  app.mount(container)
}

export type Class<T> = new (...args: any[]) => T
export type ComponentProps<T extends abstract new (...args: any[]) => any> = InstanceType<T>["$props"] & Record<string, unknown>
