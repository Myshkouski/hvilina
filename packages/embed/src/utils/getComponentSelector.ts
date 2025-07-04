export function getComponentSelector(componentName: string) {
  return import.meta.env.VITE_ELEMENT_ID_PREFIX + componentName
}
