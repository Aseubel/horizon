/// <reference types="vite/client" />
declare module "vue-router";
interface ImportMetaEnv {
  readonly VITE_BACKEND_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.vue" {
  import { ComponentOptions } from "vue";
  const componentOptions: ComponentOptions;
  export default componentOptions;
}
