export function tryGetTypedElementById<T extends HTMLElement>(document: Document, id: string, type: Class<T>): T | undefined {
  const element = document.getElementById(id)
  if (element instanceof type) {
    return element
  }
}

export interface Class<T> extends Function { new(...args: any[]): T; }
