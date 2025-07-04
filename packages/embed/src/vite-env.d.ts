/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ELEMENT_ID_PREFIX: string
  readonly VITE_ALLOWED_ORIGIN: string
  readonly VITE_IFRAME_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
