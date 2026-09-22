/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_REPOSITORY?: string;
  readonly VITE_WINDOWS_DOWNLOAD_URL?: string;
  readonly VITE_MAC_APPLE_DOWNLOAD_URL?: string;
  readonly VITE_MAC_INTEL_DOWNLOAD_URL?: string;
  readonly VITE_SUPPORT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
